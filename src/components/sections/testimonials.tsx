import { Star, Quote } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const TESTIMONIALS = [
  {
    name: "יוסי כהן",
    role: 'מנכ"ל, Premium Realty Group',
    text: "הם לקחו לנו את כל התהליך הידני של ניהול לידים והפכו אותו לאוטומטי. היום אנחנו מקבלים פי 3 פניות ומגיבים תוך דקות במקום שעות. ההשקעה החזירה את עצמה תוך חודש.",
    metric: "פי 3 לידים",
    metricDetail: "תגובה ב-3 דקות",
    stars: 5,
    accent: "#3b82f6",
  },
  {
    name: "מיכל לוי",
    role: "בעלת, Bloom Cosmetics",
    text: "לא האמנתי שאפשר לבנות אתר ברמה כזו במחיר שהם הציעו. השירות שלהם ברמה של סוכנויות שגובות פי 10. המקצועיות, המחויבות ומהירות התגובה — פשוט מדהימים.",
    metric: "+420% המרות",
    metricDetail: "תוך 60 יום",
    stars: 5,
    accent: "#f59e0b",
  },
  {
    name: "דוד אברהם",
    role: "בעלים, Drive Elite Motors",
    text: "כסוכנות רכב, הרבה לידים נפלו בין הכיסאות. פייטרס בילדרס בנו לנו מערכת CRM עם וואטסאפ אוטומטי שעוקב אחרי כל ליד עד לסגירה. המכירות עלו ב-55%.",
    metric: "+55% מכירות",
    metricDetail: "ROI תוך 45 יום",
    stars: 5,
    accent: "#10b981",
  },
  {
    name: "ד״ר שרה גולד",
    role: "מנהלת, Tel Aviv Medical Group",
    text: "מערכת ניהול התורים שבנו לנו חסכה שעות של עבודה ביום. אי-ההגעות ירדו ב-60% בזכות התזכורות האוטומטיות. הצוות שלי סוף סוף יכול להתרכז במטופלים.",
    metric: "-60% אי-הגעות",
    metricDetail: "יעילות +45%",
    stars: 5,
    accent: "#a78bfa",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="testimonials"
      aria-label="מה הלקוחות אומרים"
    >
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(245,158,11,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-4 block">
            לקוחות מספרים
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הם סמכו עלינו.{" "}
            <span className="gradient-text-amber">הם צמחו.</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            כל לקוח מגיע עם אתגר שונה. אנחנו מגיעים עם אותה מחויבות — לתוצאות.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <AnimateIn key={t.name} delay={i * 100} from="bottom">
              <div className="card-testimonial rounded-2xl p-7 md:p-8 h-full flex flex-col">
                {/* Quote icon + Stars */}
                <div className="flex items-center justify-between mb-5">
                  <Quote
                    className="w-8 h-8"
                    style={{ color: `${t.accent}50` }}
                  />
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star
                        key={si}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <p className="text-sm md:text-base text-white/70 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Metric badge */}
                <div
                  className="flex items-center gap-3 p-3 rounded-xl mb-5"
                  style={{
                    background: `${t.accent}08`,
                    border: `1px solid ${t.accent}18`,
                  }}
                >
                  <span
                    className="text-xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: t.accent,
                    }}
                  >
                    {t.metric}
                  </span>
                  <span className="text-xs text-white/35">{t.metricDetail}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: `${t.accent}15`,
                      color: t.accent,
                      border: `1px solid ${t.accent}25`,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/80">{t.name}</p>
                    <p className="text-xs text-white/35">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
