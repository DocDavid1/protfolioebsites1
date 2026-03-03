"use client";

import { useState, useTransition } from "react";
import { Save, Settings2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const FIELDS: { key: string; label: string; placeholder: string; type?: string }[] = [
  {
    key: "whatsapp_number",
    label: "מספר WhatsApp",
    placeholder: "972501234567",
    type: "tel",
  },
  {
    key: "whatsapp_message",
    label: "הודעת WhatsApp ברירת מחדל",
    placeholder: "שלום פייטרס בילדרס!",
  },
  {
    key: "cta_headline",
    label: "כותרת CTA ראשית",
    placeholder: "מוכן לצאת לקרב הדיגיטלי?",
  },
  {
    key: "cta_subheadline",
    label: "כותרת משנה CTA",
    placeholder: "ספר לנו על המשימה שלך...",
  },
];

export function SettingsClient({
  initialSettings,
}: {
  initialSettings: Record<string, string>;
}) {
  const supabase = createClient();
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    startTransition(async () => {
      setError("");
      const upserts = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      const { error: upsertError } = await supabase
        .from("settings")
        .upsert(upserts, { onConflict: "key" });

      if (upsertError) {
        setError(upsertError.message);
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">
          <Settings2 className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h1
            className="text-2xl font-bold text-white/90"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הגדרות
          </h1>
          <p className="text-xs text-white/30">תוכן דינמי ופרטי קשר</p>
        </div>
      </div>

      <div className="max-w-xl rounded-xl border border-white/[0.07] bg-[#0d0d18] overflow-hidden">
        <div className="p-6 space-y-5">
          {FIELDS.map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-white/35 uppercase tracking-wider mb-2">
                {label}
              </label>
              <input
                type={type ?? "text"}
                value={settings[key] ?? ""}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={placeholder}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                dir={key.includes("number") ? "ltr" : "rtl"}
              />
            </div>
          ))}

          {error && (
            <p className="text-xs text-red-400/80">{error}</p>
          )}
        </div>

        <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
          {saved && (
            <span className="text-xs text-emerald-400/70">✓ הגדרות נשמרו</span>
          )}
          <div className="mr-auto">
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-blue-500/15 border border-blue-500/25 hover:bg-blue-500/25 disabled:opacity-50 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              {isPending ? "שומר..." : "שמור הגדרות"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
