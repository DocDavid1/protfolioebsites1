// ⚠️ LEGAL REVIEW REQUIRED: This privacy policy contains template content.
// It must be reviewed and approved by a licensed Israeli attorney before production launch.
// Relevant laws: Protection of Privacy Law 5741-1981, GDPR (if applicable), CCPA (if applicable)

import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description:
    "מדיניות הפרטיות של FIGHTERS BUILDERS — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
};

const LAST_UPDATED = "מרץ 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <AnimateIn>
          {/* Header */}
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
              משפטי
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="gradient-text-blue">מדיניות פרטיות</span>
            </h1>
            <p className="text-xs text-white/35">
              עדכון אחרון: {LAST_UPDATED}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-sm text-white/55 leading-relaxed">
            {/* 1 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                1. מהי מדיניות הפרטיות הזו
              </h2>
              <p>
                מדיניות פרטיות זו מסבירה כיצד <span className="text-white/70 font-semibold">[שם העסק המלא] [PLACEHOLDER]</span> (להלן: &ldquo;החברה&rdquo;, &ldquo;אנחנו&rdquo;) אוספת, משתמשת, מאחסנת ומגנה על מידע אישי של משתמשי אתר זה. מדיניות זו חלה על כל השירותים שאנו מציעים דרך אתר <span lang="en">FIGHTERS BUILDERS</span>.
              </p>
              <p className="mt-3">
                ח.פ / ע.מ: <span className="text-white/70 font-semibold">[ח.פ / ע.מ] [PLACEHOLDER]</span>
                <br />
                כתובת: <span className="text-white/70 font-semibold">[כתובת] [PLACEHOLDER]</span>
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                2. איזה מידע אנו אוספים
              </h2>
              <p className="mb-3">אנו אוספים את סוגי המידע הבאים:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">פרטי זיהוי:</strong> שם מלא, כתובת אימייל, מספר טלפון, שם עסק.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">תוכן הודעות:</strong> הודעות שנשלחות דרך טופס יצירת הקשר.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה, דפי הפניה.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">עוגיות:</strong> עוגיות חיוניות, ניתוח ופונקציונליות (ראו <Link href="/cookies" className="text-blue-400 hover:underline">מדיניות עוגיות</Link>).</span>
                </li>
              </ul>
            </section>

            {/* 3 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                3. מטרות העיבוד
              </h2>
              <p className="mb-3">אנו משתמשים במידע שאנו אוספים למטרות הבאות:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>מענה לפניות ובקשות מידע.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>הכנת הצעות מחיר ומשלוח חומרים מקצועיים.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>ניתוח סטטיסטי ושיפור חוויית המשתמש באתר.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>שליחת עדכונים שיווקיים (רק עם הסכמה מפורשת).</span>
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                4. בסיס חוקי לעיבוד
              </h2>
              <p>
                עיבוד המידע מתבסס על אחד או יותר מהבסיסים הבאים: הסכמה מפורשת של המשתמש, אינטרס לגיטימי של החברה (כגון מענה לפניות עסקיות), ביצוע חוזה או צורך לעמוד בדרישות חוקיות.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                5. שמירת מידע
              </h2>
              <p>
                מידע אישי נשמר לתקופה של עד 12 חודשים ממועד השמירה, או עד שהמשתמש מבקש את מחיקתו — המוקדם מביניהם. לאחר מכן, המידע נמחק באופן בטוח ממערכותינו. מידע מצטבר (לא מזוהה) עשוי להישמר לצורך ניתוח סטטיסטי.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                6. אבטחת מידע
              </h2>
              <p>
                אנו נוקטים באמצעי אבטחה סבירים ומקובלים להגנה על המידע האישי שנאסף, לרבות: הצפנת תקשורת (SSL/TLS), הגבלת גישה לבסיסי נתונים, ניטור חדירות, ומנגנוני אימות. עם זאת, אין שיטת העברה באינטרנט או שיטת אחסון אלקטרוני בטוחה ב-100%.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                7. שיתוף עם צדדים שלישיים
              </h2>
              <p className="mb-3">
                אנו <strong className="text-white/70">לא מוכרים</strong> מידע אישי לצדדים שלישיים. ייתכן שנשתף מידע עם ספקי שירות הכרחיים לתפעול האתר:
              </p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70" lang="en">Vercel</strong> — אירוח אתר ושרתי אפליקציה.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70" lang="en">Supabase</strong> — בסיס נתונים ואחסון מאובטח.</span>
                </li>
              </ul>
              <p className="mt-3">
                ספקים אלו מחויבים לשמור על סודיות המידע ולהשתמש בו אך ורק לצורך מתן השירותים.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                8. עוגיות
              </h2>
              <p>
                אתר זה משתמש בעוגיות חיוניות, ניתוחיות ופונקציונליות. לפרטים מלאים, ראו את{" "}
                <Link href="/cookies" className="text-blue-400 hover:underline">
                  מדיניות העוגיות
                </Link>{" "}
                שלנו.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                9. זכויות המשתמש
              </h2>
              <p className="mb-3">בהתאם לחוק הגנת הפרטיות, 5741-1981, ותקנות הגנת הפרטיות, עומדות לך הזכויות הבאות:</p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">זכות עיון:</strong> לעיין במידע שנאסף אודותיך.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">זכות תיקון:</strong> לבקש תיקון מידע שגוי או לא מדויק.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">זכות מחיקה:</strong> לבקש מחיקת המידע האישי שלך ממערכותינו.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70">זכות התנגדות:</strong> להתנגד לעיבוד מידע לצורכי שיווק ישיר.</span>
                </li>
              </ul>
              <p className="mt-3">
                למימוש זכויותיך, ניתן לפנות אלינו באמצעות פרטי הקשר שבסוף מסמך זה.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                10. יצירת קשר בנושאי פרטיות
              </h2>
              <p>
                לכל שאלה או בקשה הנוגעת לפרטיות, ניתן לפנות אל:
              </p>
              <div className="mt-3 surface-card rounded-xl p-4 space-y-1">
                <p><strong className="text-white/70">ממונה פרטיות:</strong> <span className="text-white/70 font-semibold">[שם ממונה פרטיות] [PLACEHOLDER]</span></p>
                <p><strong className="text-white/70">אימייל:</strong> <span className="text-white/70 font-semibold">[אימייל פרטיות: privacy@...] [PLACEHOLDER]</span></p>
                <p><strong className="text-white/70">כתובת:</strong> <span className="text-white/70 font-semibold">[כתובת] [PLACEHOLDER]</span></p>
              </div>
            </section>

            {/* 11 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                11. שינויים במדיניות
              </h2>
              <p>
                אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים יפורסמו באתר עם תאריך העדכון המתאים. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה למדיניות המעודכנת.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                12. הדין החל
              </h2>
              <p>
                מדיניות פרטיות זו כפופה לדיני מדינת ישראל. כל מחלוקת הנובעת ממנה תידון בבתי המשפט המוסמכים בישראל בלבד.
              </p>
            </section>

            {/* Links */}
            <div className="border-t border-white/[0.06] pt-6 flex flex-wrap gap-4 text-xs">
              <Link href="/" className="text-blue-400 hover:underline">
                חזרה לדף הבית
              </Link>
              <Link href="/contact" className="text-blue-400 hover:underline">
                צור קשר
              </Link>
              <Link href="/terms-of-use" className="text-blue-400 hover:underline">
                תנאי שימוש
              </Link>
              <Link href="/cookies" className="text-blue-400 hover:underline">
                מדיניות עוגיות
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
