import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";
import { BUSINESS } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | Fighters Builders",
  description:
    "מדיניות הפרטיות של Fighters Builders — כיצד אנו אוספים, משתמשים ומגנים על המידע שלך.",
};

const LAST_UPDATED = "יוני 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
        <AnimateIn>
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
            <p className="text-xs text-white/35">עדכון אחרון: {LAST_UPDATED}</p>
          </div>

          <div className="space-y-10 text-sm text-white/55 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                1. מהי מדיניות הפרטיות הזו
              </h2>
              <p>
                מדיניות פרטיות זו מסבירה כיצד{" "}
                <span className="text-white/75 font-semibold">{BUSINESS.name}</span> (להלן:
                &ldquo;החברה&rdquo;, &ldquo;אנחנו&rdquo;) אוספת, משתמשת, מאחסנת ומגנה על מידע
                אישי של משתמשי אתר זה. מדיניות זו חלה על כל השירותים שאנו מציעים דרך אתר{" "}
                <span lang="en">Fighters Builders</span>.
              </p>
              {BUSINESS.registration && (
                <p className="mt-3">
                  ח.פ / ע.מ:{" "}
                  <span className="text-white/70 font-semibold">{BUSINESS.registration}</span>
                  <br />
                  כתובת:{" "}
                  <span className="text-white/70 font-semibold">{BUSINESS.address}</span>
                </p>
              )}
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                2. איזה מידע אנו אוספים
              </h2>
              <p className="mb-3">אנו אוספים את סוגי המידע הבאים:</p>
              <ul className="space-y-2 list-none">
                {[
                  ["פרטי זיהוי", "שם מלא, כתובת אימייל, מספר טלפון, שם עסק."],
                  ["תוכן הודעות", "הודעות שנשלחות דרך טופס יצירת הקשר."],
                  ["מידע טכני", "כתובת IP, סוג דפדפן, מערכת הפעלה, דפי הפניה."],
                  ["עוגיות", "עוגיות חיוניות ופונקציונליות — ראו מדיניות עוגיות."],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <span>
                      <strong className="text-white/70">{title}:</strong> {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                3. מטרות העיבוד
              </h2>
              <ul className="space-y-2 list-none">
                {[
                  "מענה לפניות ובקשות מידע.",
                  "הכנת הצעות מחיר ומשלוח חומרים מקצועיים.",
                  "ניתוח סטטיסטי ושיפור חוויית המשתמש באתר.",
                  "שליחת עדכונים שיווקיים (רק עם הסכמה מפורשת).",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                4. בסיס חוקי לעיבוד
              </h2>
              <p>
                עיבוד המידע מתבסס על אחד או יותר מהבסיסים הבאים: הסכמה מפורשת של המשתמש,
                אינטרס לגיטימי של החברה (מענה לפניות עסקיות), ביצוע חוזה, או עמידה בדרישות
                חוקיות.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                5. שמירת מידע
              </h2>
              <p>
                מידע אישי נשמר לתקופה של עד 12 חודשים ממועד השמירה, או עד שהמשתמש מבקש את
                מחיקתו — המוקדם מביניהם. לאחר מכן, המידע נמחק באופן בטוח ממערכותינו.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                6. אבטחת מידע
              </h2>
              <p>
                אנו נוקטים באמצעי אבטחה סבירים להגנה על המידע האישי שנאסף, לרבות: הצפנת
                תקשורת (SSL/TLS), הגבלת גישה לבסיסי נתונים, ניטור חדירות ומנגנוני אימות. אין
                שיטת העברה באינטרנט בטוחה ב-100%.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                7. שיתוף עם צדדים שלישיים
              </h2>
              <p className="mb-3">
                אנו <strong className="text-white/70">לא מוכרים</strong> מידע אישי לצדדים
                שלישיים. ייתכן שנשתף מידע עם ספקי שירות הנחוצים לתפעול האתר:
              </p>
              <ul className="space-y-2 list-none">
                {[
                  ["Vercel", "אירוח אתר ושרתי אפליקציה."],
                  ["Supabase", "בסיס נתונים ואחסון מאובטח."],
                ].map(([name, desc]) => (
                  <li key={name} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <span>
                      <strong className="text-white/70" lang="en">{name}</strong> — {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                8. עוגיות
              </h2>
              <p>
                אתר זה משתמש בעוגיות חיוניות ופונקציונליות בלבד. איננו משתמשים ב-Google
                Analytics או ב-Facebook Pixel. לפרטים מלאים ראו את{" "}
                <Link href="/cookies" className="text-blue-400 hover:underline">
                  מדיניות העוגיות
                </Link>{" "}
                שלנו.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                9. זכויות המשתמש
              </h2>
              <p className="mb-3">
                בהתאם לחוק הגנת הפרטיות, 5741-1981, עומדות לך הזכויות הבאות:
              </p>
              <ul className="space-y-2 list-none">
                {[
                  ["זכות עיון", "לעיין במידע שנאסף אודותיך."],
                  ["זכות תיקון", "לבקש תיקון מידע שגוי."],
                  ["זכות מחיקה", "לבקש מחיקת המידע האישי שלך."],
                  ["זכות התנגדות", "להתנגד לעיבוד מידע לצורכי שיווק ישיר."],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                    <span>
                      <strong className="text-white/70">{title}:</strong> {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                10. יצירת קשר בנושאי פרטיות
              </h2>
              <p>לכל שאלה או בקשה הנוגעת לפרטיות, ניתן לפנות אל:</p>
              <div className="mt-3 surface-card rounded-xl p-4 space-y-1">
                <p>
                  <strong className="text-white/70">ממונה פרטיות:</strong>{" "}
                  <span className="text-white/60">{BUSINESS.privacyOfficer}</span>
                </p>
                <p>
                  <strong className="text-white/70">אימייל:</strong>{" "}
                  <a
                    href={`mailto:${BUSINESS.privacyEmail}`}
                    className="text-blue-400 hover:underline"
                  >
                    {BUSINESS.privacyEmail}
                  </a>
                </p>
                {BUSINESS.address && (
                  <p>
                    <strong className="text-white/70">כתובת:</strong>{" "}
                    <span className="text-white/60">{BUSINESS.address}</span>
                  </p>
                )}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                11. שינויים במדיניות
              </h2>
              <p>
                אנו שומרים לעצמנו את הזכות לעדכן מדיניות פרטיות זו מעת לעת. שינויים מהותיים
                יפורסמו באתר עם תאריך העדכון המתאים.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white/85 mb-4" style={{ fontFamily: "var(--font-display)" }}>
                12. הדין החל
              </h2>
              <p>
                מדיניות פרטיות זו כפופה לדיני מדינת ישראל. כל מחלוקת הנובעת ממנה תידון בבתי
                המשפט המוסמכים בישראל בלבד.
              </p>
            </section>

            <div className="border-t border-white/[0.06] pt-6 flex flex-wrap gap-4 text-xs">
              <Link href="/" className="text-blue-400 hover:underline">חזרה לדף הבית</Link>
              <Link href="/contact" className="text-blue-400 hover:underline">צור קשר</Link>
              <Link href="/terms-of-use" className="text-blue-400 hover:underline">תנאי שימוש</Link>
              <Link href="/cookies" className="text-blue-400 hover:underline">מדיניות עוגיות</Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
