"use client";

import { type Project } from "@/lib/portfolio";
import { ProjectCard } from "./project-card";

interface PortfolioSliderProps {
  projects: Project[];
}

export function PortfolioSlider({ projects }: PortfolioSliderProps) {
  // Duplicate for seamless infinite loop
  const doubled = [...projects, ...projects];

  return (
    <div className="marquee-wrapper relative overflow-hidden" dir="ltr">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #05050b 0%, transparent 100%)" }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #05050b 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div
        className="marquee-track flex gap-5 pb-4"
        style={{ width: "max-content" }}
      >
        {doubled.map((project, i) => (
          <div
            key={`${project.id}-${i}`}
            style={{ width: "340px", flexShrink: 0 }}
          >
            <ProjectCard project={project} index={i % projects.length} />
          </div>
        ))}
      </div>
    </div>
  );
}
