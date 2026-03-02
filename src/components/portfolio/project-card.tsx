"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { type Project, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { BrowserWindowPlaceholder } from "./browser-window";
import { ProjectModal } from "./project-modal";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article
        className={cn(
          "group relative cursor-pointer",
          "surface-card rounded-xl overflow-hidden",
          "border border-white/7 transition-all duration-300 ease-out",
          "hover:border-blue-500/30 hover:-translate-y-1",
          "hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]"
        )}
        style={{ animationDelay: `${index * 100}ms` }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
        aria-label={`View ${project.title} project details`}
      >
        {/* Browser window preview */}
        <div className="relative overflow-hidden">
          <BrowserWindowPlaceholder
            url={project.website_url}
            title={project.title}
            className="rounded-none border-x-0 border-t-0"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300 pointer-events-none" />
        </div>

        {/* Card content */}
        <div className="p-5">
          {/* Category badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border",
                CATEGORY_COLORS[project.category]
              )}
            >
              {CATEGORY_LABELS[project.category]}
            </span>
            <span className="text-[10px] text-white/25 font-mono">
              {new Date(project.created_at).getFullYear()}
            </span>
          </div>

          <h3 className="font-semibold text-white/90 text-base mb-1.5 group-hover:text-white transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-sm text-white/40 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-white/35 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] text-white/25 px-1">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <span className="text-xs text-blue-400/70 group-hover:text-blue-400 transition-colors font-medium">
              View case study →
            </span>
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md text-white/20 hover:text-white/60 hover:bg-white/[0.06] transition-all"
              aria-label={`Visit ${project.title} website`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </article>

      <ProjectModal
        project={project}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
