import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      aria-label="Portfolio Preview"
    >
      {/* Section divider */}
      <div className="divider-brand absolute top-0 left-0 right-0" />

      {/* Section background — makes cards pop */}
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
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
              עבודות נבחרות
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              מבצעים
              <br />
              <span className="gradient-text-blue">שבוצעו</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-bold text-white/55 hover:text-white transition-colors whitespace-nowrap"
          >
            צפה בכל הפרויקטים
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateIn>

        {/* Infinite slider */}
        <AnimateIn>
          <PortfolioSlider projects={featured} />
        </AnimateIn>

        {/* CTA row */}
        <AnimateIn delay={200} className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white/80 border border-white/15 hover:border-blue-500/45 hover:text-white hover:bg-blue-500/[0.09] transition-all duration-300"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.35)" }}
          >
            ראה את כל הפרויקטים
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
