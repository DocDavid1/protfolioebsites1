import {
  MessageCircle,
  Mail,
  Monitor,
  Headphones,
  AlertTriangle,
  FileText,
  Shield,
  Accessibility,
  Keyboard,
} from "lucide-react";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות",
  description:
    "הצהרת נגישות של FIGHTERS BUILDERS — מחויבות לנגישות הדיגיטלית בהתאם לתקן IS 5568 ו-WCAG 2.0 AA.",
};

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("פנייה בנושא נגישות:")}`;

const TESTED_BROWSERS = ["Google Chrome", "Mozilla Firefox", "Apple Safari", "Microsoft Edge"];
const ASSISTIVE_TECH = ["NVDA", "JAWS", "VoiceOver", "TalkBack"];

const ACTIONS_TAKEN = [
  "סרגל נגישות מובנה המאפשר שינוי גודל טקסט, ניגודיות, גווני אפור, ביטול אנימציות ועוד.",
  "קישור דילוג לתוכן ראשי (Skip to content) בראש כל עמוד.",
  "תגיות ARIA מלאות על רכיבים אינטראקטיביים — כפתורים, תפריטים, דיאלוגים וטפסים.",
  "מצבי פוקוס (focus) ברורים וגלויים בכל אלמנט אינטראקטיבי.",
  "ניווט מלא באמצעות מקלדת בלבד, כולל תפריטים ודיאלוגים.",
  "תמיכה מלאה בכיווניות RTL (ימין לשמאל) לעברית.",
  "מבנה כותרות היררכי תקין (h1 → h2 → h3) בכל עמוד.",
  "ניגודיות צבעים העומדת ברמת AA — יחס ניגודיות 4.5:1 לפחות לטקסט רגיל.",
  "כיבוד הגדרת prefers-reduced-motion — כל האנימציות מבוטלות אוטומטית למשתמשים שהגדירו כך.",
  "טפסים עם תוויות (labels) ברורות והודעות שגיאה נגישות (role=alert).",
];

const TOOLBAR_FEATURES = [
  "הגדלת / הקטנת טקסט",
  "ניגודיות גבוהה",
  "צבעים הפוכים",
  "גווני אפור",
  "הדגשת קישורים וכותרות",
  "גופן קריא (Arial)",
  "קו תחתון לקישורים",
  "ביטול אנימציות",
  "ניווט מקלדת משופר",
  "איפוס כל ההגדרות",
];

const KNOWN_LIMITATIONS = [
  "תוכן מדיה חזותי (תמונות דקורטיביות) עשוי לא לכלול תיאור alt מפורט בכל המקרים.",
  "חלק מהאנימציות המורכבות עשויות להיות מעט שונות בטכנולוגיות מסייעות מסוימות, אך ניתן לבטלן לחלוטין דרך סרגל הנגישות או דרך הגדרת prefers-reduced-motion במערכת ההפעלה.",
  "ווידג'טים של צדדים שלישיים (אם יתווספו בעתיד) עשויים שלא לעמוד ברמת הנגישות שלנו.",
  "קבצי PDF (אם קיימים) עשויים לדרוש התאמות נגישות נוספות.",
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
          <p className="text-xs text-white/35">
            עדכון אחרון: מרץ 2026
          </p>
        </AnimateIn>

        {/* 1. Introduction */}
        <AnimateIn delay={100} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  מבוא
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  <span lang="en">FIGHTERS BUILDERS</span> מחויבת לנגישות הדיגיטלית
                  ולהבטיח שאתר זה נגיש לכלל האנשים, כולל אנשים עם מוגבלויות.
                  אנו מאמינים שלכל אדם מגיעה גישה שוויונית למידע ולשירותים דיגיטליים,
                  ולכן אנו משקיעים מאמץ מתמשך בשיפור הנגישות של אתרנו.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* 2. Standard */}
        <AnimateIn delay={150} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  תקן הנגישות
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
                  ) — התקן הישראלי לנגישות אתרי אינטרנט. אנו פועלים באופן שוטף לשפר את הנגישות באתר ולעמוד בתקנים המחמירים ביותר, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998, ותקנות הנגישות הרלוונטיות.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* 3. Actions taken */}
        <AnimateIn delay={200} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Accessibility className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  פעולות שננקטו
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  להלן רשימת הפעולות שננקטו להנגשת האתר:
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {ACTIONS_TAKEN.map((action, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/55 leading-relaxed"
                >
                  <span className="text-emerald-400/70 font-mono text-xs mt-0.5 shrink-0">
                    {i + 1}.
                  </span>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        {/* 4. Toolbar features */}
        <AnimateIn delay={250} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                <Keyboard className="w-5 h-5 text-violet-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  רכיבי הנגישות שבאתר
                </h2>
                <p className="text-sm text-white/55 leading-relaxed">
                  באתר מותקן סרגל נגישות נגיש (בצד שמאל למטה) המאפשר שליטה בהיבטים הבאים:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TOOLBAR_FEATURES.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>

            <p className="text-xs text-white/35 mt-4">
              ההגדרות נשמרות בדפדפן ונטענות אוטומטית בביקור הבא.
            </p>
          </div>
        </AnimateIn>

        {/* 5. Known limitations */}
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

        {/* 6. Tested environments */}
        <AnimateIn delay={350} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 rounded-lg bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white/90 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  דפדפנים וטכנולוגיות מסייעות שנבדקו
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

        {/* 7. Feedback / Contact */}
        <AnimateIn delay={400} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <h2
              className="text-xl font-bold text-white/90 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              פניות ודיווח על בעיות
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

        {/* 8. Accessibility coordinator */}
        <AnimateIn delay={450} className="mb-10">
          <div className="surface-card rounded-xl p-6 md:p-8">
            <h2
              className="text-xl font-bold text-white/90 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              רכז הנגישות
            </h2>
            <p className="text-sm text-white/55 leading-relaxed mb-4">
              לפניות בנושא נגישות ניתן ליצור קשר עם רכז הנגישות שלנו:
            </p>
            <div className="space-y-1 text-sm text-white/55">
              <p><strong className="text-white/70">שם:</strong> <span className="text-white/70 font-semibold">[שם רכז נגישות] [PLACEHOLDER]</span></p>
              <p><strong className="text-white/70">אימייל:</strong> <span lang="en">hello@fightersbuilders.com</span></p>
              <p><strong className="text-white/70">טלפון / וואטסאפ:</strong> <span dir="ltr">+972-50-123-4567</span></p>
            </div>
          </div>
        </AnimateIn>

        {/* 9. Statement date */}
        <AnimateIn delay={500}>
          <div className="text-center space-y-3">
            <p className="text-xs text-white/30">
              הצהרה זו עודכנה לאחרונה: מרץ 2026
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <Link href="/" className="text-blue-400 hover:underline">
                חזרה לדף הבית
              </Link>
              <Link href="/contact" className="text-blue-400 hover:underline">
                צור קשר
              </Link>
              <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                מדיניות פרטיות
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
