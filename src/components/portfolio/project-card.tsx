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
      {/* Outer div: handles scale + glow — no overflow-hidden so shadow is not clipped */}
      <div
        className="group relative cursor-pointer rounded-xl transition-transform duration-300 hover:scale-[1.03] will-change-transform"
        style={{ animationDelay: `${index * 100}ms` }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setModalOpen(true);
          }
        }}
        aria-label={`View ${project.title} project details`}
      >
        {/* Ambient glow behind the card — not clipped */}
        <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md bg-blue-500/15 pointer-events-none" />

        {/* Inner article: keeps overflow-hidden + gains shadow on hover */}
        <article className="relative rounded-xl overflow-hidden card-portfolio group-hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] transition-shadow duration-300">
          {/* Browser window preview */}
          <div className="relative overflow-hidden">
            <BrowserWindowPlaceholder
              url={project.website_url}
              title={project.title}
              imageUrl={project.preview_image || undefined}
              className="rounded-none border-x-0 border-t-0"
            />
            {/* Blue tint on hover */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.06] transition-colors duration-300 pointer-events-none" />
            {/* Visit Site pill — fades in on hover, opens external URL */}
            {project.website_url && project.website_url !== "https://example.com" && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/15 hover:bg-black/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-gray-900 dark:text-white/90" />
                  <span className="text-xs font-semibold text-gray-900 dark:text-white/90 tracking-wide">בקר באתר</span>
                </a>
              </div>
            )}
          </div>

          {/* Card content */}
          <div className="p-5 pt-4">
            {/* Category badge + year */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border",
                  CATEGORY_COLORS[project.category]
                )}
              >
                {CATEGORY_LABELS[project.category]}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-white/45 font-mono font-bold">
                {new Date(project.created_at).getFullYear()}
              </span>
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-100 transition-colors line-clamp-1 tracking-tight">
              {project.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-white/60 line-clamp-2 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold text-gray-600 dark:text-white/55 bg-gray-100 dark:bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-[10px] text-gray-400 dark:text-white/35 font-bold px-1">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            {/* Action row */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-white/[0.09]">
              <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors font-bold tracking-wide">
                ראה פרויקט ←
              </span>
              {project.website_url && project.website_url !== "https://example.com" && (
                <a
                  href={project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-md text-gray-400 dark:text-white/35 hover:text-gray-800 dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/[0.08] transition-all"
                  aria-label={`${project.title} — נפתח בחלון חדש`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>

      <ProjectModal
        project={project}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
