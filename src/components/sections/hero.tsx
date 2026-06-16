import Link from "next/link";
import { ArrowRight, MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import { HeroVideo } from "./hero-video";

const WHATSAPP_URL = whatsappUrl("שלום פייטרס בילדרס! אני מתעניין בשירותים שלכם.");

/* Floating decorative icons — pure SVG, no JS animation */
function FloatingIcon({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute pointer-events-none hero-floating-icon ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      <HeroVideo />

      {/* Layered atmosphere */}
      <div className="absolute inset-0 bg-tactical-grid opacity-30" aria-hidden="true" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(59,130,246,0.15) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 85% 70%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 15% 60%, rgba(139,92,246,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Floating decorative icons */}
      <FloatingIcon
        className="animate-float-drift hidden md:block"
        style={{ top: "18%", left: "8%", opacity: 0.5, animationDelay: "0s" }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="4" y="26" fontSize="24" fontFamily="monospace" fill="rgba(96,165,250,0.4)">&lt;/&gt;</text>
        </svg>
      </FloatingIcon>

      <FloatingIcon
        className="animate-float-drift-reverse hidden md:block"
        style={{ top: "25%", right: "10%", opacity: 0.45, animationDelay: "2s" }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4l3 6 6 1-4.5 4 1 6.5L16 18.5 10.5 21.5l1-6.5L7 11l6-1z" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" fill="none"/>
        </svg>
      </FloatingIcon>

      <FloatingIcon
        className="animate-float-orbit hidden lg:block"
        style={{ bottom: "30%", left: "5%", opacity: 0.4, animationDelay: "4s" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="20" height="14" rx="2" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5"/>
          <path d="M4 12h20M10 12v10M4 16h6" stroke="rgba(139,92,246,0.25)" strokeWidth="1"/>
        </svg>
      </FloatingIcon>

      <FloatingIcon
        className="animate-float-drift hidden lg:block"
        style={{ bottom: "22%", right: "7%", opacity: 0.4, animationDelay: "6s" }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 3l2 5h5l-4 3 1.5 5L15 13.5 10.5 16 12 11 8 8h5z" fill="rgba(59,130,246,0.25)" stroke="rgba(59,130,246,0.35)" strokeWidth="1"/>
        </svg>
      </FloatingIcon>

      {/* Morphing blob decorations */}
      <div
        className="absolute top-1/3 right-[10%] w-[500px] h-[500px] pointer-events-none opacity-30 animate-morph-blob"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] pointer-events-none opacity-25 animate-morph-blob"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
          filter: "blur(50px)",
          animationDelay: "4s",
        }}
        aria-hidden="true"
      />

      {/* Scan line */}
      <div className="hero-scan-line" aria-hidden="true" />

      {/* HUD corners */}
      <div className="hud-corner hud-tl" aria-hidden="true" />
      <div className="hud-corner hud-tr" aria-hidden="true" />
      <div className="hud-corner hud-bl" aria-hidden="true" />
      <div className="hud-corner hud-br" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Top badge */}
          <div className="animate-fade-up delay-100 flex items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-600 dark:text-white/60">
                שלושה לוחמים. משימה אחת. העסק שלך.
              </span>
            </div>
          </div>

          {/* Main headline — dramatic reveal */}
          <h1 className="animate-hero-reveal delay-300 mb-8">
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none mb-3 text-gray-900 dark:text-white/95 dark:drop-shadow-[0_4px_40px_rgba(0,0,0,0.8)]"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              אנחנו לא בונים אתרים.
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight gradient-text-hero leading-none"
              style={{
                fontFamily: "var(--font-display)",
              }}
            >
              אנחנו בונים מנועי צמיחה.
            </span>
          </h1>

          {/* Animated divider line */}
          <div
            className="animate-line-expand delay-600 mx-auto mb-8 h-[2px] w-32"
            style={{
              background: "linear-gradient(to left, #3b82f6, #f59e0b)",
            }}
          />

          {/* Tagline */}
          <p className="animate-fade-up delay-700 text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-white/70 font-light mb-4 max-w-3xl mx-auto leading-relaxed">
            שלושה לוחמי קרב ישראלים שהפכו את המשמעת הצבאית{" "}
            <span className="text-gray-900 dark:text-white font-medium">למערכות דיגיטליות שמייצרות תוצאות</span>
          </p>

          <p className="animate-fade-up delay-800 text-base text-gray-500 dark:text-white/45 mb-12 max-w-2xl mx-auto leading-relaxed">
            אתרים. חנויות אונליין. משפכים שיווקיים. אוטומציות. הכל בדיוק, מחויבות ומחירים שכל עסק יכול להרשות לעצמו.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-900 flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-base"
            >
              <MessageCircle className="w-5 h-5" />
              דברו איתנו בוואטסאפ
            </a>

            <Link
              href="/contact"
              className="btn-outline group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-semibold text-gray-700 dark:text-white/70 text-base"
            >
              קבעו שיחת ייעוץ חינם
              <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Trust signals row */}
          <div className="animate-fade-up delay-1000 flex flex-wrap items-center justify-center gap-8">
            {[
              { label: "פרויקטים", value: "30+", color: "#60a5fa" },
              { label: "שביעות רצון", value: "100%", color: "#fbbf24" },
              { label: "זמן מענה", value: "3 דק׳", color: "#34d399" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                {i > 0 && <div className="w-px h-6 bg-white/10 hidden sm:block" />}
                <div className="text-center">
                  <p
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: item.color,
                    }}
                  >
                    {item.value}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-white/35 mt-0.5">{item.label}</p>
                </div>
              </div>
            ))}

            <div className="w-px h-6 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-400 dark:text-white/40">
                זמינים לפרויקטים חדשים
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint">
        <ChevronDown className="w-5 h-5 text-gray-400 dark:text-white/30" />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
