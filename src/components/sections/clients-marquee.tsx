import { AnimateIn } from "@/components/ui/animate-in";

const ACCENT_BG = ["#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#f43f5e", "#22d3ee"] as const;
const ACCENT_FG = ["#60a5fa", "#fbbf24", "#34d399", "#a78bfa", "#fb7185", "#67e8f9"] as const;

const CLIENTS = [
  "Premium Realty Group",
  "Grill Masters",
  "Scale Commerce",
  "Tel Aviv Medical",
  "Urban Thread Co.",
  "Apex Industrial",
  "Cohen & Partners",
  "Drive Elite Motors",
  "Luxury Homes IL",
  "TechFlow Startup",
  "Bloom Cosmetics",
  "Iron Fitness",
];

export function ClientsMarquee() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-16 relative overflow-hidden" aria-label="הלקוחות שלנו">
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <AnimateIn className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-white/30">
          עסקים שסמכו עלינו
        </span>
      </AnimateIn>

      <div className="marquee-wrapper relative" dir="ltr">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <div className="marquee-track flex items-center gap-16" style={{ width: "max-content" }}>
          {doubled.map((client, i) => (
            <div
              key={`${client}-${i}`}
              className="flex items-center gap-3 px-6 py-3 rounded-xl glass-light shrink-0"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_BG[i % ACCENT_BG.length]!}20, transparent)`,
                  color: ACCENT_FG[i % ACCENT_FG.length]!,
                  border: `1px solid ${ACCENT_BG[i % ACCENT_BG.length]!}25`,
                }}
              >
                {client.charAt(0)}
              </div>
              <span className="text-sm font-semibold text-gray-500 dark:text-white/50 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
