import Link from "next/link";
import { ProjectCard } from "@/components/portfolio/project-card";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  dbProjectToProject,
  projects as mockProjects,
  CATEGORY_LABELS,
  type ProjectCategory,
} from "@/lib/portfolio";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "פורטפוליו",
  description:
    "גלה את הפורטפוליו של פייטרס בילדרס — אתרים, מערכות אוטומציה, אינטגרציות CRM ופתרונות וואטסאפ הבנויים בדיוק צבאי.",
};

const ALL_CATEGORIES: ProjectCategory[] = [
  "website",
  "automation",
  "crm",
  "whatsapp",
  "digital-presence",
  "full-system",
];

async function getProjects(category?: string) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (category && ALL_CATEGORIES.includes(category as ProjectCategory)) {
      query = query.eq("category", category as ProjectCategory);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) return mockProjects;
    return data.map(dbProjectToProject);
  } catch {
    return mockProjects;
  }
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory =
    category && ALL_CATEGORIES.includes(category as ProjectCategory)
      ? (category as ProjectCategory)
      : undefined;

  const allProjects = await getProjects(activeCategory);

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page header */}
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            העבודות שלנו
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            יומן{" "}
            <span className="gradient-text-blue">המבצעים</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            כל פרויקט הוא משימה שהושלמה. הנה הרשומה.
          </p>
        </AnimateIn>

        {/* Stats row */}
        <AnimateIn delay={100} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "פרויקטים שהושלמו", value: "30+" },
            { label: "תעשיות שנשרתו", value: "12+" },
            { label: "מדינות", value: "4" },
            { label: "ROI ממוצע ללקוח", value: "3x" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-5 rounded-xl border border-white/7 bg-[#0d0d18]"
            >
              <p
                className="text-3xl font-bold gradient-text-blue mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-white/35 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </AnimateIn>

        {/* Category filter pills */}
        <AnimateIn delay={150} className="flex flex-wrap justify-center gap-2 mb-10">
          <Link
            href="/portfolio"
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-medium border transition-all",
              !activeCategory
                ? "text-white bg-white/[0.08] border-white/[0.15]"
                : "text-white/40 border-white/[0.07] hover:border-white/[0.12] hover:text-white/60"
            )}
          >
            הכל
          </Link>
          {ALL_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/portfolio?category=${cat}`}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-medium border transition-all",
                activeCategory === cat
                  ? "text-white bg-white/[0.08] border-white/[0.15]"
                  : "text-white/40 border-white/[0.07] hover:border-white/[0.12] hover:text-white/60"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </Link>
          ))}
        </AnimateIn>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allProjects.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 80}>
              <ProjectCard project={project} index={i} />
            </AnimateIn>
          ))}
        </div>

        {allProjects.length === 0 && (
          <AnimateIn className="text-center py-16">
            <p className="text-white/30 text-sm">אין פרויקטים בקטגוריה זו עדיין.</p>
          </AnimateIn>
        )}

        {/* Screenshot notice */}
        <AnimateIn delay={400} className="mt-12 text-center">
          <p className="text-xs text-white/20 max-w-md mx-auto">
            צילומי מסך של תצוגה מקדימה נוצרים דרך לכידה אוטומטית בדפדפן.{" "}
            <span className="text-white/30">תצוגות חיות מתעדכנות מדי שבוע.</span>
          </p>
        </AnimateIn>
      </div>
    </div>
  );
}
