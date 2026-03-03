"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, StarOff, ExternalLink, X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Database, ProjectCategory } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: "website", label: "אתר" },
  { value: "automation", label: "אוטומציה" },
  { value: "crm", label: "CRM" },
  { value: "whatsapp", label: "וואטסאפ" },
  { value: "digital-presence", label: "נוכחות דיגיטלית" },
  { value: "full-system", label: "מערכת מלאה" },
];

const EMPTY_FORM: ProjectInsert = {
  title: "",
  client: "",
  website_url: "",
  category: "website",
  description: "",
  full_description: "",
  tags: [],
  preview_image_path: null,
  results: [],
  is_featured: false,
  sort_order: 0,
};

function getPreviewUrl(path: string | null) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;
  return `${url}/storage/v1/object/public/previews/${path}`;
}

export function ProjectsClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [form, setForm] = useState<ProjectInsert>(EMPTY_FORM);
  const [tagsInput, setTagsInput] = useState("");
  const [resultsInput, setResultsInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setTagsInput("");
    setResultsInput("");
    setError("");
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditTarget(project);
    setForm({
      title: project.title,
      client: project.client,
      website_url: project.website_url,
      category: project.category,
      description: project.description,
      full_description: project.full_description,
      tags: project.tags,
      preview_image_path: project.preview_image_path,
      results: project.results,
      is_featured: project.is_featured,
      sort_order: project.sort_order,
    });
    setTagsInput((project.tags ?? []).join(", "));
    setResultsInput((project.results ?? []).join("\n"));
    setError("");
    setDialogOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("previews")
        .upload(path, file, { upsert: true });
      if (uploadError) throw uploadError;
      setForm((f) => ({ ...f, preview_image_path: path }));
    } catch (_e) {
      setError("העלאת התמונה נכשלה.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    startTransition(async () => {
      setError("");
      const payload: ProjectInsert = {
        ...form,
        tags: tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        results: resultsInput
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
      };

      if (editTarget) {
        const { data, error: updateError } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editTarget.id)
          .select()
          .single();
        if (updateError) { setError(updateError.message); return; }
        if (data) setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      } else {
        const { data, error: insertError } = await supabase
          .from("projects")
          .insert(payload)
          .select()
          .single();
        if (insertError) { setError(insertError.message); return; }
        if (data) setProjects((prev) => [data, ...prev]);
      }

      setDialogOpen(false);
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("האם למחוק פרויקט זה?")) return;
    startTransition(async () => {
      await supabase.from("projects").delete().eq("id", id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    });
  };

  const toggleFeatured = (project: Project) => {
    startTransition(async () => {
      const { data } = await supabase
        .from("projects")
        .update({ is_featured: !project.is_featured })
        .eq("id", project.id)
        .select()
        .single();
      if (data) setProjects((prev) => prev.map((p) => (p.id === data.id ? data : p)));
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            className="text-2xl font-bold text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            פרויקטים
          </h1>
          <p className="text-xs text-white/30">{projects.length} פרויקטים סה&quot;כ</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500/15 border border-blue-500/25 hover:bg-blue-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          פרויקט חדש
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-white/[0.06] bg-white/[0.02]">
            <tr>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">תמונה</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">שם</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden md:table-cell">קטגוריה</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30 hidden lg:table-cell">תגיות</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">מוצג</th>
              <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white/30">פעולות</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const imgUrl = getPreviewUrl(project.preview_image_path);
              return (
                <tr key={project.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    {imgUrl ? (
                      <div className="w-12 h-9 rounded overflow-hidden relative bg-white/[0.05]">
                        <Image
                          src={imgUrl}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-9 rounded bg-white/[0.04] border border-white/[0.06]" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-white/80">{project.title}</p>
                    {project.client && (
                      <p className="text-xs text-white/30">{project.client}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs text-white/40 bg-white/[0.04] px-2 py-0.5 rounded">
                      {project.category ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-xs text-white/30">
                      {(project.tags ?? []).join(", ") || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(project)}
                      className="p-1.5 rounded hover:bg-white/[0.05] transition-colors"
                    >
                      {project.is_featured ? (
                        <Star className="w-4 h-4 text-amber-400" />
                      ) : (
                        <StarOff className="w-4 h-4 text-white/20" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {project.website_url && (
                        <a
                          href={project.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded hover:bg-white/[0.05] text-white/25 hover:text-white/60 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => openEdit(project)}
                        className="p-1.5 rounded hover:bg-white/[0.05] text-white/25 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 rounded hover:bg-red-500/[0.08] text-white/25 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-xs text-white/25">
                  אין פרויקטים עדיין. לחץ &ldquo;פרויקט חדש&rdquo; להוספה.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setDialogOpen(false)}
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/[0.09] bg-[#0d0d18] shadow-2xl">
            {/* Dialog header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <h2
                className="text-base font-bold text-white/80"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {editTarget ? "עריכת פרויקט" : "פרויקט חדש"}
              </h2>
              <button
                onClick={() => setDialogOpen(false)}
                className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="שם הפרויקט *">
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className={inputCls}
                    dir="rtl"
                  />
                </FormField>
                <FormField label="לקוח">
                  <input
                    type="text"
                    value={form.client ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                    className={inputCls}
                    dir="rtl"
                  />
                </FormField>
              </div>

              <FormField label="URL אתר">
                <input
                  type="url"
                  value={form.website_url}
                  onChange={(e) => setForm((f) => ({ ...f, website_url: e.target.value }))}
                  className={inputCls}
                  dir="ltr"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="קטגוריה">
                  <select
                    value={form.category ?? "website"}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as ProjectCategory }))}
                    className={cn(inputCls, "appearance-none")}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value} className="bg-[#0d0d18]">
                        {c.label}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="סדר תצוגה">
                  <input
                    type="number"
                    value={form.sort_order ?? 0}
                    onChange={(e) => setForm((f) => ({ ...f, sort_order: parseInt(e.target.value) || 0 }))}
                    className={inputCls}
                    dir="ltr"
                  />
                </FormField>
              </div>

              <FormField label="תיאור קצר">
                <textarea
                  rows={2}
                  value={form.description ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={cn(inputCls, "resize-none")}
                  dir="rtl"
                />
              </FormField>

              <FormField label="תיאור מלא">
                <textarea
                  rows={4}
                  value={form.full_description ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, full_description: e.target.value }))}
                  className={cn(inputCls, "resize-none")}
                  dir="rtl"
                />
              </FormField>

              <FormField label="תגיות (מופרדות בפסיק)">
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className={inputCls}
                  placeholder="Next.js, WhatsApp API, CRM"
                  dir="ltr"
                />
              </FormField>

              <FormField label="תוצאות (שורה לכל תוצאה)">
                <textarea
                  rows={3}
                  value={resultsInput}
                  onChange={(e) => setResultsInput(e.target.value)}
                  className={cn(inputCls, "resize-none")}
                  placeholder={"המרות עלו ב-40%\nזמן תגובה: 24h → 3min"}
                  dir="rtl"
                />
              </FormField>

              {/* Image upload */}
              <FormField label="תמונת תצוגה מקדימה">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/50 hover:text-white/70 hover:border-white/[0.12] cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    {uploading ? "מעלה..." : "בחר קובץ"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void handleImageUpload(file);
                      }}
                    />
                  </label>
                  {form.preview_image_path && (
                    <span className="text-xs text-emerald-400/70 font-mono truncate max-w-[200px]">
                      ✓ {form.preview_image_path}
                    </span>
                  )}
                </div>
              </FormField>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={form.is_featured ?? false}
                  onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
                  className="w-4 h-4 rounded border border-white/20 bg-white/[0.04] accent-blue-500"
                />
                <label htmlFor="is_featured" className="text-xs text-white/50 cursor-pointer">
                  הצג בעמוד הראשי (Featured)
                </label>
              </div>

              {error && (
                <p className="text-xs text-red-400/80 text-center">{error}</p>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/[0.06] flex justify-end gap-3">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-lg text-sm text-white/40 hover:text-white/60 transition-colors"
              >
                ביטול
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500/15 border border-blue-500/25 hover:bg-blue-500/25 disabled:opacity-50 transition-all"
              >
                {isPending ? "שומר..." : editTarget ? "שמור שינויים" : "צור פרויקט"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-white/35 uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all";
