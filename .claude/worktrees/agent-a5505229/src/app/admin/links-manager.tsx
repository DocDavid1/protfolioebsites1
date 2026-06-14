"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  Save,
  Link2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_STORAGE_KEY = "fb_nav_links";

export interface NavLink {
  href: string;
  label: string;
}

export const DEFAULT_NAV_LINKS: NavLink[] = [
  { href: "/", label: "ראשי" },
  { href: "/portfolio", label: "פורטפוליו" },
  { href: "/about", label: "אודות" },
  { href: "/contact", label: "צור קשר" },
];

export function LinksManager() {
  const [links, setLinks] = useState<NavLink[]>(() => {
    if (typeof window === "undefined") return DEFAULT_NAV_LINKS;
    const stored = localStorage.getItem(NAV_STORAGE_KEY);
    if (!stored) return DEFAULT_NAV_LINKS;
    try {
      const parsed = JSON.parse(stored) as NavLink[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (_e) {
      // ignore parse errors
    }
    return DEFAULT_NAV_LINKS;
  });
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const save = () => {
    localStorage.setItem(NAV_STORAGE_KEY, JSON.stringify(links));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const reset = () => {
    setLinks(DEFAULT_NAV_LINKS);
    localStorage.removeItem(NAV_STORAGE_KEY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addLink = () => {
    const label = newLabel.trim();
    const href = newHref.trim();
    if (!label) {
      setError("נדרשת תווית");
      return;
    }
    if (!href) {
      setError("נדרש נתיב");
      return;
    }
    if (!href.startsWith("/") && !href.startsWith("http")) {
      setError("הנתיב חייב להתחיל ב- / או https://");
      return;
    }
    setLinks((prev) => [...prev, { href, label }]);
    setNewLabel("");
    setNewHref("");
    setError("");
  };

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveLink = (index: number, direction: "up" | "down") => {
    setLinks((prev) => {
      const next = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return prev;
      const a = next[index]!;
      const b = next[target]!;
      next[index] = b;
      next[target] = a;
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0d0d18] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/[0.05] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
            <Link2 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h2
              className="text-sm font-semibold text-white/80"
              style={{ fontFamily: "var(--font-display)" }}
            >
              ניהול קישורי ניווט
            </h2>
            <p className="text-xs text-white/25">
              הקישורים שיוצגו בסרגל הניווט כלשוניות
            </p>
          </div>
        </div>
        <span className="text-xs font-mono text-white/20 bg-white/[0.03] px-2 py-1 rounded border border-white/[0.05]">
          {links.length} קישורים
        </span>
      </div>

      {/* Links list */}
      <div className="p-4 space-y-2">
        {links.map((link, i) => (
          <div
            key={`${link.href}-${i}`}
            className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.09] hover:bg-white/[0.03] transition-all"
          >
            {/* Index */}
            <span className="text-[10px] font-mono text-white/20 w-5 shrink-0 text-center">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Reorder */}
            <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={() => moveLink(i, "up")}
                disabled={i === 0}
                className="p-0.5 rounded hover:bg-white/[0.08] text-white/20 hover:text-white/50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                aria-label="הזז למעלה"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => moveLink(i, "down")}
                disabled={i === links.length - 1}
                className="p-0.5 rounded hover:bg-white/[0.08] text-white/20 hover:text-white/50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                aria-label="הזז למטה"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Label */}
            <span className="flex-1 text-sm font-medium text-white/70">
              {link.label}
            </span>

            {/* Href */}
            <span className="text-xs font-mono text-blue-400/50 max-w-[180px] truncate hidden sm:block">
              {link.href}
            </span>

            {/* Preview link */}
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-white/[0.06] text-white/20 hover:text-white/50 transition-all"
              aria-label="פתח קישור"
            >
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Delete */}
            <button
              onClick={() => removeLink(i)}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded hover:bg-red-500/10 text-white/20 hover:text-red-400 transition-all"
              aria-label="הסר קישור"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}

        {links.length === 0 && (
          <div className="text-center py-10 text-xs text-white/20">
            אין קישורים. הוסף קישורים למטה.
          </div>
        )}
      </div>

      {/* Add new link form */}
      <div className="px-4 pb-4">
        <div className="p-4 rounded-lg border border-dashed border-white/[0.07] bg-white/[0.01]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-3">
            הוסף קישור חדש
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="תווית"
              value={newLabel}
              onChange={(e) => {
                setNewLabel(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") addLink();
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all"
              dir="rtl"
            />
            <input
              type="text"
              placeholder="/path"
              value={newHref}
              onChange={(e) => {
                setNewHref(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") addLink();
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-sm text-white/80 placeholder:text-white/20 outline-none focus:border-blue-500/40 focus:bg-white/[0.06] transition-all font-mono"
              dir="ltr"
            />
            <button
              onClick={addLink}
              className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all flex items-center gap-1.5 text-sm font-medium shrink-0"
            >
              <Plus className="w-4 h-4" />
              הוסף
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-400/70 mt-2">{error}</p>
          )}
        </div>
      </div>

      {/* Actions footer */}
      <div className="px-6 py-4 border-t border-white/[0.05] flex items-center justify-between">
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-white/25 hover:text-white/45 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          אפס לברירת מחדל
        </button>

        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs text-emerald-400/70 animate-fade-in">
              ✓ נשמר בהצלחה
            </span>
          )}
          <button
            onClick={save}
            className={cn(
              "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
              saved
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-blue-500/15 border border-blue-500/25 text-blue-300 hover:bg-blue-500/25 hover:border-blue-500/35"
            )}
          >
            <Save className="w-3.5 h-3.5" />
            {saved ? "נשמר!" : "שמור שינויים"}
          </button>
        </div>
      </div>
    </div>
  );
}
