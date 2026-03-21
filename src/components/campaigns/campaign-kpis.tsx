"use client";

import { Send, Target, TrendingUp, Zap } from "lucide-react";

interface Props {
  totalSent: number;
  totalLeads: number;
  totalSales: number;
  activeCampaigns: number;
}

const COLOR_MAP = {
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  emerald: {
    icon: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  amber: {
    icon: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
} as const;

type ColorKey = keyof typeof COLOR_MAP;

export function CampaignKPIs({
  totalSent,
  totalLeads,
  totalSales,
  activeCampaigns,
}: Props) {
  const cards: {
    label: string;
    value: string;
    icon: typeof Send;
    color: ColorKey;
  }[] = [
    {
      label: "הודעות נשלחו",
      value: totalSent.toLocaleString(),
      icon: Send,
      color: "blue",
    },
    {
      label: "לידים",
      value: totalLeads.toLocaleString(),
      icon: Target,
      color: "purple",
    },
    {
      label: "מכירות",
      value: totalSales.toLocaleString(),
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "קמפיינים פעילים",
      value: activeCampaigns.toString(),
      icon: Zap,
      color: "amber",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => {
        const c = COLOR_MAP[color];
        return (
          <div
            key={label}
            className="p-5 rounded-xl border border-white/[0.07] bg-[#0d0d18]"
          >
            <div
              className={`w-9 h-9 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center mb-3`}
            >
              <Icon className={`w-4 h-4 ${c.icon}`} />
            </div>
            <p
              className="text-2xl font-bold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {value}
            </p>
            <p className="text-xs text-white/35 mt-1">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
