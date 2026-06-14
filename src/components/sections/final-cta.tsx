import Link from "next/link";
import { MessageCircle, ArrowRight, Phone, Mail, CheckCircle2 } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { BUSINESS, whatsappUrl } from "@/lib/config";

const WHATSAPP_URL = whatsappUrl("שלום פייטרס בילדרס! אני רוצה לדון על פרויקט.");

export function FinalCTA() {
  return (
    <section
      className="py-28 md:py-40 relative overflow-hidden"
      aria-label="קריאה לפעולה"
    >
      <div className="divider-brand absolute top-0 left-0 right-0" />

      {/* Dramatic gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 30%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 30% 70%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-tactical-grid opacity-40" aria-hidden="true" />

      {/* Morphing background blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] pointer-events-none animate-morph-blob"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] pointer-events-none animate-morph-blob"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 60%)",
          filter: "blur(60px)",
          animationDelay: "5s",
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-6 block">
              הצעד הבא שלך
            </span>
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              העסק שלך{" "}
              <span className="gradient-text-hero">ראוי ליותר.</span>
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <p className="text-lg md:text-xl text-gray-600 dark:text-white/60 max-w-2xl mx-auto mb-6 leading-relaxed">
              בזמן שאתה קורא את זה, המתחרים שלך כבר בונים נוכחות דיגיטלית.
              אל תישאר מאחור.
            </p>
            <p className="text-base text-gray-500 dark:text-white/45 max-w-xl mx-auto mb-12">
              הודעת וואטסאפ אחת, שיחת ייעוץ חינם, ותוכנית פעולה ברורה לעסק שלך. בלי התחייבות.
            </p>
          </AnimateIn>

          {/* CTA buttons */}
          <AnimateIn delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp group inline-flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-2xl font-bold text-white text-lg"
              >
                <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
                שלחו הודעה בוואטסאפ
              </a>

              <Link
                href="/contact"
                className="btn-outline group inline-flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-2xl font-semibold text-gray-600 dark:text-white/65 text-lg"
              >
                שלחו בקשה לפגישה
                <ArrowRight className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          </AnimateIn>

          {/* Trust signals */}
          <AnimateIn delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-14">
              {[
                "מענה תוך דקות",
                "ייעוץ ראשוני חינם",
                "ללא חוזים ארוכי טווח",
                "מחירים נגישים לכל עסק",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2 text-sm text-gray-400 dark:text-white/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/70" />
                  {item}
                </span>
              ))}
            </div>
          </AnimateIn>

          {/* Alternative contact methods */}
          <AnimateIn delay={400}>
            <div className="glass-strong rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
              <p className="text-sm text-gray-500 dark:text-white/50 mb-4">או דברו איתנו ישירות:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-blue-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{BUSINESS.phone}</span>
                </a>
                <div className="w-px h-4 bg-white/10 hidden sm:block" />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/60 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
