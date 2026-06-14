import { NextRequest, NextResponse } from "next/server";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { z } from "zod";
import { z as zod } from "zod";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { ReportContent } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const requestSchema = z.object({ lead_id: z.string().uuid() });

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  return profile?.is_admin ? user : null;
}

export async function POST(req: NextRequest) {
  const adminUser = await requireAdmin();
  if (!adminUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 422 });

  const { lead_id } = parsed.data;
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "OPENROUTER_API_KEY not configured." }, { status: 503 });

  const adminSupabase = await createAdminClient();
  const { data: lead } = await adminSupabase.from("business_leads").select("*").eq("id", lead_id).single();
  if (!lead) return NextResponse.json({ error: "Lead not found." }, { status: 404 });

  const { data: audit } = await adminSupabase
    .from("lead_audits")
    .select("*")
    .eq("lead_id", lead_id)
    .order("audited_at", { ascending: false })
    .limit(1)
    .single();

  const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

  const reportSchema = zod.object({
    tips: zod.array(
      zod.object({
        category: zod.string(),
        title: zod.string(),
        body: zod.string(),
      })
    ).min(3).max(7),
  });

  const businessContext = `
Business: ${lead.name}
Category: ${lead.category ?? "Unknown"}
City: ${lead.city ?? "Unknown"}
Website: ${lead.website ?? "None"}
Rating: ${lead.google_rating ?? "No rating"}★ (${lead.review_count ?? 0} reviews)
Score: ${lead.score}/100
Issues: ${(lead.score_reasons ?? []).join(", ")}
${audit ? `SSL: ${audit.is_https ? "Yes" : "No"}, Mobile: ${audit.mobile_friendly ? "Yes" : "No"}, CTA: ${audit.has_cta ? "Yes" : "No"}` : ""}`.trim();

  try {
    const { object } = await generateObject({
      model: openrouter(model),
      schema: reportSchema,
      system: `You are a digital marketing expert creating a personalized business improvement report in Hebrew.
Generate 3-7 specific, actionable tips for this business.
Each tip should have: category (one of: אתר, SEO, גוגל, מדיה חברתית, מוניטין, שיווק, המרות), title (short), body (2-3 sentences, specific and practical).
Base the tips on the actual issues identified for this specific business.
Write in Hebrew. Be professional and helpful.`,
      prompt: businessContext,
    });

    const reportContent: ReportContent = {
      business_name: lead.name,
      website: lead.website ?? null,
      score: lead.score,
      score_reasons: lead.score_reasons ?? [],
      tips: object.tips,
      generated_at: new Date().toISOString(),
    };

    // Save report
    const { data: savedReport, error: saveError } = await adminSupabase
      .from("lead_reports")
      .insert({ lead_id, content: reportContent })
      .select()
      .single();

    if (saveError) {
      console.error("[report] save error:", saveError.message);
      return NextResponse.json({ error: "Failed to save report." }, { status: 500 });
    }

    return NextResponse.json({ report_id: savedReport.id, content: reportContent });
  } catch (e) {
    console.error("[report] AI error:", e);
    return NextResponse.json({ error: "Report generation failed." }, { status: 500 });
  }
}
