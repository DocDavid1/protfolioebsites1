import { AnimateIn } from "@/components/ui/animate-in";
import { Counter } from "@/components/ui/counter";

const STATS = [
  {
    value: 30,
    suffix: "+",
    label: "פרויקטים שהושלמו",
    description: "אתרים, מערכות ואוטומציות",
    color: "#3b82f6",
  },
  {
    value: 500,
    suffix: "+",
    label: "שיחות אוטומטיות ביום",
    description: "דרך מערכות הוואטסאפ שלנו",
    color: "#22c55e",
  },
  {
    value: 300,
    suffix: "%",
    label: "גידול ממוצע בלידים",
    description: "תוך 90 הימים הראשונים",
    color: "#f59e0b",
  },
  {
    value: 3,
    suffix: "x",
    label: "ROI ממוצע",
    description: "על כל שקל שהושקע",
    color: "#a78bfa",
  },
];

export function StatsCounter() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" aria-label="המספרים שלנו">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <AnimateIn className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-4 block">
            תוצאות מוכחות
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            המספרים{" "}
            <span className="gradient-text-brand">מדברים</span>
          </h2>
          <p className="text-white/40 max-w-lg mx-auto">
            לא מבטיחים — מוכיחים. הנה מה שהלקוחות שלנו חוו.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 100} from="bottom">
              <div
                className="card-stat rounded-2xl p-6 md:p-8 text-center group"
                style={{ "--stat-color": stat.color } as React.CSSProperties}
              >
                <div
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: stat.color,
                    textShadow: `0 0 30px ${stat.color}30`,
                  }}
                >
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm md:text-base font-bold text-white/80 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-white/35">
                  {stat.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
