import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { scoreBusinessLead } from "@/lib/lead-scoring";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const auditSchema = z.object({
  lead_id: z.string().uuid(),
  website: z.string().url(),
});

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  return profile?.is_admin ? user : null;
}

export async function POST(req: NextRequest) {
  const adminUser = await requireAdmin();
  if (!adminUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = auditSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 422 });

  const { lead_id, website } = parsed.data;

  // Run the audit
  const audit = await runWebsiteAudit(website);

  // Save to DB
  const adminSupabase = await createAdminClient();

  const { data: existingLead } = await adminSupabase
    .from("business_leads")
    .select("google_rating, review_count, score, score_reasons")
    .eq("id", lead_id)
    .single();

  const updatedScoring = scoreBusinessLead({
    has_website: true,
    website_url: website,
    google_rating: existingLead?.google_rating ?? null,
    review_count: existingLead?.review_count ?? null,
    audit,
  });

  // Upsert the audit record
  await adminSupabase.from("lead_audits").upsert(
    { lead_id, ...audit, audit_score_delta: updatedScoring.score - (existingLead?.score ?? 50) },
    { onConflict: "lead_id" }
  );

  // Update the lead score
  await adminSupabase
    .from("business_leads")
    .update({ score: updatedScoring.score, score_reasons: updatedScoring.reasons })
    .eq("id", lead_id);

  return NextResponse.json({ audit, new_score: updatedScoring.score, reasons: updatedScoring.reasons });
}

async function runWebsiteAudit(url: string) {
  const startTime = Date.now();
  const result = {
    is_https: url.startsWith("https://"),
    redirects_to_https: false,
    http_status: null as number | null,
    page_title: null as string | null,
    meta_description: null as string | null,
    has_favicon: false,
    load_speed_ms: null as number | null,
    mobile_friendly: null as boolean | null,
    has_cta: false,
    has_contact_form: false,
    has_phone: false,
    social_links: [] as string[],
    raw: {} as Record<string, unknown>,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; FightersBuildersBot/1.0; +https://fightersbuilders.com/bot)",
        "Accept": "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });

    clearTimeout(timeoutId);
    result.load_speed_ms = Date.now() - startTime;
    result.http_status = resp.status;

    if (resp.redirected && resp.url.startsWith("https://")) {
      result.redirects_to_https = true;
    }

    const html = await resp.text();

    // Page title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    result.page_title = titleMatch?.[1]?.trim().slice(0, 200) ?? null;

    // Meta description
    const metaMatch = html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
    ) ?? html.match(
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i
    );
    result.meta_description = metaMatch?.[1]?.trim().slice(0, 300) ?? null;

    // Favicon
    result.has_favicon =
      html.includes('<link rel="icon"') ||
      html.includes("<link rel='icon'") ||
      html.includes('rel="shortcut icon"') ||
      html.includes("favicon");

    // Mobile viewport
    result.mobile_friendly =
      html.includes('name="viewport"') ||
      html.includes("name='viewport'");

    // CTA signals
    const ctaPatterns = [
      /צור קשר/i, /התקשר/i, /קבע פגישה/i, /הצעת מחיר/i,
      /contact us/i, /get a quote/i, /book now/i, /call us/i,
      /<button/i, /btn-primary/i, /cta/i,
    ];
    result.has_cta = ctaPatterns.some((p) => p.test(html));

    // Contact form
    result.has_contact_form =
      /<form/i.test(html) &&
      (/<input[^>]+type=["']email["']/i.test(html) ||
       /<textarea/i.test(html));

    // Phone number
    result.has_phone =
      /\+?[\d\s\-()]{7,15}/.test(html) ||
      /tel:/i.test(html);

    // Social links
    const socials: string[] = [];
    const socialPatterns: [RegExp, string][] = [
      [/facebook\.com/i, "facebook"],
      [/instagram\.com/i, "instagram"],
      [/linkedin\.com/i, "linkedin"],
      [/twitter\.com|x\.com/i, "twitter"],
      [/youtube\.com/i, "youtube"],
      [/tiktok\.com/i, "tiktok"],
    ];
    for (const [pattern, name] of socialPatterns) {
      if (pattern.test(html)) socials.push(name);
    }
    result.social_links = socials;
  } catch (e) {
    result.raw = { error: String(e) };
    result.http_status = 0;
    result.load_speed_ms = Date.now() - startTime;
  }

  return result;
}
