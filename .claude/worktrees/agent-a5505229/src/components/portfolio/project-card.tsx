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
        className="group relative cursor-pointer rounded-xl overflow-hidden card-portfolio"
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
        {/* Browser window preview */}
        <div className="relative overflow-hidden">
          <BrowserWindowPlaceholder
            url={project.website_url}
            title={project.title}
            imageUrl={project.preview_image || undefined}
            className="rounded-none border-x-0 border-t-0"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/[0.06] transition-colors duration-300 pointer-events-none" />
          {/* Shine effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, transparent 60%)" }}
          />
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
            <span className="text-[10px] text-white/45 font-mono font-bold">
              {new Date(project.created_at).getFullYear()}
            </span>
          </div>

          <h3 className="font-bold text-white text-base mb-1.5 group-hover:text-blue-100 transition-colors line-clamp-1 tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm text-white/60 line-clamp-2 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-white/55 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-[10px] text-white/35 font-bold px-1">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.09]">
            <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors font-bold tracking-wide">
              View case study →
            </span>
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-md text-white/35 hover:text-white/80 hover:bg-white/[0.08] transition-all"
              aria-label={`${project.title} — נפתח בחלון חדש`}
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
