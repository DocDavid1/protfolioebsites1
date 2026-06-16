import { Check, MessageCircle, Sparkles } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { whatsappUrl } from "@/lib/config";

const PLANS = [
  {
    name: "סטארטר",
    price: "₪2,500",
    period: "חד פעמי",
    description: "דף נחיתה או אתר תדמית בסיסי לעסק שרוצה להתחיל.",
    features: [
      "עד 5 עמודים",
      "עיצוב מותאם למובייל",
      "SEO בסיסי",
      "טופס יצירת קשר",
      "SSL מאובטח",
      "העלאה לאוויר",
    ],
    cta: "התחל עכשיו",
    whatsappMessage: "שלום! אני מתעניין בחבילת הסטארטר.",
    color: "#3b82f6",
    popular: false,
  },
  {
    name: "עסקי",
    price: "₪5,500",
    period: "חד פעמי",
    description: "אתר מקצועי מלא עם מערכת ניהול תוכן ואופטימיזציה.",
    features: [
      "עד 12 עמודים",
      "עיצוב פרמיום מותאם אישית",
      "SEO מתקדם",
      "מערכת ניהול תוכן",
      "אינטגרציית וואטסאפ",
      "אנליטיקס מלא",
      "תמיכה לחודש חינם",
      "מהירות טעינה אופטימלית",
    ],
    cta: "הכי פופולרי",
    whatsappMessage: "שלום! אני מתעניין בחבילה העסקית.",
    color: "#f59e0b",
    popular: true,
  },
  {
    name: "פרמיום",
    price: "מותאם",
    period: "לפי פרויקט",
    description: "מערכת מלאה — אתר + CRM + אוטומציות + וואטסאפ.",
    features: [
      "עמודים ללא הגבלה",
      "עיצוב בהתאמה מלאה",
      "מערכת CRM מובנית",
      "אוטומציית וואטסאפ",
      "משפך שיווקי מלא",
      "דוחות ואנליטיקס",
      "3 חודשי תמיכה חינם",
      "הדרכה אישית",
    ],
    cta: "דבר איתנו",
    whatsappMessage: "שלום! אני מתעניין בחבילת הפרמיום.",
    color: "#a78bfa",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="pricing"
      aria-label="מחירים"
    >
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(245,158,11,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-4 block">
            מחירים שקופים
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white/90 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            חבילות{" "}
            <span className="gradient-text-amber">לכל עסק</span>
          </h2>
          <p className="text-gray-400 dark:text-white/40 max-w-2xl mx-auto text-lg">
            מחירים נגישים בלי הפתעות. בחר את החבילה שמתאימה לך, או דבר איתנו על פתרון מותאם.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => (
            <AnimateIn key={plan.name} delay={i * 100} from="bottom">
              <div
                className={`relative rounded-2xl p-7 h-full flex flex-col ${
                  plan.popular
                    ? "card-portfolio border-2"
                    : "glass-light"
                }`}
                style={
                  plan.popular
                    ? { borderColor: `${plan.color}40` }
                    : undefined
                }
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                      boxShadow: `0 4px 15px ${plan.color}40`,
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    הכי פופולרי
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className="text-lg font-bold text-gray-900 dark:text-white/90 mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: plan.color,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-white/30">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-white/45 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-white/60">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(plan.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all ${
                    plan.popular
                      ? "btn-whatsapp text-white"
                      : "btn-outline text-gray-700 dark:text-white/70"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  {plan.cta}
                </a>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={300} className="text-center mt-10">
          <p className="text-xs text-gray-400 dark:text-white/30">
            כל המחירים כוללים מע&quot;מ. תשלום בעד 3 תשלומים ללא ריבית.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
