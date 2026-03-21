"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CampaignMetric {
  name: string;
  type: string;
  total_leads: number | null;
  reply_rate: number | null;
}

interface Props {
  campaigns: CampaignMetric[];
}

const TYPE_COLORS: Record<string, string> = {
  whatsapp: "#22c55e",
  email: "#3b82f6",
  sms: "#a855f7",
  social: "#f59e0b",
  cold_call: "#f97316",
  referral: "#06b6d4",
};

const TOOLTIP_STYLE = {
  backgroundColor: "#0d0d18",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "8px",
  color: "rgba(255,255,255,0.8)",
  fontSize: "12px",
};

function truncateName(name: string, max: number): string {
  return name.length > max ? name.slice(0, max) + "\u2026" : name;
}

export function CampaignCharts({ campaigns }: Props) {
  const leadsData = campaigns.map((c) => ({
    name: truncateName(c.name, 14),
    leads: Number(c.total_leads ?? 0),
    type: c.type,
  }));

  const replyData = campaigns.map((c) => ({
    name: truncateName(c.name, 14),
    replyRate: Number(c.reply_rate ?? 0),
    type: c.type,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Leads per campaign */}
      <div className="p-5 rounded-xl border border-white/[0.07] bg-[#0d0d18]">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
          לידים לפי קמפיין
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={leadsData}
            margin={{ top: 4, right: 4, left: -20, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar dataKey="leads" name="לידים" radius={[4, 4, 0, 0]}>
              {leadsData.map((entry, i) => (
                <Cell
                  key={`leads-${i}`}
                  fill={TYPE_COLORS[entry.type] ?? "#3b82f6"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-3">
          {Object.entries(TYPE_COLORS).map(([type, color]) => (
            <span
              key={type}
              className="flex items-center gap-1.5 text-xs text-white/30"
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: color }}
              />
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Reply rate */}
      <div className="p-5 rounded-xl border border-white/[0.07] bg-[#0d0d18]">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
          אחוז תגובה לפי קמפיין
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={replyData}
            margin={{ top: 4, right: 4, left: -20, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              formatter={(v) => [`${v}%`, "אחוז תגובה"]}
            />
            <Bar
              dataKey="replyRate"
              name="אחוז תגובה"
              fill="#a855f7"
              radius={[4, 4, 0, 0]}
            >
              {replyData.map((entry, i) => (
                <Cell
                  key={`reply-${i}`}
                  fill={TYPE_COLORS[entry.type] ?? "#a855f7"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
