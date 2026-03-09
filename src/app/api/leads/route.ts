import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/server";

// ── Rate limiting (in-memory, per IP) ────────────────────────────────────────
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_MAX = 3; // max 3 submissions per window per IP

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_MAX) return true;

  entry.count++;
  return false;
}

// ── Zod schema ────────────────────────────────────────────────────────────────
const leadSchema = z.object({
  name: z.string().min(1, "שם נדרש").max(120),
  business: z.string().max(200).optional(),
  email: z.string().email("אימייל לא תקין").optional().or(z.literal("")),
  phone: z.string().max(30).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(5, "נדרש תיאור של לפחות 5 תווים").max(2000),
  privacy_policy_accepted: z.boolean().optional(),
  consent_to_contact: z.boolean().optional(),
  marketing_consent: z.boolean().optional(),
  privacy_policy_version: z.string().optional(),
  source_page: z.string().optional(),
  // Honeypot — bots fill this, humans don't see it
  _h: z.string().max(0, "honeypot").optional(),
});

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // IP for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסה שוב בעוד דקה." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "שדות לא תקינים." },
      { status: 422 }
    );
  }

  const { _h, ...data } = parsed.data;

  // Honeypot check — silently discard bot submissions
  if (_h && _h.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      business: data.business ?? null,
      email: data.email || null,
      phone: data.phone ?? null,
      service: data.service ?? null,
      message: data.message,
      source: "contact_form",
      status: "new",
      privacy_policy_accepted: data.privacy_policy_accepted ?? false,
      consent_to_contact: data.consent_to_contact ?? false,
      marketing_consent: data.marketing_consent ?? false,
      privacy_policy_version: data.privacy_policy_version ?? "1.0",
      source_page: data.source_page ?? null,
    });

    if (error) {
      console.error("[leads] insert error:", error.message);
      return NextResponse.json(
        { error: "שגיאה בשמירת הפנייה. נסה שוב." },
        { status: 500 }
      );
    }
  } catch (_e) {
    // If Supabase is not configured yet (no env), silently succeed in dev
    if (process.env.NODE_ENV !== "production") {
      console.warn("[leads] Supabase not configured — lead not persisted.");
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "שגיאה פנימית." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
