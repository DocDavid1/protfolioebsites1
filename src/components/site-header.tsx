"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, LayoutDashboard } from "lucide-react";
import { DEFAULT_NAV_LINKS, NAV_STORAGE_KEY } from "@/app/admin/links-manager";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { whatsappUrl } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const WHATSAPP_URL = whatsappUrl("שלום פייטרס בילדרס!");

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    const stored = localStorage.getItem(NAV_STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Array<{ href: string; label: string }>;
      if (Array.isArray(parsed) && parsed.length > 0) {
        startTransition(() => setNavLinks(parsed));
      }
    } catch (_e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
      if (data?.is_admin) setIsAdmin(true);
    });
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0d0d18] focus:text-white focus:border focus:border-blue-500/30 focus:rounded-md text-sm"
      >
        דלג לתוכן הראשי
      </a>

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-[#05050b]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        )}
        role="banner"
      >
        <nav
          className="container mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4"
          style={{ height: scrolled ? "64px" : "72px", transition: "height 0.3s ease" }}
          aria-label="ניווט ראשי"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            aria-label="פייטרס בילדרס — חזור לעמוד הראשי"
          >
            <div className="relative w-9 h-10 group-hover:scale-105 transition-transform duration-300">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  transform: "scale(1.5)",
                }}
              />
              <svg
                viewBox="0 0 38 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="shield-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                  <linearGradient id="shield-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.08)" />
                    <stop offset="100%" stopColor="rgba(124,58,237,0.06)" />
                  </linearGradient>
                </defs>
                <path
                  d="M19 2L34 9.5V22C34 30 27.5 36 19 38C10.5 36 4 30 4 22V9.5L19 2Z"
                  fill="url(#shield-fill)"
                  stroke="url(#shield-stroke)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "12px",
                  letterSpacing: "0.15em",
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                aria-hidden="true"
              >
                FB
              </span>
            </div>

            <div className="hidden sm:flex flex-col leading-none" lang="en">
              <span
                className="uppercase tracking-[0.2em] text-gray-400 dark:text-white/40"
                style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: 600 }}
              >
                FIGHTERS
              </span>
              <span
                className="font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.05em",
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                BUILDERS
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-white/[0.07]"
                        : "text-gray-500 dark:text-white/45 hover:text-gray-900 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400/80 hover:text-amber-400 bg-amber-500/[0.06] hover:bg-amber-500/[0.12] border border-amber-500/15 transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                לוח בקרה
              </Link>
            )}
            <ModeToggle />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="וואטסאפ — נפתח בחלון חדש"
              className="hidden sm:inline-flex items-center gap-2 btn-whatsapp px-4 py-2 rounded-xl text-sm font-semibold text-white"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden lg:inline">וואטסאפ</span>
            </a>

            <button
              className="md:hidden p-2 rounded-xl text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-100/80 dark:hover:bg-white/[0.05] transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-white/[0.06] bg-white/98 dark:bg-[#05050b]/98 backdrop-blur-xl px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive
                      ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-white/[0.06]"
                      : "text-gray-500 dark:text-white/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 pb-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="התחל בוואטסאפ — נפתח בחלון חדש"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white btn-whatsapp"
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                דברו איתנו בוואטסאפ
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
