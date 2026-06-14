import { NextRequest, NextResponse } from "next/server";
import { openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { z } from "zod";
import { createClient, createAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const generateSchema = z.object({
  lead_id: z.string().uuid(),
  touch_number: z.number().int().min(1).max(7),
  language: z.enum(["he", "en"]).default("he"),
});

const TOUCH_PROMPTS: Record<number, { title: string; system: string }> = {
  1: {
    title: "טיפים מהירים לשיפור האתר",
    system: `You are a friendly digital agency expert writing a short, practical value message in Hebrew.
Write 3-5 specific, actionable website improvement tips for this business.
Be personal — mention the business name. Be practical — give real advice.
Tone: warm expert, not salesy. No fluff. No selling.
Format: short intro + bullet list of tips + friendly sign-off.
Keep under 250 words.`,
  },
  2: {
    title: "טיפים לשיפור הפרופיל בגוגל עסק",
    system: `You are a Google Business Profile expert writing a helpful message in Hebrew.
Write 3-5 specific tips to improve this business's Google Business Profile.
Include tips on: photos, responding to reviews, posts, business hours, Q&A.
Tone: helpful friend, not salesy. Mention the business name.
Keep under 250 words.`,
  },
  3: {
    title: "רעיונות לתוכן ברשתות חברתיות",
    system: `You are a social media strategist writing in Hebrew.
Suggest 5 specific content ideas for this business's social media.
Each idea should be practical and relevant to their industry.
Include: post type, topic, and why it would work for their audience.
Tone: creative and helpful. No selling.
Keep under 300 words.`,
  },
  4: {
    title: "הזדמנויות SEO",
    system: `You are an SEO expert writing a practical audit in Hebrew.
Identify 3-4 specific SEO opportunities for this business.
Focus on: local SEO, keyword opportunities, Google My Business, content gaps.
Be specific to their industry and location.
Tone: expert consultant, helpful. No selling.
Keep under 250 words.`,
  },
  5: {
    title: "בניית אמון ומוניטין",
    system: `You are a reputation management expert writing in Hebrew.
Give 3-4 specific suggestions to build customer trust and reputation for this business.
Include: review strategy, testimonials, trust signals, customer success stories.
Be practical and specific to their industry.
Tone: trusted advisor. No selling.
Keep under 250 words.`,
  },
  6: {
    title: "ניתוח תחרותי ומיצוב",
    system: `You are a business strategist writing in Hebrew.
Analyze the competitive landscape for this business and suggest 3-4 positioning improvements.
Include: differentiators, unique value proposition, untapped niches.
Be specific and insightful.
Tone: strategic advisor. No selling.
Keep under 250 words.`,
  },
  7: {
    title: "הצעת ערך — מסר מכירה עדין",
    system: `You are a business development expert from Fighters Builders digital agency writing in Hebrew.
Write a final soft-sell message that summarizes the value you can deliver to this specific business.
Reference 2-3 specific pain points you've identified in previous messages.
Offer a free consultation call. No pressure. Make it feel like a natural next step.
Include: specific problem you solve, brief mention of how, clear CTA for free call.
Tone: confident, warm, genuine. Not pushy.
Keep under 200 words.`,
  },
};

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

  const parsed = generateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 422 });

  const { lead_id, touch_number } = parsed.data;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "OPENROUTER_API_KEY not configured." }, { status: 503 });

  // Fetch lead data
  const adminSupabase = await createAdminClient();
  const { data: lead, error: leadError } = await adminSupabase
    .from("business_leads")
    .select("*")
    .eq("id", lead_id)
    .single();

  if (leadError || !lead) {
    return NextResponse.json({ error: "Lead not found." }, { status: 404 });
  }

  // Also fetch latest audit if available
  const { data: audit } = await adminSupabase
    .from("lead_audits")
    .select("*")
    .eq("lead_id", lead_id)
    .order("audited_at", { ascending: false })
    .limit(1)
    .single();

  const touchConfig = TOUCH_PROMPTS[touch_number];
  if (!touchConfig) return NextResponse.json({ error: "Invalid touch number." }, { status: 422 });

  const model = process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

  const businessContext = `
Business Name: ${lead.name}
Category: ${lead.category ?? "Unknown"}
City: ${lead.city ?? "Unknown"}
Phone: ${lead.phone ?? "Not listed"}
Website: ${lead.website ?? "No website"}
Google Rating: ${lead.google_rating != null ? `${lead.google_rating}★ (${lead.review_count ?? 0} reviews)` : "No Google listing"}
Lead Score: ${lead.score}/100
Issues Identified: ${(lead.score_reasons ?? []).join(", ") || "None"}
${audit ? `
Website Audit Results:
- HTTPS: ${audit.is_https ? "Yes" : "No"}
- Mobile Friendly: ${audit.mobile_friendly ? "Yes" : "No"}
- Page Title: ${audit.page_title ?? "Missing"}
- Meta Description: ${audit.meta_description ? "Present" : "Missing"}
- Has CTA: ${audit.has_cta ? "Yes" : "No"}
- Has Contact Form: ${audit.has_contact_form ? "Yes" : "No"}
- Social Links: ${(audit.social_links ?? []).join(", ") || "None"}
` : ""}`.trim();

  try {
    const { text } = await generateText({
      model: openrouter(model),
      system: touchConfig.system,
      prompt: `Write Touch #${touch_number} (${touchConfig.title}) for this business:\n\n${businessContext}`,
    });

    // Save the touchpoint
    await adminSupabase.from("lead_touchpoints").upsert(
      {
        lead_id,
        touch_number,
        content: text,
        status: "draft",
        channel: touch_number === 7 ? "whatsapp" : "email",
      },
      { onConflict: "lead_id,touch_number" }
    );

    return NextResponse.json({
      touch_number,
      title: touchConfig.title,
      content: text,
    });
  } catch (e) {
    console.error("[generate] AI error:", e);
    return NextResponse.json({ error: "AI generation failed." }, { status: 500 });
  }
}
