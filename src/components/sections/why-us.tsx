import { Check, X } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const COMPARISON = [
  { feature: "זמן מענה", us: "תוך דקות", them: "1-3 ימי עסקים" },
  { feature: "גישה ישירה למפתחים", us: "וואטסאפ ישיר למייסדים", them: "דרך מנהל לקוח" },
  { feature: "מחיר", us: "שקוף ונגיש", them: "הצעות מנופחות" },
  { feature: "בעלות על הקוד", us: "100% שלך", them: "נעילה לספק" },
  { feature: "תמיכה לאחר השקה", us: "כלולה", them: "תשלום נוסף" },
  { feature: "טכנולוגיה", us: "הכי עדכנית", them: "תבניות גנריות" },
];

export function WhyUsSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="why-us"
      aria-label="למה אנחנו"
    >
      <div className="divider-brand absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none section-gradient-mixed"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-4 block">
            ההבדל
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white/90 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            אנחנו מול{" "}
            <span className="gradient-text-rose">הסוכנות הטיפוסית</span>
          </h2>
          <p className="text-gray-400 dark:text-white/40 max-w-2xl mx-auto text-lg">
            לא כל סוכנויות נולדו שוות. הנה למה לקוחות בוחרים בנו.
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="max-w-3xl mx-auto">
            {/* Header row */}
            <div className="grid grid-cols-3 gap-4 mb-2 px-4">
              <div />
              <div className="text-center">
                <span
                  className="text-xs font-bold uppercase tracking-widest gradient-text-blue"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  פייטרס בילדרס
                </span>
              </div>
              <div className="text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/25">
                  סוכנות רגילה
                </span>
              </div>
            </div>

            {/* Comparison rows */}
            <div className="space-y-2">
              {COMPARISON.map((item, i) => (
                <AnimateIn key={item.feature} delay={i * 60} from="bottom">
                  <div className="grid grid-cols-3 gap-4 items-center p-4 rounded-xl glass-light hover-lift">
                    <span className="text-sm font-semibold text-gray-700 dark:text-white/70">
                      {item.feature}
                    </span>
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-xs text-emerald-400 font-medium text-center">
                        {item.us}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <X className="w-3.5 h-3.5 text-red-400/50 shrink-0" />
                      <span className="text-xs text-gray-400 dark:text-white/30 text-center">
                        {item.them}
                      </span>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
