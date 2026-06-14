import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PortfolioSlider } from "@/components/portfolio/portfolio-slider";
import { AnimateIn } from "@/components/ui/animate-in";
import { dbProjectToProject, projects as mockProjects } from "@/lib/portfolio";
import { createClient } from "@/lib/supabase/server";

async function getAllProjects() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return mockProjects;
    }
    return data.map(dbProjectToProject);
  } catch {
    return mockProjects;
  }
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export async function PortfolioPreview() {
  const featured = shuffle(await getAllProjects());

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="portfolio"
      aria-label="עבודות נבחרות"
    >
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(6,6,20,0.7) 0%, transparent 80%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <AnimateIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-4 block">
              עבודות נבחרות
            </span>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              פרויקטים{" "}
              <span className="gradient-text-blue">שהשלמנו</span>
            </h2>
            <p className="text-gray-400 dark:text-white/40 mt-3 max-w-xl">
              כל פרויקט הוא משימה. כל לקוח הוא שותף. הנה חלק מהעבודות האחרונות שלנו.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="btn-outline group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-white/60 whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            כל הפרויקטים
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </AnimateIn>

        {/* Infinite slider */}
        <AnimateIn>
          <PortfolioSlider projects={featured} />
        </AnimateIn>

        {/* Bottom stats row */}
        <AnimateIn delay={200} className="mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "אתרים", value: "15+", color: "#3b82f6" },
              { label: "חנויות אונליין", value: "8+", color: "#10b981" },
              { label: "מערכות אוטומציה", value: "12+", color: "#f59e0b" },
              { label: "לקוחות מרוצים", value: "100%", color: "#a78bfa" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-light rounded-xl p-4 text-center hover-lift"
              >
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)", color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 dark:text-white/35">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
