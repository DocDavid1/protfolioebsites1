"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, MessageCircle, Settings, LogOut, LogIn } from "lucide-react";
import { DEFAULT_NAV_LINKS, NAV_STORAGE_KEY } from "@/app/admin/links-manager";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { User } from "@supabase/supabase-js";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("שלום פייטרס בילדרס!")}`;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);
  const [user, setUser] = useState<User | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  // Close mobile menu on Escape key
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
      // ignore parse errors
    }
  }, []);

  // Track auth state
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setSigningOut(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0d0d18] focus:text-white focus:border focus:border-blue-500/30 focus:rounded-md text-sm"
      >
        דלג לתוכן הראשי
      </a>

      <header
        className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#05050b]/90 backdrop-blur-md"
        role="banner"
      >
        <nav
          className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4"
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
                className="uppercase tracking-[0.2em] text-white/40"
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
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-white bg-white/[0.06]"
                        : "text-white/45 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="וואטסאפ — נפתח בחלון חדש"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                boxShadow: "0 0 16px rgba(34,197,94,0.15)",
              }}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden lg:inline">וואטסאפ</span>
            </a>

            {/* Auth / Admin controls */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/admin/projects"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/35 transition-all"
                  aria-label="פאנל ניהול"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/40 bg-white/[0.04] border border-white/[0.08] hover:text-white/70 hover:border-white/[0.15] transition-all disabled:opacity-50"
                  aria-label="התנתק"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">יציאה</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login?redirect=/admin/projects"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/35 transition-all"
                aria-label="כניסה לפאנל ניהול"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.05] transition-all"
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
          <div className="md:hidden border-t border-white/[0.06] bg-[#05050b] px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "text-white bg-white/[0.06]"
                      : "text-white/50 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 space-y-2 pb-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                התחל בוואטסאפ
              </a>
              {user ? (
                <>
                  <Link
                    href="/admin/projects"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-amber-400 border border-amber-500/20 bg-amber-500/10"
                  >
                    <Settings className="w-4 h-4" />
                    Admin Panel
                  </Link>
                  <button
                    onClick={() => { setMobileOpen(false); void handleSignOut(); }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white/50 border border-white/[0.08] bg-white/[0.03]"
                  >
                    <LogOut className="w-4 h-4" />
                    יציאה מהמערכת
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login?redirect=/admin/projects"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-amber-400 border border-amber-500/20 bg-amber-500/10"
                >
                  <LogIn className="w-4 h-4" />
                  כניסה לאדמין
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
