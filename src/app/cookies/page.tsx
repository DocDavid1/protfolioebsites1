import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "מדיניות עוגיות",
  description:
    "מדיניות העוגיות של FIGHTERS BUILDERS — כיצד אנו משתמשים בעוגיות באתר.",
};

const LAST_UPDATED = "מרץ 2026";

const COOKIE_TYPES = [
  {
    name: "עוגיות חיוניות",
    description:
      "עוגיות אלו נחוצות לתפקוד התקין של האתר. הן מאפשרות ניווט בסיסי, שמירת העדפות אבטחה וזיהוי הפעלת משתמש (session). ללא עוגיות אלו, חלקים מהאתר לא יפעלו כראוי.",
    examples: "זיהוי הפעלה, העדפות נגישות, הסכמה לעוגיות",
    required: true,
  },
  {
    name: "עוגיות ניתוח (אנליטיקס)",
    description:
      "עוגיות אלו מסייעות לנו להבין כיצד מבקרים משתמשים באתר — אילו עמודים מבוקרים, כמה זמן שוהים ואילו שגיאות נתקלות. המידע הוא מצטבר ואנונימי.",
    examples: "Google Analytics (אם מותקן), ניתוח ביצועי עמודים",
    required: false,
  },
  {
    name: "עוגיות פונקציונליות",
    description:
      "עוגיות אלו מאפשרות לאתר לזכור בחירות שביצעת (כגון העדפות נגישות, שפה) ולספק חוויה מותאמת אישית.",
    examples: "העדפות נגישות, העדפת שפה",
    required: false,
  },
];

export default function CookiesPage() {
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
              <span className="gradient-text-blue">מדיניות עוגיות</span>
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
                1. מהן עוגיות
              </h2>
              <p>
                עוגיות (Cookies) הן קבצי טקסט קטנים שמאוחסנים במכשירך (מחשב, טלפון נייד, טאבלט) בעת גלישה באתר. עוגיות מאפשרות לאתר לזכור העדפות, לשפר את חוויית הגלישה ולאסוף מידע סטטיסטי על השימוש באתר.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                2. אילו עוגיות אנו משתמשים
              </h2>
              <div className="space-y-5">
                {COOKIE_TYPES.map((type) => (
                  <div key={type.name} className="surface-card rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-white/80">
                        {type.name}
                      </h3>
                      {type.required && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">
                          חיוניות
                        </span>
                      )}
                    </div>
                    <p className="mb-2">{type.description}</p>
                    <p className="text-xs text-white/35">
                      <strong className="text-white/45">דוגמאות:</strong> {type.examples}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                3. עוגיות צד שלישי
              </h2>
              <p>
                ייתכן שבאתר פועלות עוגיות של צדדים שלישיים (כגון שירותי ניתוח סטטיסטי). עוגיות אלו כפופות למדיניות הפרטיות של אותם צדדים שלישיים ואינן בשליטתנו הישירה. אנו ממליצים לעיין במדיניות הפרטיות של אותם שירותים.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                4. ניהול עוגיות
              </h2>
              <p className="mb-3">
                ניתן לנהל ולמחוק עוגיות דרך הגדרות הדפדפן שלך. שים לב: חסימת עוגיות חיוניות עלולה לפגוע בתפקוד האתר. להלן הנחיות למניעת עוגיות בדפדפנים הנפוצים:
              </p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70" lang="en">Chrome:</strong> הגדרות &rarr; פרטיות ואבטחה &rarr; עוגיות</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70" lang="en">Firefox:</strong> הגדרות &rarr; פרטיות ואבטחה &rarr; עוגיות ונתוני אתרים</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70" lang="en">Safari:</strong> העדפות &rarr; פרטיות &rarr; ניהול נתוני אתרים</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span><strong className="text-white/70" lang="en">Edge:</strong> הגדרות &rarr; עוגיות והרשאות אתרים</span>
                </li>
              </ul>
            </section>

            {/* 5 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                5. הסכמה ועדכונים
              </h2>
              <p>
                בעת כניסתך לאתר לראשונה, תוצג לך הודעת עוגיות המאפשרת לך לקבל או לסרב לעוגיות לא-חיוניות. ניתן לשנות את בחירתך בכל עת דרך הגדרות הדפדפן. אנו עשויים לעדכן מדיניות זו מעת לעת, ותאריך העדכון יופיע בראש הדף.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                6. יצירת קשר
              </h2>
              <p>
                לכל שאלה או בקשה בנושא עוגיות, ניתן לפנות אלינו באמצעות{" "}
                <Link href="/contact" className="text-blue-400 hover:underline">
                  עמוד יצירת הקשר
                </Link>{" "}
                או באימייל: <span lang="en">hello@fightersbuilders.com</span>.
              </p>
            </section>

            {/* Links */}
            <div className="border-t border-white/[0.06] pt-6 flex flex-wrap gap-4 text-xs">
              <Link href="/" className="text-blue-400 hover:underline">
                חזרה לדף הבית
              </Link>
              <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                מדיניות פרטיות
              </Link>
              <Link href="/terms-of-use" className="text-blue-400 hover:underline">
                תנאי שימוש
              </Link>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
