import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CampaignEventLog } from "@/components/campaigns/campaign-event-log";
import { CampaignQuickLog } from "@/components/campaigns/campaign-quick-log";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  draft: "text-white/40 bg-white/[0.05] border-white/[0.08]",
  active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  paused: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  completed: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "טיוטה",
  active: "פעיל",
  paused: "מושהה",
  completed: "הושלם",
};

const TYPE_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  email: "אימייל",
  sms: "SMS",
  social: "סושיאל",
  cold_call: "שיחה קרה",
  referral: "הפנייה",
};

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: metrics }, { data: events }] = await Promise.all([
    supabase.from("campaign_metrics").select("*").eq("id", id).single(),
    supabase
      .from("campaign_events")
      .select("*")
      .eq("campaign_id", id)
      .order("occurred_at", { ascending: false })
      .limit(50),
  ]);

  if (!metrics) notFound();

  const kpis = [
    { label: "נשלחו", value: Number(metrics.total_sent ?? 0) },
    { label: "תגובות", value: Number(metrics.total_replied ?? 0) },
    { label: "לידים", value: Number(metrics.total_leads ?? 0) },
    { label: "מכירות", value: Number(metrics.total_sales ?? 0) },
  ];

  const rates = [
    { label: "אחוז תגובה", value: `${metrics.reply_rate ?? 0}%` },
    { label: "אחוז ליד", value: `${metrics.lead_rate ?? 0}%` },
    { label: "אחוז סגירה", value: `${metrics.close_rate ?? 0}%` },
    {
      label: "הכנסה",
      value: `\u20AA${Number(metrics.total_revenue ?? 0).toLocaleString()}`,
    },
  ];

  const statusKey = metrics.status ?? "draft";
  const typeKey = metrics.type ?? "";

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link
          href="/admin/campaigns"
          className="mt-1 text-white/30 hover:text-white/60 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1
              className="text-xl font-bold text-white/90 truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {metrics.name}
            </h1>
            <span
              className={cn(
                "px-2 py-0.5 rounded text-[11px] font-medium border",
                STATUS_COLORS[statusKey] ?? STATUS_COLORS.draft
              )}
            >
              {STATUS_LABELS[statusKey] ?? statusKey}
            </span>
            <span className="text-xs text-white/25">
              {TYPE_LABELS[typeKey] ?? typeKey}
            </span>
          </div>
          {metrics.target_audience && (
            <p className="text-xs text-white/30 mt-1">
              קהל יעד: {metrics.target_audience}
            </p>
          )}
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {kpis.map(({ label, value }) => (
          <div
            key={label}
            className="p-4 rounded-xl border border-white/[0.07] bg-[#0d0d18] text-center"
          >
            <p
              className="text-2xl font-bold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value.toLocaleString()}
            </p>
            <p className="text-xs text-white/30 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Rate row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {rates.map(({ label, value }) => (
          <div
            key={label}
            className="p-4 rounded-xl border border-white/[0.07] bg-[#0d0d18] text-center"
          >
            <p
              className="text-xl font-bold gradient-text-blue"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </p>
            <p className="text-xs text-white/30 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick log */}
      <CampaignQuickLog campaignId={id} />

      {/* Event log */}
      <CampaignEventLog events={events ?? []} />
    </div>
  );
}
