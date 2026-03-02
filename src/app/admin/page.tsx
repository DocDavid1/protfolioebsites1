import { Lock, FolderOpen, Bot, Zap, Users, BarChart2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Fighters Builders admin panel",
  robots: { index: false, follow: false },
};

// TODO: Implement authentication guard before this panel goes live
// Use: import { auth } from "@/lib/auth"
// const session = await auth.api.getSession({ headers: await headers() })
// if (!session || !session.user) redirect("/login")

type AdminColor = "blue" | "purple" | "amber" | "emerald" | "orange" | "red";

const MODULES: Array<{
  icon: React.ElementType;
  title: string;
  description: string;
  status: string;
  color: AdminColor;
}> = [
  {
    icon: FolderOpen,
    title: "Portfolio Manager",
    description:
      "Add, edit, and remove portfolio projects. Upload preview screenshots.",
    status: "planned",
    color: "blue",
  },
  {
    icon: Bot,
    title: "AI Onboarding Agent",
    description:
      "Configure the AI agent that qualifies new leads via WhatsApp.",
    status: "planned",
    color: "purple",
  },
  {
    icon: Zap,
    title: "Automation Control",
    description: "Manage active automation flows and triggers.",
    status: "planned",
    color: "amber",
  },
  {
    icon: Users,
    title: "CRM Sync",
    description:
      "View and manage incoming leads, contacts, and deal pipeline.",
    status: "planned",
    color: "emerald",
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description:
      "Site performance, conversion rates, and campaign attribution.",
    status: "planned",
    color: "orange",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Team member management, roles, and API key management.",
    status: "planned",
    color: "red",
  },
];

const COLOR_MAP: Record<AdminColor, { icon: string; badge: string }> = {
  blue: { icon: "text-blue-400 bg-blue-500/10", badge: "text-blue-400/60 bg-blue-500/[0.05] border-blue-500/15" },
  purple: { icon: "text-purple-400 bg-purple-500/10", badge: "text-purple-400/60 bg-purple-500/[0.05] border-purple-500/15" },
  amber: { icon: "text-amber-400 bg-amber-500/10", badge: "text-amber-400/60 bg-amber-500/[0.05] border-amber-500/15" },
  emerald: { icon: "text-emerald-400 bg-emerald-500/10", badge: "text-emerald-400/60 bg-emerald-500/[0.05] border-emerald-500/15" },
  orange: { icon: "text-orange-400 bg-orange-500/10", badge: "text-orange-400/60 bg-orange-500/[0.05] border-orange-500/15" },
  red: { icon: "text-red-400 bg-red-500/10", badge: "text-red-400/60 bg-red-500/[0.05] border-red-500/15" },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Admin Panel
            </span>
          </div>
          <h1
            className="text-4xl font-bold text-white/90 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            OPERATIONS CENTER
          </h1>
          <p className="text-white/35 text-sm">
            This panel is under construction. Authentication and full module
            implementation coming soon.
          </p>
        </div>

        {/* Auth placeholder notice */}
        <div className="p-4 mb-10 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] flex items-start gap-3">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-400 mb-0.5">
              Authentication Required
            </p>
            <p className="text-xs text-white/35">
              This page will be protected by BetterAuth session validation.
              Unauthenticated users will be redirected to /login.
            </p>
          </div>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((module) => {
            const Icon = module.icon;
            const colors = COLOR_MAP[module.color];
            return (
              <div
                key={module.title}
                className="p-5 rounded-xl border border-white/7 bg-[#0d0d18] opacity-60"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.icon}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border ${colors.badge}`}
                  >
                    {module.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white/60 mb-1.5">
                  {module.title}
                </h3>
                <p className="text-xs text-white/30 leading-relaxed">
                  {module.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* File structure reference */}
        <div className="mt-10 p-5 rounded-xl border border-white/[0.05] bg-white/[0.01]">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
            Architecture Reference
          </p>
          <div className="font-mono text-xs text-white/20 space-y-1">
            <p>
              <span className="text-white/40">src/</span>
              agents/ — AI agent definitions
            </p>
            <p>
              <span className="text-white/40">src/</span>
              automations/ — automation workflows
            </p>
            <p>
              <span className="text-white/40">src/</span>
              lib/ai/ — AI provider configs
            </p>
            <p>
              <span className="text-white/40">src/</span>
              lib/integrations/ — CRM, WhatsApp, webhooks
            </p>
            <p>
              <span className="text-white/40">src/</span>
              app/api/admin/ — protected API routes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
