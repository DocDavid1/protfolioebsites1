import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_MESSAGE = "שלום פייטרס בילדרס! אני רוצה לדון על פרויקט.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function FinalCTA() {
  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      aria-label="קריאה לפעולה"
    >
      {/* Top divider */}
      <div className="divider-brand absolute top-0 left-0 right-0" />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.06) 40%, transparent 70%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(245,158,11,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-tactical-grid opacity-50" aria-hidden="true" />

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <AnimateIn>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-6 block">
            מוכן לביצוע
          </span>
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הפסק לתכנן.
            <br />
            <span className="gradient-text-blue">התחל לבנות.</span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={100}>
          <p className="text-lg text-white/65 max-w-xl mx-auto mb-10 leading-relaxed">
            הודעת וואטסאפ אחת היא כל מה שצריך כדי להתחיל לבנות את התשתית הדיגיטלית שהעסק שלך ראוי לה.
          </p>
        </AnimateIn>

        <AnimateIn delay={200} className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white text-base transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              boxShadow: "0 0 40px rgba(34,197,94,0.25)",
            }}
          >
            <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
            שלח לנו הודעה בוואטסאפ
          </a>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300 text-base"
          >
            שלח תדריך
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateIn>

        {/* Trust signals */}
        <AnimateIn delay={300} className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/45">
          {[
            "מענה מהיר מובטח",
            "ייעוץ ראשוני חינם",
            "ללא חוזים ארוכי טווח",
          ].map((item, i) => (
            <span key={item} className="flex items-center gap-1.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-white/15 hidden sm:block" />}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
              {item}
            </span>
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}
