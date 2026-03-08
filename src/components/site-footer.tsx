import Link from "next/link";
import { MessageCircle, Mail, Shield } from "lucide-react";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("שלום פייטרס בילדרס!")}`;

const FOOTER_LINKS = {
  "שירותים": [
    { label: "פיתוח אתרים", href: "/#services" },
    { label: "מערכות וואטסאפ", href: "/#services" },
    { label: "אינטגרציית CRM", href: "/#services" },
    { label: "מעקב לידים", href: "/#services" },
    { label: "אוטומציה", href: "/#services" },
  ],
  "חברה": [
    { label: "אודות", href: "/about" },
    { label: "פורטפוליו", href: "/portfolio" },
    { label: "צור קשר", href: "/contact" },
  ],
};

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/[0.06] bg-[#05050b]"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                <span
                  className="text-blue-400 font-bold text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  FB
                </span>
              </div>
              <span
                className="font-bold text-white/80 tracking-wide"
                style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
              >
                FIGHTERS{" "}
                <span className="text-blue-400">BUILDERS</span>
              </span>
            </Link>

            <p className="text-sm text-white/55 max-w-xs leading-relaxed mb-5">
              שלושה לוחמי קרב בונים תשתית דיגיטלית לעסקים שמתכוונים ברצינות. דיוק צבאי. תוצאות של סוכנות.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/55 hover:text-emerald-400 transition-colors"
                suppressHydrationWarning
              >
                <MessageCircle className="w-3.5 h-3.5" />
                וואטסאפ (הכי מהיר)
              </a>
              <a
                href="mailto:hello@fightersbuilders.com"
                className="flex items-center gap-2 text-sm text-white/55 hover:text-blue-400 transition-colors"
                suppressHydrationWarning
              >
                <Mail className="w-3.5 h-3.5" />
                hello@fightersbuilders.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/45 mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white/85 transition-colors"
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

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40 flex items-center gap-2">
            <Shield className="w-3 h-3 text-blue-400/50" />
            {currentYear} פייטרס בילדרס. כל הזכויות שמורות.
          </p>
          <p className="text-xs text-white/35">
            נבנה בדיוק צבאי. פורס במהירות.
          </p>
        </div>
      </div>
    </footer>
  );
}
