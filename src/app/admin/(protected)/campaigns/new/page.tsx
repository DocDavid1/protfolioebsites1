"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const CAMPAIGN_TYPES = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "אימייל" },
  { value: "sms", label: "SMS" },
  { value: "social", label: "סושיאל מדיה" },
  { value: "cold_call", label: "שיחה קרה" },
  { value: "referral", label: "הפנייה" },
] as const;

const GOALS = [
  { value: "lead_gen", label: "יצירת לידים" },
  { value: "retention", label: "שימור לקוחות" },
  { value: "upsell", label: "אפסייל" },
  { value: "brand", label: "מיתוג" },
  { value: "other", label: "אחר" },
] as const;

const INPUT_CLS =
  "w-full bg-foreground/[0.04] border border-border rounded-lg px-4 py-2.5 text-sm text-foreground/80 placeholder-foreground/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all";
const LABEL_CLS =
  "block text-xs font-medium text-foreground/40 uppercase tracking-wider mb-2";

type CampaignType =
  | "whatsapp"
  | "email"
  | "sms"
  | "social"
  | "cold_call"
  | "referral";
type CampaignGoal =
  | "lead_gen"
  | "retention"
  | "upsell"
  | "brand"
  | "other";
type CampaignStatus = "draft" | "active" | "paused" | "completed";

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    type: "whatsapp" as CampaignType,
    target_audience: "",
    goal: "lead_gen" as CampaignGoal,
    message_template: "",
    start_date: "",
    end_date: "",
    status: "draft" as CampaignStatus,
    budget: "",
    notes: "",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.start_date) {
      setError("שם ותאריך התחלה הם שדות חובה.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: err } = await supabase.from("campaigns").insert({
      name: form.name.trim(),
      type: form.type,
      target_audience: form.target_audience || null,
      goal: form.goal,
      message_template: form.message_template || null,
      start_date: form.start_date,
      end_date: form.end_date || null,
      status: form.status,
      budget: form.budget ? Number(form.budget) : null,
      notes: form.notes || null,
    });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    router.push("/admin/campaigns");
    router.refresh();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/campaigns"
          className="text-foreground/30 hover:text-foreground/60 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
        </Link>
        <div>
          <h1
            className="text-xl font-bold text-foreground/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            קמפיין חדש
          </h1>
          <p className="text-xs text-foreground/30">
            מלא את הפרטים להוספת קמפיין שיווקי
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/25 mb-2">
            פרטי הקמפיין
          </p>

          <div>
            <label className={LABEL_CLS}>שם הקמפיין *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className={INPUT_CLS}
              placeholder='למשל: "WhatsApp מרץ 2026"'
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>סוג קמפיין</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value as CampaignType)}
                className={INPUT_CLS}
              >
                {CAMPAIGN_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL_CLS}>מטרה</label>
              <select
                value={form.goal}
                onChange={(e) => set("goal", e.target.value as CampaignGoal)}
                className={INPUT_CLS}
              >
                {GOALS.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL_CLS}>קהל יעד</label>
            <input
              type="text"
              value={form.target_audience}
              onChange={(e) => set("target_audience", e.target.value)}
              className={INPUT_CLS}
              placeholder='למשל: "בעלי עסקים בתל אביב"'
            />
          </div>

          <div>
            <label className={LABEL_CLS}>תבנית הודעה / סקריפט</label>
            <textarea
              rows={4}
              value={form.message_template}
              onChange={(e) => set("message_template", e.target.value)}
              className={INPUT_CLS + " resize-none"}
              placeholder="הכנס כאן את ההודעה או הסקריפט ששימש בקמפיין..."
            />
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/25 mb-2">
            תאריכים ותקציב
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>תאריך התחלה *</label>
              <input
                type="date"
                required
                value={form.start_date}
                onChange={(e) => set("start_date", e.target.value)}
                className={INPUT_CLS}
              />
            </div>
            <div>
              <label className={LABEL_CLS}>תאריך סיום</label>
              <input
                type="date"
                value={form.end_date}
                onChange={(e) => set("end_date", e.target.value)}
                className={INPUT_CLS}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>סטטוס</label>
              <select
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as CampaignStatus)
                }
                className={INPUT_CLS}
              >
                <option value="draft">טיוטה</option>
                <option value="active">פעיל</option>
                <option value="paused">מושהה</option>
                <option value="completed">הושלם</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLS}>תקציב (&#x20AA;)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                className={INPUT_CLS}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className={LABEL_CLS}>הערות</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className={INPUT_CLS + " resize-none"}
              placeholder="הערות נוספות..."
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400 text-center p-3 rounded-lg bg-red-400/10 border border-red-400/20">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-foreground disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            style={{
              background:
                "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              boxShadow: "0 0 20px rgba(59,130,246,0.15)",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                שומר...
              </>
            ) : (
              "צור קמפיין"
            )}
          </button>
          <Link
            href="/admin/campaigns"
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-foreground/40 border border-border hover:text-foreground/60 transition-all"
          >
            ביטול
          </Link>
        </div>
      </form>
    </div>
  );
}
