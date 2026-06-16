import type { ComponentType } from "react";
import {
  Search,
  Target,
  PenTool,
  Code,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { ProcessConnectors } from "@/components/ui/process-connectors";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  color: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "תדריך מבצעי",
    description:
      "נפגשים, מבינים את העסק שלך לעומק, מגדירים מטרות ובונים תוכנית פעולה ברורה — כמו תדריך לפני משימה.",
    icon: Search,
    color: "#3b82f6",
  },
  {
    number: "02",
    title: "אסטרטגיה ומיקוד",
    description:
      "מנתחים את השוק, המתחרים וקהל היעד. בונים אסטרטגיה דיגיטלית מותאמת שמתמקדת בתוצאות, לא בנראות.",
    icon: Target,
    color: "#8b5cf6",
  },
  {
    number: "03",
    title: "עיצוב וחוויה",
    description:
      "מעצבים חוויית משתמש שממירה. כל אלמנט מונח בדיוק כדי להוביל את המבקר לפעולה.",
    icon: PenTool,
    color: "#f59e0b",
  },
  {
    number: "04",
    title: "פיתוח ובנייה",
    description:
      "בונים עם טכנולוגיות מתקדמות, ביצועים גבוהים ואבטחה ברמה הגבוהה ביותר. כל שורת קוד נבדקת.",
    icon: Code,
    color: "#10b981",
  },
  {
    number: "05",
    title: "השקה ופריסה",
    description:
      "מעלים לאוויר, בודקים את הכל, מוודאים שהמערכת עובדת בצורה מושלמת. אפס תקלות ביום ההשקה.",
    icon: Rocket,
    color: "#f43f5e",
  },
  {
    number: "06",
    title: "צמיחה ואופטימיזציה",
    description:
      "לא עוצרים אחרי ההשקה. עוקבים אחרי הנתונים, משפרים המרות ודוחפים את הביצועים קדימה — כל הזמן.",
    icon: TrendingUp,
    color: "#22d3ee",
  },
];

export function ProcessSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="process"
      aria-label="תהליך העבודה"
    >
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6">
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400 mb-4 block">
            איך אנחנו עובדים
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            מהתדריך{" "}
            <span className="gradient-text-violet">לשדה הקרב</span>
          </h2>
          <p className="text-gray-400 dark:text-white/40 max-w-lg mx-auto">
            תהליך מוכח ושיטתי שמביא תוצאות. כל צעד מתוכנן בדיוק צבאי.
          </p>
        </AnimateIn>

        <div className="relative">
          {/* Connecting lines between cards — client component */}
          <ProcessConnectors stepCount={STEPS.length} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimateIn key={step.number} delay={i * 80} from="bottom">
                  <div
                    className="step-card group relative rounded-2xl p-7 card-service h-full"
                    data-step={i}
                  >
                    {/* Step number */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${step.color}12`,
                          border: `1px solid ${step.color}25`,
                          color: step.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="step-number">{step.number}</span>
                    </div>

                    {/* Content */}
                    <h3
                      className="text-lg font-bold text-gray-900 dark:text-white/90 mb-3"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: step.color }}
                    />

                    {/* Step indicator dot for connector */}
                    <div
                      className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 opacity-0 lg:opacity-100 z-10"
                      style={{
                        borderColor: step.color,
                        background: "#0d0d18",
                        boxShadow: `0 0 8px ${step.color}40`,
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
