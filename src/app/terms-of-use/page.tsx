// ⚠️ LEGAL REVIEW REQUIRED: These terms of use contain template content.
// They must be reviewed and approved by a licensed Israeli attorney before production launch.
// Relevant laws: Consumer Protection Law, Copyright Act, Electronic Commerce Law

import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description:
    "תנאי השימוש של אתר FIGHTERS BUILDERS — הכללים והתנאים לשימוש באתר ובשירותים שלנו.",
};

const LAST_UPDATED = "מרץ 2026";

export default function TermsOfUsePage() {
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
              <span className="gradient-text-blue">תנאי שימוש</span>
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
                1. קבלת התנאים
              </h2>
              <p>
                ברוכים הבאים לאתר של <span className="text-white/70 font-semibold">[שם העסק המלא] [PLACEHOLDER]</span> (להלן: &ldquo;החברה&rdquo;). גלישה באתר או שימוש בשירותים המוצעים דרכו מהווים הסכמה לתנאי שימוש אלו. אם אינך מסכים לתנאים, נא הימנע משימוש באתר.
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
                2. תיאור השירותים
              </h2>
              <p>
                <span lang="en">FIGHTERS BUILDERS</span> היא סוכנות דיגיטלית המספקת שירותי פיתוח אתרים, אוטומציית וואטסאפ, אינטגרציית CRM, מערכות מעקב לידים ופתרונות נוכחות דיגיטלית. האתר משמש להצגת השירותים, עבודות קודמות ויצירת קשר ראשוני.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                3. שימוש מורשה ואסור
              </h2>
              <p className="mb-3">
                הנך רשאי לגלוש באתר לצרכים חוקיים בלבד. השימושים הבאים <strong className="text-white/70">אסורים</strong>:
              </p>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>העתקה, שכפול או הפצה של תכני האתר ללא אישור מראש.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>שימוש בבוטים, סורקים או כלים אוטומטיים לאיסוף מידע מהאתר.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>ניסיון לפרוץ, לשבש או לפגוע בתפקוד האתר או שרתיו.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>שליחת תוכן פוגעני, מטעה או בלתי חוקי דרך טפסי האתר.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                  <span>התחזות לאדם אחר או ייצוג מטעה של זהותך.</span>
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                4. קניין רוחני
              </h2>
              <p>
                כל התכנים באתר — כולל טקסטים, עיצובים, לוגואים, תמונות, קוד מקור וסימני מסחר — הם רכושה של החברה או מורשים לשימושה. אין להעתיק, לשכפל, להפיץ או לעשות שימוש מסחרי בתכנים אלו ללא אישור בכתב מראש. השם &ldquo;FIGHTERS BUILDERS&rdquo; וכל הסימנים הקשורים הם סימני מסחר של החברה.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                5. הגבלת אחריות
              </h2>
              <p>
                האתר והתכנים בו מסופקים &ldquo;כמות שהם&rdquo; (AS IS). החברה אינה מתחייבת שהאתר יפעל ללא הפרעות או שגיאות, או שהתכנים יהיו מדויקים ומעודכנים בכל עת. החברה לא תישא באחריות לכל נזק ישיר, עקיף, מיוחד או תוצאתי הנובע משימוש באתר, כולל אובדן רווחים, נתונים או הפסקת פעילות עסקית.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                6. שיפוי
              </h2>
              <p>
                הנך מתחייב לשפות את החברה, מנהליה ועובדיה מפני כל תביעה, נזק, הפסד או הוצאה (לרבות שכר טרחת עורכי דין) הנובעים משימוש שלך באתר או מהפרת תנאי שימוש אלו.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                7. קישורים חיצוניים
              </h2>
              <p>
                האתר עשוי לכלול קישורים לאתרים חיצוניים. אתרים אלו אינם בשליטתנו ואיננו אחראים לתכנים, למדיניות הפרטיות שלהם או לזמינותם. הקישורים מסופקים לנוחותך בלבד ואינם מהווים המלצה או אישור מצד החברה.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                8. שינויים בתנאים
              </h2>
              <p>
                החברה רשאית לעדכן תנאי שימוש אלו בכל עת. שינויים ייכנסו לתוקף עם פרסומם באתר. על המשתמש לבדוק עמוד זה מעת לעת. המשך השימוש באתר לאחר עדכון התנאים מהווה הסכמה לתנאים המעודכנים.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                9. ביטול וסיום
              </h2>
              <p>
                החברה שומרת לעצמה את הזכות לחסום או להגביל גישה לאתר, באופן זמני או קבוע, לכל משתמש שמפר את תנאי השימוש או פועל באופן שעלול לפגוע בחברה, בלקוחותיה או במשתמשים אחרים.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                10. הדין החל ויישוב סכסוכים
              </h2>
              <p>
                תנאי שימוש אלו כפופים לדיני מדינת ישראל. סמכות השיפוט הייחודית לכל מחלוקת הנובעת מתנאים אלו או מהשימוש באתר נתונה לבתי המשפט המוסמכים בישראל בלבד.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2
                className="text-xl font-bold text-white/85 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                11. פרטי התקשרות
              </h2>
              <p>לכל שאלה בנוגע לתנאי שימוש אלו, ניתן לפנות אלינו:</p>
              <div className="mt-3 surface-card rounded-xl p-4 space-y-1">
                <p><strong className="text-white/70">חברה:</strong> <span className="text-white/70 font-semibold">[שם העסק המלא] [PLACEHOLDER]</span></p>
                <p><strong className="text-white/70">אימייל:</strong> <span lang="en">hello@fightersbuilders.com</span></p>
                <p><strong className="text-white/70">כתובת:</strong> <span className="text-white/70 font-semibold">[כתובת] [PLACEHOLDER]</span></p>
              </div>
            </section>

            {/* Links */}
            <div className="border-t border-white/[0.06] pt-6 flex flex-wrap gap-4 text-xs">
              <Link href="/" className="text-blue-400 hover:underline">
                חזרה לדף הבית
              </Link>
              <Link href="/contact" className="text-blue-400 hover:underline">
                צור קשר
              </Link>
              <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                מדיניות פרטיות
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
