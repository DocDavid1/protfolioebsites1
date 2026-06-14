"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderOpen, Users, Settings, LogOut, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/projects", label: "פרויקטים", icon: FolderOpen },
  { href: "/admin/leads", label: "לידים", icon: Users },
  { href: "/admin/settings", label: "הגדרות", icon: Settings },
];

export function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05050b]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span
            className="text-sm font-bold text-white/70 tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ADMIN
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                pathname.startsWith(href)
                  ? "text-white bg-white/[0.07]"
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/25 hidden sm:block">
            {userEmail}
          </span>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/30 hover:text-red-400 hover:bg-red-500/[0.06] transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">יציאה</span>
          </button>
        </div>
      </div>
    </header>
  );
}
