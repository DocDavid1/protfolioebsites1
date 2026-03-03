import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/project-card";
import { AnimateIn } from "@/components/ui/animate-in";
import { dbProjectToProject, getFeaturedProjects } from "@/lib/portfolio";
import { createClient } from "@/lib/supabase/server";

async function getFeatured() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(6);

    if (error || !data || data.length === 0) {
      return getFeaturedProjects(); // fallback to mock data
    }
    return data.map(dbProjectToProject);
  } catch {
    return getFeaturedProjects();
  }
}

export async function PortfolioPreview() {
  const featured = await getFeatured();

  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="portfolio"
      aria-label="Portfolio Preview"
    >
      {/* Section divider */}
      <div className="divider-brand absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <AnimateIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
              עבודות נבחרות
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              מבצעים
              <br />
              <span className="gradient-text-blue">שבוצעו</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors whitespace-nowrap"
          >
            צפה בכל הפרויקטים
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateIn>

        {/* Featured projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </AnimateIn>
          ))}
        </div>

        {/* CTA row */}
        <AnimateIn delay={300} className="mt-12 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-blue-500/30 hover:text-white hover:bg-blue-500/[0.06] transition-all duration-300"
          >
            ראה את כל הפרויקטים
            <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
