import Link from "next/link";
import { Target, Users, Megaphone, Settings, FolderOpen, ArrowLeft, TrendingUp, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — לוח בקרה",
  robots: { index: false, follow: false },
};

const MODULES = [
  {
    href: "/admin/lead-gen",
    icon: Target,
    title: "יצירת לידים",
    description: "חיפוש עסקים דרך Google, ניקוד 0-100, סריקת אתרים ויצירת תוכן AI ב-7 נגיעות",
    color: "blue",
  },
  {
    href: "/admin/leads",
    icon: Users,
    title: "פניות",
    description: "ניהול פניות שנכנסו מטופס יצירת קשר באתר",
    color: "emerald",
  },
  {
    href: "/admin/campaigns",
    icon: Megaphone,
    title: "קמפיינים",
    description: "ניהול קמפיינים שיווקיים ומעקב אחר תוצאות",
    color: "purple",
  },
  {
    href: "/admin/projects",
    icon: FolderOpen,
    title: "פרויקטים",
    description: "ניהול פרויקטים בפורטפוליו",
    color: "amber",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    title: "הגדרות",
    description: "הגדרות מערכת וקישורי ניווט האתר",
    color: "slate",
  },
] as const;

type ModuleColor = "blue" | "emerald" | "purple" | "amber" | "slate";

const COLOR_MAP: Record<ModuleColor, { card: string; icon: string }> = {
  blue: { card: "border-blue-500/15 hover:border-blue-500/30 hover:bg-blue-500/[0.03]", icon: "text-blue-400 bg-blue-500/10" },
  emerald: { card: "border-emerald-500/15 hover:border-emerald-500/30 hover:bg-emerald-500/[0.03]", icon: "text-emerald-400 bg-emerald-500/10" },
  purple: { card: "border-purple-500/15 hover:border-purple-500/30 hover:bg-purple-500/[0.03]", icon: "text-purple-400 bg-purple-500/10" },
  amber: { card: "border-amber-500/15 hover:border-amber-500/30 hover:bg-amber-500/[0.03]", icon: "text-amber-400 bg-amber-500/10" },
  slate: { card: "border-border hover:bg-foreground/[0.02]", icon: "text-foreground/50 bg-foreground/[0.06]" },
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { count: leadsCount },
    { count: bizLeadsCount },
    { count: campaignsCount },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("business_leads").select("*", { count: "exact", head: true }),
    supabase.from("campaigns").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "פניות מהאתר", value: leadsCount ?? 0, icon: Users, color: "text-emerald-400" },
    { label: "עסקים שנסרקו", value: bizLeadsCount ?? 0, icon: Target, color: "text-blue-400" },
    { label: "קמפיינים", value: campaignsCount ?? 0, icon: TrendingUp, color: "text-purple-400" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">מרכז פעולות</span>
          </div>
          <h1
            className="text-3xl font-bold text-foreground/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            לוח בקרה
          </h1>
        </div>
        <Link
          href="/"
          className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" />
          חזור לאתר
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="p-5 rounded-xl border border-border bg-card">
            <Icon className={`w-5 h-5 mb-3 ${color}`} />
            <p className="text-2xl font-bold text-foreground/90 mb-1">{value}</p>
            <p className="text-xs text-foreground/35">{label}</p>
          </div>
        ))}
      </div>

      {/* Module cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODULES.map(({ href, icon: Icon, title, description, color }) => {
          const colors = COLOR_MAP[color];
          return (
            <Link
              key={href}
              href={href}
              className={`group p-5 rounded-xl border bg-card transition-all ${colors.card}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${colors.icon}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground/80 group-hover:text-foreground/95 mb-1.5 transition-colors">
                {title}
              </h3>
              <p className="text-xs text-foreground/35 leading-relaxed">
                {description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
