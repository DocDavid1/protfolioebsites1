import { createClient } from "@/lib/supabase/server";
import { LeadGenClient } from "./lead-gen-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Lead Generation",
  robots: { index: false, follow: false },
};

export default async function LeadGenPage() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from("business_leads")
    .select("*")
    .order("score", { ascending: false })
    .limit(200);

  return <LeadGenClient initialLeads={leads ?? []} />;
}
