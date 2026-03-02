import { ProjectCard } from "@/components/portfolio/project-card";
import { AnimateIn } from "@/components/ui/animate-in";
import { projects } from "@/lib/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Fighters Builders' portfolio — websites, automation systems, CRM integrations, and WhatsApp solutions built with military precision.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page header */}
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            Our Work
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            OPERATIONS{" "}
            <span className="gradient-text-blue">LOG</span>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Every project is a completed mission. Here is the record.
          </p>
        </AnimateIn>

        {/* Stats row */}
        <AnimateIn delay={100} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Projects Delivered", value: "30+" },
            { label: "Industries Served", value: "12+" },
            { label: "Countries", value: "4" },
            { label: "Avg. Client ROI", value: "3x" },
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

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 80}>
              <ProjectCard project={project} index={i} />
            </AnimateIn>
          ))}
        </div>

        {/* Screenshot notice */}
        <AnimateIn delay={400} className="mt-12 text-center">
          <p className="text-xs text-white/20 max-w-md mx-auto">
            Preview screenshots are generated via automated headless browser
            capture.{" "}
            <span className="text-white/30">Live previews update weekly.</span>
          </p>
        </AnimateIn>
      </div>
    </div>
  );
}
