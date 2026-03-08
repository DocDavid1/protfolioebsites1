import { MessageCircle, Mail, Monitor, Headphones, AlertTriangle, FileText } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description:
    "הצהרת נגישות של FIGHTERS BUILDERS — מחויבות לנגישות הדיגיטלית בהתאם לתקן IS 5568 ו-WCAG 2.0 AA.",
};

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("פנייה בנושא נגישות:")}`;

const TESTED_BROWSERS = ["Google Chrome", "Mozilla Firefox", "Apple Safari"];
const ASSISTIVE_TECH = ["NVDA", "JAWS", "VoiceOver"];

const KNOWN_LIMITATIONS = [
  "תוכן מדיה חזותי עשוי לא לכלול תיאור טקסטואלי מלא בשלב זה.",
  "חלק מהאנימציות עשויות להיות מורכבות עבור טכנולוגיות מסייעות מסוימות, אך ניתן לבטלן דרך הגדרת prefers-reduced-motion במערכת ההפעלה.",
  "טפסים מסוימים עשויים לדרוש התאמות נוספות עבור קוראי מסך ספציפיים.",
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* Header */}
        <AnimateIn className="mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            נגישות
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="gradient-text-blue">הצהרת נגישות</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-2xl">
            <span lang="en">FIGHTERS BUILDERS</span> מחויבת לנגישות הדיגיטלית
            ולהבטיח שאתר זה נגיש לאנשים עם מוגבלויות.
          </p>
        </AnimateIn>

        {/* Conformance level */}
        <AnimateIn delay={100} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  רמת תאימות
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  האתר עומד ברמת{" "}
                  <span className="text-white/80 font-semibold" lang="en">
                    WCAG 2.0 AA
                  </span>{" "}
                  (תקן{" "}
                  <span className="text-white/80 font-semibold" lang="en">
                    IS 5568
                  </span>
                  ). אנו פועלים באופן שוטף לשפר את הנגישות באתר ולעמוד בתקנים
                  המחמירים ביותר.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Tested environments */}
        <AnimateIn delay={200} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5 text-violet-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  סביבות שנבדקו
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  האתר נבדק ונמצא תואם בדפדפנים ובטכנולוגיות המסייעות הבאות.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                  דפדפנים
                </h3>
                <ul className="space-y-2">
                  {TESTED_BROWSERS.map((browser) => (
                    <li
                      key={browser}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden="true" />
                      <span lang="en">{browser}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
                  <Headphones className="w-3 h-3" aria-hidden="true" />
                  טכנולוגיות מסייעות
                </h3>
                <ul className="space-y-2">
                  {ASSISTIVE_TECH.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-2 text-sm text-white/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                      <span lang="en">{tech}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Known limitations */}
        <AnimateIn delay={300} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  מגבלות ידועות
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  למרות מאמצינו, ייתכן שחלקים מסוימים באתר אינם נגישים
                  באופן מלא. אנו עובדים לתקן את הבעיות הבאות:
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {KNOWN_LIMITATIONS.map((limitation, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/55 leading-relaxed"
                >
                  <span className="text-amber-400/70 font-mono text-xs mt-0.5 shrink-0">
                    {i + 1}.
                  </span>
                  {limitation}
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        {/* Feedback / Contact */}
        <AnimateIn delay={400} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <h2
              className="text-xl font-bold text-white/90 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              משוב ויצירת קשר
            </h2>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              נתקלתם בבעיית נגישות? נשמח לשמוע ממכם כדי שנוכל לשפר. ניתן
              לפנות אלינו בכל אחד מהערוצים הבאים:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="וואטסאפ — נפתח בחלון חדש"
                className="flex items-center gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08] transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    וואטסאפ
                  </p>
                  <p className="text-xs text-white/35">פנייה בנושא נגישות</p>
                </div>
              </a>

              <a
                href="mailto:hello@fightersbuilders.com?subject=פנייה בנושא נגישות"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.07] bg-[#0d0d18] hover:border-blue-500/25 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors" lang="en">
                    hello@fightersbuilders.com
                  </p>
                  <p className="text-xs text-white/35">אימייל</p>
                </div>
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* Statement date */}
        <AnimateIn delay={500}>
          <div className="text-center">
            <p className="text-xs text-white/30">
              הצהרה זו עודכנה לאחרונה: מרץ 2026
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
