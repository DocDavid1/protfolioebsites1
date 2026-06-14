import Link from "next/link";
import { MessageCircle, Mail, Phone, Shield, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("שלום פייטרס בילדרס!")}`;

const FOOTER_LINKS = {
  "שירותים": [
    { label: "בניית אתרים", href: "/#services" },
    { label: "חנויות אונליין", href: "/#services" },
    { label: "משפכים שיווקיים", href: "/#services" },
    { label: "אוטומציה עסקית", href: "/#services" },
    { label: "ייצור לידים", href: "/#services" },
    { label: "שיווק דיגיטלי", href: "/#services" },
  ],
  "חברה": [
    { label: "אודות", href: "/about" },
    { label: "הסיפור שלנו", href: "/#story" },
    { label: "פורטפוליו", href: "/portfolio" },
    { label: "תהליך עבודה", href: "/#process" },
    { label: "צור קשר", href: "/contact" },
  ],
};

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#05050b]"
      role="contentinfo"
    >
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, rgba(59,130,246,0.3), rgba(245,158,11,0.2), transparent)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 py-14 md:py-20">
        {/* Mini CTA strip */}
        <div className="glass-strong rounded-2xl p-6 md:p-8 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white/90 mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              מוכנים להתחיל?
            </h3>
            <p className="text-sm text-gray-500 dark:text-white/45">
              שיחת ייעוץ חינם. ללא התחייבות. הודעה אחת ומתחילים.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            דברו איתנו
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                <span
                  className="text-blue-400 font-bold text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  FB
                </span>
              </div>
              <span
                className="font-bold text-gray-800 dark:text-white/80 tracking-wide"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
              >
                FIGHTERS <span className="text-blue-400">BUILDERS</span>
              </span>
            </Link>

            <p className="text-sm text-gray-500 dark:text-white/50 max-w-sm leading-relaxed mb-6">
              שלושה לוחמי קרב ישראלים בונים תשתית דיגיטלית לעסקים. דיוק צבאי, מחירים נגישים, תוצאות של סוכנות פרמיום.
            </p>

            {/* Contact */}
            <div className="space-y-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="וואטסאפ — נפתח בחלון חדש"
                className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-white/50 hover:text-emerald-400 transition-colors group"
                suppressHydrationWarning
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                </div>
                וואטסאפ (הכי מהיר)
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-white/50 hover:text-blue-400 transition-colors group"
                suppressHydrationWarning
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                </div>
                <span dir="ltr">+972-50-123-4567</span>
              </a>
              <a
                href="mailto:hello@fightersbuilders.com"
                className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-white/50 hover:text-blue-400 transition-colors group"
                suppressHydrationWarning
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                </div>
                hello@fightersbuilders.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/45 mb-5">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-white/50 hover:text-white/85 transition-colors"
                      suppressHydrationWarning
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal links */}
        <div className="border-t border-gray-200/50 dark:border-white/[0.04] pt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6">
          {[
            { label: "מדיניות פרטיות", href: "/privacy-policy" },
            { label: "תנאי שימוש", href: "/terms-of-use" },
            { label: "עוגיות", href: "/cookies" },
            { label: "נגישות", href: "/accessibility" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-gray-300 dark:text-white/25 hover:text-gray-500 dark:hover:text-white/50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200/50 dark:border-white/[0.04] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 dark:text-white/35 flex items-center gap-2">
            <Shield className="w-3 h-3 text-blue-400/50" aria-hidden="true" />
            {currentYear} פייטרס בילדרס. כל הזכויות שמורות.
          </p>
          <p className="text-xs text-gray-300 dark:text-white/25">
            נבנה בדיוק צבאי. מהונדס לצמיחה.
          </p>
        </div>
      </div>
    </footer>
  );
}
