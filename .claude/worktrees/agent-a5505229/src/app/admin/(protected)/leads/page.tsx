import { createClient } from "@/lib/supabase/server";
import { LeadsClient } from "./leads-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return <LeadsClient initialLeads={leads ?? []} />;
}
