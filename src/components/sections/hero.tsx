import Link from "next/link";
import { ArrowRight, MessageCircle, Sword } from "lucide-react";
import { HeroVideo } from "./hero-video";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_MESSAGE = "שלום פייטרס בילדרס! אני מתעניין בשירותים שלכם.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Video background (client — handles prefers-reduced-motion) */}
      <HeroVideo />

      {/* Tactical grid background */}
      <div className="absolute inset-0 bg-tactical-grid opacity-40" aria-hidden="true" />
      <div className="absolute inset-0 bg-topo opacity-60" aria-hidden="true" />

      {/* Radial glow gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(245,158,11,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Diagonal light shafts */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 270deg at 50% -10%, rgba(59,130,246,0.06) 0deg, transparent 30deg, transparent 330deg, rgba(59,130,246,0.06) 360deg)",
        }}
        aria-hidden="true"
      />

      {/* Animated glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          animation: "pulse-glow 6s ease-in-out infinite",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)",
          animation: "pulse-glow 8s ease-in-out infinite 2s",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-3/4 right-1/3 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
          animation: "pulse-glow 10s ease-in-out infinite 4s",
        }}
        aria-hidden="true"
      />

      {/* Scan line sweep */}
      <div className="hero-scan-line" aria-hidden="true" />

      {/* HUD targeting corners */}
      <div className="hud-corner hud-tl" aria-hidden="true" />
      <div className="hud-corner hud-tr" aria-hidden="true" />
      <div className="hud-corner hud-bl" aria-hidden="true" />
      <div className="hud-corner hud-br" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="animate-fade-up delay-100 flex items-center gap-2 mb-8">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/[0.07]">
              <Sword className="w-3 h-3 text-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                לוחמי קרב — בוני עסקים
              </span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up delay-200">
            <span
              className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white/95 mb-2 leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              FIGHTERS
            </span>
            <span
              className="block text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight gradient-text-rainbow mb-6 leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              BUILDERS
            </span>
          </h1>

          {/* Tagline */}
          <p className="animate-fade-up delay-300 text-xl md:text-2xl text-white/55 font-light mb-4 max-w-2xl leading-relaxed">
            אנחנו לא רק בונים אתרים.{" "}
            <span className="text-white/80 font-medium">
              אנחנו בונים נשק דיגיטלי.
            </span>
          </p>

          <p className="animate-fade-up delay-400 text-base text-white/35 mb-10 max-w-xl leading-relaxed">
            שלושה לוחמי קרב ישראלים, משימה אחת: ליישם דיוק צבאי ועוצמת ביצוע על התשתית הדיגיטלית שלך.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-500 flex flex-col sm:flex-row gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:brightness-110"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                boxShadow: "0 0 30px rgba(34,197,94,0.2)",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              התחל בוואטסאפ
            </a>

            <Link
              href="/portfolio"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white/80 border border-white/10 hover:border-violet-500/40 hover:text-white hover:bg-violet-500/[0.07] transition-all duration-300"
            >
              צפה בעבודות
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Social proof */}
          <div className="animate-fade-up delay-600 mt-14 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#05050b]"
                    style={{
                      background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
                      opacity: 0.7 + i * 0.075,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-white/40">
                <span className="text-white/70 font-semibold">20+</span> לקוחות צומחים
              </p>
            </div>

            <div className="w-px h-6 bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm text-white/40">
                זמין לפרויקטים חדשים
              </span>
            </div>
          </div>
        </div>

        {/* Floating stat cards */}
        <div
          className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 space-y-4 animate-fade-up delay-700"
          aria-hidden="true"
        >
          {[
            { label: "אתרים שנבנו", value: "30+", color: "#3b82f6" },
            { label: "אוטומציות פעילות", value: "50+", color: "#f59e0b" },
            { label: "ROI ממוצע ללקוח", value: "3x", color: "#10b981" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl px-5 py-3 min-w-[160px]"
              style={{
                background: "#0d0d18",
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRight: `2px solid ${stat.color}`,
              }}
            >
              <p
                className="text-2xl font-bold font-mono"
                style={{ color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #05050b)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
