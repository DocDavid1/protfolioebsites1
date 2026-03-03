"use client";

import { useState, useTransition } from "react";
import { MessageCircle, Mail, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Database, LeadStatus } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  qualified: "מוסיק",
  closed: "נסגר",
  lost: "נאבד",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  contacted: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  qualified: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  closed: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  lost: "text-red-400/70 bg-red-500/[0.07] border-red-500/15",
};

const ALL_STATUSES: LeadStatus[] = ["new", "contacted", "qualified", "closed", "lost"];

export function LeadsClient({ initialLeads }: { initialLeads: Lead[] }) {
  const supabase = createClient();
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const updateStatus = (leadId: string, status: LeadStatus) => {
    startTransition(async () => {
      const { data } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", leadId)
        .select()
        .single();
      if (data) {
        setLeads((prev) => prev.map((l) => (l.id === data.id ? data : l)));
        if (selectedLead?.id === data.id) setSelectedLead(data);
      }
    });
  };

  const countByStatus = (s: LeadStatus) => leads.filter((l) => l.status === s).length;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            לידים
          </h1>
          <p className="text-xs text-white/30">{leads.length} לידים סה&quot;כ</p>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
            filter === "all"
              ? "text-white bg-white/[0.08] border-white/[0.12]"
              : "text-white/35 bg-transparent border-white/[0.06] hover:border-white/[0.1]"
          )}
        >
          הכל ({leads.length})
        </button>
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              filter === s
                ? STATUS_COLORS[s]
                : "text-white/35 bg-transparent border-white/[0.06] hover:border-white/[0.1]"
            )}
          >
            {STATUS_LABELS[s]} ({countByStatus(s)})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.02]">
            <tr>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">שם</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden md:table-cell">קשר</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden lg:table-cell">שירות</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">סטטוס</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden sm:table-cell">תאריך</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-white/75">
                    {lead.name ?? "—"}
                  </p>
                  {lead.business && (
                    <p className="text-xs text-white/30">{lead.business}</p>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="space-y-0.5">
                    {lead.phone && (
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-3 h-3 text-white/20" />
                        <span className="text-xs text-white/45 font-mono">{lead.phone}</span>
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-white/20" />
                        <span className="text-xs text-white/45 font-mono">{lead.email}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <span className="text-xs text-white/35">{lead.service ?? "—"}</span>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                    disabled={isPending}
                    className={cn(
                      "text-xs px-2 py-1 rounded-md border appearance-none bg-transparent cursor-pointer transition-all",
                      STATUS_COLORS[lead.status as LeadStatus]
                    )}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-[#0d0d18] text-white">
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="text-xs text-white/25 font-mono">
                    {new Date(lead.created_at).toLocaleDateString("he-IL")}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-xs text-white/25">
                  אין לידים בסטטוס זה.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Lead detail drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedLead(null)}
          />
          <div className="relative z-10 w-full max-w-lg rounded-xl border border-white/[0.09] bg-[#0d0d18] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2
                className="text-base font-bold text-white/80"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {selectedLead.name ?? "ליד"}
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <DetailRow label="עסק" value={selectedLead.business} />
              <DetailRow label="טלפון" value={selectedLead.phone} mono />
              <DetailRow label="אימייל" value={selectedLead.email} mono />
              <DetailRow label="שירות" value={selectedLead.service} />
              <DetailRow label="מקור" value={selectedLead.source} />
              <DetailRow
                label="תאריך"
                value={new Date(selectedLead.created_at).toLocaleString("he-IL")}
                mono
              />
              {selectedLead.message && (
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-1">תדריך</p>
                  <p className="text-sm text-white/65 leading-relaxed bg-white/[0.03] rounded-lg p-3">
                    {selectedLead.message}
                  </p>
                </div>
              )}
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-2">שנה סטטוס</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedLead.id, s)}
                      disabled={selectedLead.status === s || isPending}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-50",
                        selectedLead.status === s
                          ? STATUS_COLORS[s]
                          : "text-white/35 border-white/[0.06] hover:border-white/[0.1]"
                      )}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {/* Quick actions */}
            <div className="px-6 py-4 border-t border-white/[0.06] flex gap-3">
              {selectedLead.phone && (
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp
                </a>
              )}
              {selectedLead.email && (
                <a
                  href={`mailto:${selectedLead.email}`}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-white/60 border border-white/10 hover:border-blue-500/30 hover:text-white transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  אימייל
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-4">
      <span className="text-xs text-white/25 uppercase tracking-wider w-16 shrink-0 pt-0.5">
        {label}
      </span>
      <span className={cn("text-sm text-white/65", mono && "font-mono")}>{value}</span>
    </div>
  );
}
