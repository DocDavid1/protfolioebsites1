import Link from "next/link";
import { Plus } from "lucide-react";
import { CampaignCharts } from "@/components/campaigns/campaign-charts";
import { CampaignKPIs } from "@/components/campaigns/campaign-kpis";
import { CampaignTable } from "@/components/campaigns/campaign-table";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "קמפיינים",
  robots: { index: false, follow: false },
};

export default async function CampaignsPage() {
  const supabase = await createClient();
  const { data: metrics } = await supabase
    .from("campaign_metrics")
    .select("*");
  const campaigns = metrics ?? [];

  const totalSent = campaigns.reduce(
    (s, c) => s + Number(c.total_sent ?? 0),
    0
  );
  const totalLeads = campaigns.reduce(
    (s, c) => s + Number(c.total_leads ?? 0),
    0
  );
  const totalSales = campaigns.reduce(
    (s, c) => s + Number(c.total_sales ?? 0),
    0
  );
  const activeCampaigns = campaigns.filter(
    (c) => c.status === "active"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-foreground/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            CAMPAIGNS
          </h1>
          <p className="text-xs text-foreground/30 mt-1">
            ניהול ומעקב קמפיינים שיווקיים
          </p>
        </div>
        <Link
          href="/admin/campaigns/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-foreground transition-all"
          style={{
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            boxShadow: "0 0 20px rgba(59,130,246,0.2)",
          }}
        >
          <Plus className="w-4 h-4" />
          קמפיין חדש
        </Link>
      </div>

      {/* KPI cards */}
      <CampaignKPIs
        totalSent={totalSent}
        totalLeads={totalLeads}
        totalSales={totalSales}
        activeCampaigns={activeCampaigns}
      />

      {/* Charts */}
      {campaigns.length > 0 && <CampaignCharts campaigns={campaigns} />}

      {/* Table */}
      <CampaignTable campaigns={campaigns} />
    </div>
  );
}
