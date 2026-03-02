"use client";

import { ExternalLink, X, CheckCircle, Tag } from "lucide-react";
import { type Project, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/portfolio";
import { cn } from "@/lib/utils";
import { BrowserWindowPlaceholder } from "./browser-window";

interface ProjectModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in bg-[#0d0d18] border border-white/10 rounded-2xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Browser preview */}
        <div className="rounded-t-2xl overflow-hidden">
          <BrowserWindowPlaceholder
            url={project.website_url}
            title={project.title}
            className="rounded-none border-x-0 border-t-0"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border",
                    CATEGORY_COLORS[project.category]
                  )}
                >
                  {CATEGORY_LABELS[project.category]}
                </span>
                {project.featured && (
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border text-amber-400 bg-amber-400/10 border-amber-400/20">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {project.title}
              </h2>
              <p className="text-sm text-white/40">
                Client:{" "}
                <span className="text-white/60">{project.client}</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/60 leading-relaxed mb-6">
            {project.full_description || project.description}
          </p>

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Results
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.results.map((result, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg p-3"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-white/60">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/50 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/[0.05] text-white/60 hover:text-white text-sm font-medium transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
