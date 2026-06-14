import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { BusinessLeadStatus } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  return profile?.is_admin ? user : null;
}

export async function GET(req: NextRequest) {
  const adminUser = await requireAdmin();
  if (!adminUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status") as BusinessLeadStatus | null;

  const adminSupabase = await createAdminClient();
  let query = adminSupabase
    .from("business_leads")
    .select("*")
    .order("score", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data: leads, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Build CSV
  const headers = [
    "שם עסק", "קטגוריה", "עיר", "טלפון", "אתר", "דירוג גוגל",
    "מספר ביקורות", "ניקוד", "סטטוס", "סיבות", "תאריך הוספה",
  ];

  const rows = (leads ?? []).map((l) => [
    csvCell(l.name),
    csvCell(l.category),
    csvCell(l.city),
    csvCell(l.phone),
    csvCell(l.website),
    l.google_rating ?? "",
    l.review_count ?? "",
    l.score,
    csvCell(l.status),
    csvCell((l.score_reasons ?? []).join("; ")),
    new Date(l.created_at).toLocaleDateString("he-IL"),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) => r.join(",")),
  ].join("\n");

  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${Date.now()}.csv"`,
    },
  });
}

function csvCell(val: string | null | undefined): string {
  if (val == null) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
