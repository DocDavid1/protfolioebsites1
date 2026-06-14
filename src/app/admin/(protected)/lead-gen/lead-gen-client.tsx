"use client";

import { useState, useTransition } from "react";
import {
  Search, Download, Globe, Star, Phone, MapPin, TrendingUp,
  RefreshCw, Eye, X, CheckCircle, AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { BusinessLead, BusinessLeadStatus } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const STATUS_LABELS: Record<BusinessLeadStatus, string> = {
  new: "חדש",
  qualified: "מוסיק",
  contacted: "נוצר קשר",
  follow_up: "המשך מעקב",
  won: "נסגר",
  lost: "נאבד",
};

const STATUS_COLORS: Record<BusinessLeadStatus, string> = {
  new: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  qualified: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  contacted: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  follow_up: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  won: "text-green-400 bg-green-500/10 border-green-500/20",
  lost: "text-red-400/70 bg-red-500/[0.07] border-red-500/15",
};

const ALL_STATUSES: BusinessLeadStatus[] = ["new", "qualified", "contacted", "follow_up", "won", "lost"];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 75 ? "text-red-400 bg-red-500/10 border-red-500/20" :
    score >= 55 ? "text-amber-400 bg-amber-500/10 border-amber-500/20" :
    "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
  return (
    <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", color)}>
      {score}
    </span>
  );
}

export function LeadGenClient({ initialLeads }: { initialLeads: BusinessLead[] }) {
  const supabase = createClient();
  const [leads, setLeads] = useState<BusinessLead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<BusinessLead[] | null>(null);
  const [searchError, setSearchError] = useState("");
  const [filterStatus, setFilterStatus] = useState<BusinessLeadStatus | "all">("all");
  const [selectedLead, setSelectedLead] = useState<BusinessLead | null>(null);
  const [isPending, startTransition] = useTransition();
  const [auditingId, setAuditingId] = useState<string | null>(null);
  const [generatingTouch, setGeneratingTouch] = useState<number | null>(null);
  const [touchContent, setTouchContent] = useState<Record<number, string>>({});
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const filteredLeads = filterStatus === "all"
    ? leads
    : leads.filter((l) => l.status === filterStatus);

  const handleSearch = async (save: boolean) => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError("");
    setSearchResults(null);

    try {
      const res = await fetch("/api/admin/leads/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          city: searchCity || undefined,
          save,
        }),
      });
      const data = (await res.json()) as {
        results?: BusinessLead[];
        error?: string;
        total?: number;
      };

      if (!res.ok || data.error) {
        setSearchError(data.error ?? "שגיאה בחיפוש");
      } else {
        setSearchResults(data.results ?? []);
        if (save && data.results) {
          // Refresh the lead list from Supabase
          const { data: freshLeads } = await supabase
            .from("business_leads")
            .select("*")
            .order("score", { ascending: false })
            .limit(200);
          setLeads(freshLeads ?? []);
        }
      }
    } catch {
      setSearchError("שגיאת רשת. נסה שוב.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveResult = async (lead: BusinessLead) => {
    const { error } = await supabase.from("business_leads").upsert(
      [{ ...lead, status: "new" }],
      { onConflict: "place_id", ignoreDuplicates: true }
    );
    if (!error) {
      const { data: freshLeads } = await supabase
        .from("business_leads")
        .select("*")
        .order("score", { ascending: false })
        .limit(200);
      setLeads(freshLeads ?? []);
    }
  };

  const updateStatus = (leadId: string, status: BusinessLeadStatus) => {
    startTransition(async () => {
      const { data } = await supabase
        .from("business_leads")
        .update({ status })
        .eq("id", leadId)
        .select()
        .single();
      if (data) {
        setLeads((prev) => prev.map((l) => (l.id === data.id ? (data as BusinessLead) : l)));
        if (selectedLead?.id === data.id) setSelectedLead(data as BusinessLead);
      }
    });
  };

  const runAudit = async (lead: BusinessLead) => {
    if (!lead.website) return;
    setAuditingId(lead.id);
    try {
      const res = await fetch("/api/admin/leads/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: lead.id, website: lead.website }),
      });
      const data = (await res.json()) as { new_score?: number; reasons?: string[]; error?: string };
      if (data.new_score != null) {
        setLeads((prev) =>
          prev.map((l) =>
            l.id === lead.id
              ? { ...l, score: data.new_score!, score_reasons: data.reasons ?? l.score_reasons }
              : l
          )
        );
        if (selectedLead?.id === lead.id) {
          setSelectedLead((s) => s ? { ...s, score: data.new_score!, score_reasons: data.reasons ?? s.score_reasons } : s);
        }
      }
    } finally {
      setAuditingId(null);
    }
  };

  const generateTouch = async (leadId: string, touchNumber: number) => {
    setGeneratingTouch(touchNumber);
    try {
      const res = await fetch("/api/admin/leads/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: leadId, touch_number: touchNumber }),
      });
      const data = (await res.json()) as { content?: string; error?: string };
      if (data.content) {
        setTouchContent((prev) => ({ ...prev, [touchNumber]: data.content! }));
      }
    } finally {
      setGeneratingTouch(null);
    }
  };

  const generateReport = async (leadId: string) => {
    setGeneratingReport(true);
    setReportContent(null);
    try {
      const res = await fetch("/api/admin/leads/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead_id: leadId }),
      });
      const data = (await res.json()) as {
        content?: { tips: Array<{ category: string; title: string; body: string }> };
        report_id?: string;
        error?: string;
      };
      if (data.content) {
        const formatted = data.content.tips
          .map((t) => `**${t.category} — ${t.title}**\n${t.body}`)
          .join("\n\n");
        setReportContent(formatted);
      }
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleExport = () => {
    const status = filterStatus !== "all" ? `?status=${filterStatus}` : "";
    window.open(`/api/admin/leads/export${status}`, "_blank");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white/90 mb-1" style={{ fontFamily: "var(--font-display)" }}>
            יצירת לידים
          </h1>
          <p className="text-xs text-white/30">{leads.length} לידים שמורים</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white/60 border border-white/[0.08] hover:border-white/20 hover:text-white/80 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          ייצוא CSV
        </button>
      </div>

      {/* Search */}
      <div className="surface-card rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-white/70 mb-4">חפש עסקים בגוגל</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(false)}
              placeholder='סוג עסק (למשל: "מסעדה", "מכון יופי")'
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pr-10 pl-4 py-2.5 text-sm text-white/80 placeholder-white/25 focus:outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="עיר (לא חובה)"
              className="w-full sm:w-40 bg-white/[0.04] border border-white/[0.08] rounded-lg pr-10 pl-4 py-2.5 text-sm text-white/80 placeholder-white/25 focus:outline-none focus:border-blue-500/40 transition-all"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSearch(false)}
            disabled={isSearching || !searchQuery.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 border border-white/[0.08] hover:border-white/20 disabled:opacity-40 transition-all"
          >
            {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            תצוגה מקדימה
          </button>
          <button
            onClick={() => handleSearch(true)}
            disabled={isSearching || !searchQuery.trim()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-40 transition-all"
          >
            חפש ושמור
          </button>
        </div>

        {searchError && (
          <div className="mt-3 flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-3.5 h-3.5" />
            {searchError}
          </div>
        )}

        {/* Search results preview */}
        {searchResults && (
          <div className="mt-5 space-y-2">
            <p className="text-xs text-white/40 mb-3">{searchResults.length} תוצאות</p>
            {searchResults.map((r, i) => (
              <div key={r.place_id ?? i} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/75 truncate">{r.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    {r.google_rating && (
                      <span className="text-xs text-amber-400 flex items-center gap-1">
                        <Star className="w-3 h-3" />{r.google_rating}
                      </span>
                    )}
                    {r.city && <span className="text-xs text-white/30">{r.city}</span>}
                    {r.website && <Globe className="w-3 h-3 text-emerald-400" />}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ScoreBadge score={r.score} />
                  <button
                    onClick={() => handleSaveResult(r)}
                    className="text-xs px-2.5 py-1 rounded-md text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 transition-all"
                  >
                    שמור
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <button
          onClick={() => setFilterStatus("all")}
          className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
            filterStatus === "all" ? "text-white bg-white/[0.08] border-white/[0.12]" : "text-white/35 border-white/[0.06] hover:border-white/[0.1]"
          )}
        >
          הכל ({leads.length})
        </button>
        {ALL_STATUSES.map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
              filterStatus === s ? STATUS_COLORS[s] : "text-white/35 border-white/[0.06] hover:border-white/[0.1]"
            )}
          >
            {STATUS_LABELS[s]} ({leads.filter((l) => l.status === s).length})
          </button>
        ))}
      </div>

      {/* Leads table */}
      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.02]">
            <tr>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">עסק</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden md:table-cell">קשר</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden lg:table-cell">ציון</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">סטטוס</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-white/75">{lead.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {lead.category && <span className="text-xs text-white/30">{lead.category}</span>}
                    {lead.city && <span className="text-xs text-white/25">· {lead.city}</span>}
                    {lead.google_rating && (
                      <span className="text-xs text-amber-400 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5" />{lead.google_rating}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <div className="space-y-0.5">
                    {lead.phone && (
                      <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono">
                        <Phone className="w-3 h-3 text-white/20" />{lead.phone}
                      </div>
                    )}
                    {lead.website && (
                      <a href={lead.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors"
                      >
                        <Globe className="w-3 h-3" />{new URL(lead.website).hostname}
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <ScoreBadge score={lead.score} />
                    <div className="w-20 bg-white/[0.05] rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${lead.score}%`,
                          background: lead.score >= 75 ? "#f87171" : lead.score >= 55 ? "#fbbf24" : "#34d399",
                        }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as BusinessLeadStatus)}
                    disabled={isPending}
                    className={cn("text-xs px-2 py-1 rounded-md border appearance-none bg-transparent cursor-pointer", STATUS_COLORS[lead.status as BusinessLeadStatus])}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s} className="bg-[#0d0d18] text-white">{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => { setSelectedLead(lead); setTouchContent({}); setReportContent(null); }}
                    className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-xs text-white/25">אין לידים.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Lead detail modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedLead(null)} />
          <div className="relative z-10 w-full max-w-2xl rounded-xl border border-white/[0.09] bg-[#0d0d18] shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#0d0d18] flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div>
                <h2 className="text-base font-bold text-white/80" style={{ fontFamily: "var(--font-display)" }}>
                  {selectedLead.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <ScoreBadge score={selectedLead.score} />
                  {selectedLead.city && <span className="text-xs text-white/30">{selectedLead.city}</span>}
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Business info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {selectedLead.phone && (
                  <div><p className="text-white/30 mb-1">טלפון</p><p className="text-white/70 font-mono">{selectedLead.phone}</p></div>
                )}
                {selectedLead.website && (
                  <div><p className="text-white/30 mb-1">אתר</p>
                    <a href={selectedLead.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline truncate block">
                      {selectedLead.website}
                    </a>
                  </div>
                )}
                {selectedLead.google_rating && (
                  <div><p className="text-white/30 mb-1">דירוג גוגל</p>
                    <p className="text-amber-400">{selectedLead.google_rating}★ ({selectedLead.review_count ?? 0} ביקורות)</p>
                  </div>
                )}
                {selectedLead.google_maps_url && (
                  <div><p className="text-white/30 mb-1">גוגל מפות</p>
                    <a href={selectedLead.google_maps_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">פתח במפות</a>
                  </div>
                )}
              </div>

              {/* Score reasons */}
              {selectedLead.score_reasons && selectedLead.score_reasons.length > 0 && (
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-2">בעיות שזוהו</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.score_reasons.map((r) => (
                      <span key={r} className="text-xs px-2 py-1 rounded-md bg-red-500/[0.07] border border-red-500/15 text-red-400/80">{r}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                {selectedLead.website && (
                  <button
                    onClick={() => runAudit(selectedLead)}
                    disabled={auditingId === selectedLead.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 disabled:opacity-50 transition-all"
                  >
                    {auditingId === selectedLead.id ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    ביצוע ביקורת אתר
                  </button>
                )}
                <button
                  onClick={() => generateReport(selectedLead.id)}
                  disabled={generatingReport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-500/20 text-amber-400 hover:bg-amber-500/10 disabled:opacity-50 transition-all"
                >
                  {generatingReport ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
                  צור דוח מותאם
                </button>
              </div>

              {/* Generated report */}
              {reportContent && (
                <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.03] p-4">
                  <p className="text-xs text-amber-400 font-semibold mb-3">דוח מותאם אישית</p>
                  <div className="text-xs text-white/60 whitespace-pre-line leading-relaxed">{reportContent}</div>
                  <button
                    onClick={() => {
                      const win = window.open("", "_blank");
                      if (win) {
                        win.document.write(`<pre style="font-family:sans-serif;direction:rtl;padding:2rem;">${reportContent}</pre>`);
                        win.print();
                      }
                    }}
                    className="mt-3 text-xs text-amber-400 hover:underline"
                  >
                    הדפס / שמור כ-PDF
                  </button>
                </div>
              )}

              {/* 7-Touch system */}
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3">מגע 1–7 (ייצור תוכן AI)</p>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => {
                    const titles: Record<number, string> = {
                      1: "שיפורי אתר", 2: "גוגל עסק", 3: "תוכן חברתי",
                      4: "SEO", 5: "בניית מוניטין", 6: "מיצוב תחרותי", 7: "הצעה רכה",
                    };
                    return (
                      <div key={n} className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-white/60">
                            מגע #{n} — {titles[n]}
                          </span>
                          <button
                            onClick={() => generateTouch(selectedLead.id, n)}
                            disabled={generatingTouch === n}
                            className="text-xs px-2.5 py-1 rounded-md text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 disabled:opacity-50 transition-all flex items-center gap-1"
                          >
                            {generatingTouch === n ? <RefreshCw className="w-3 h-3 animate-spin" /> : null}
                            {touchContent[n] ? "ייצר מחדש" : "ייצר"}
                          </button>
                        </div>
                        {touchContent[n] && (
                          <p className="text-xs text-white/50 leading-relaxed whitespace-pre-line">{touchContent[n]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick contact */}
              <div className="flex gap-3 pt-2">
                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-white bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    WhatsApp
                  </a>
                )}
                {selectedLead.google_maps_url && (
                  <a
                    href={selectedLead.google_maps_url}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-white/60 border border-white/10 hover:border-blue-500/30 transition-all"
                  >
                    <MapPin className="w-4 h-4" />
                    מפות
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
