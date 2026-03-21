"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignRow {
  id: string;
  name: string;
  type: string;
  status: string;
  total_sent: number | null;
  total_replied: number | null;
  total_leads: number | null;
  total_sales: number | null;
  reply_rate: number | null;
}

interface Props {
  campaigns: CampaignRow[];
}

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

const TABLE_HEADERS = [
  "שם",
  "סוג",
  "סטטוס",
  "נשלחו",
  "תגובות",
  "לידים",
  "מכירות",
  "אחוז תגובה",
  "",
];

export function CampaignTable({ campaigns }: Props) {
  if (campaigns.length === 0) {
    return (
      <div className="p-10 rounded-xl border border-white/[0.07] bg-[#0d0d18] text-center">
        <p className="text-white/25 text-sm">אין קמפיינים עדיין.</p>
        <Link
          href="/admin/campaigns/new"
          className="text-blue-400 text-xs mt-2 inline-block hover:text-blue-300"
        >
          + צור קמפיין ראשון
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0d0d18] overflow-hidden">
      <div className="px-5 py-4 border-b border-white/[0.05]">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          כל הקמפיינים
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h || "actions"}
                  className="px-4 py-3 text-right text-xs font-medium text-white/25 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr
                key={c.id}
                className={cn(
                  "border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors",
                  i === campaigns.length - 1 && "border-b-0"
                )}
              >
                <td className="px-4 py-3 font-medium text-white/80 whitespace-nowrap">
                  {c.name}
                </td>
                <td className="px-4 py-3 text-white/40 text-xs">
                  {TYPE_LABELS[c.type] ?? c.type}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[11px] font-medium border",
                      STATUS_COLORS[c.status] ?? STATUS_COLORS.draft
                    )}
                  >
                    {STATUS_LABELS[c.status] ?? c.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60 text-right">
                  {Number(c.total_sent ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-white/60 text-right">
                  {Number(c.total_replied ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-emerald-400 font-medium text-right">
                  {Number(c.total_leads ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-blue-400 font-medium text-right">
                  {Number(c.total_sales ?? 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-purple-400 font-medium">
                    {c.reply_rate ?? 0}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/campaigns/${c.id}`}
                    className="flex items-center gap-1 text-xs text-white/25 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
