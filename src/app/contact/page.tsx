"use client";

import { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const WHATSAPP_NUMBER = "972501234567";

const CONTACT_OPTIONS = [
  {
    icon: MessageCircle,
    title: "וואטסאפ",
    description: "המענה המהיר ביותר. אנחנו עונים תוך דקות.",
    action: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("שלום פייטרס בילדרס! אני רוצה לדון על פרויקט.")}`,
    actionLabel: "פתח וואטסאפ",
    color: "emerald",
    highlight: true,
  },
  {
    icon: Mail,
    title: "אימייל",
    description: "לתדריכים מפורטים ופניות רשמיות.",
    action: "mailto:hello@fightersbuilders.com",
    actionLabel: "שלח אימייל",
    color: "blue",
    highlight: false,
  },
];

const SERVICES_OPTIONS = [
  "פיתוח אתרים",
  "אוטומציית וואטסאפ",
  "אינטגרציית CRM",
  "מערכת מעקב לידים",
  "נוכחות דיגיטלית מלאה",
  "ייעוץ בלבד",
];

interface FormState {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [form, setForm] = useState<FormState>({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  // Honeypot — hidden from real users, filled by bots
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          business: form.business || undefined,
          email: form.email || undefined,
          phone: form.phone || undefined,
          service: form.service || undefined,
          message: form.message,
          _h: honeypot, // honeypot
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json.ok) {
        setServerError(json.error ?? "שגיאה בשליחת הטופס. נסה שוב.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError("שגיאת רשת. בדוק את החיבור שלך ונסה שוב.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <AnimateIn className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            צור קשר
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            התחל את
            <br />
            <span className="gradient-text-blue">המשימה שלך</span>
          </h1>
          <p className="text-white/40 max-w-lg text-lg leading-relaxed">
            ספר לנו על העסק שלך. אנחנו נגיד לך בדיוק איך לבנות אותו נכון.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact options */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_OPTIONS.map((option, i) => {
              const Icon = option.icon;
              return (
                <AnimateIn key={option.title} delay={i * 100} from="right">
                  <a
                    href={option.action}
                    target={option.action.startsWith("http") ? "_blank" : undefined}
                    rel={option.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group block p-5 rounded-xl border transition-all duration-300 ${
                      option.highlight
                        ? "border-emerald-500/30 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08]"
                        : "border-white/7 bg-[#0d0d18] hover:border-blue-500/25"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          option.color === "emerald"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-blue-500/15 text-blue-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/80">
                          {option.title}
                        </p>
                        {option.highlight && (
                          <span className="text-[10px] text-emerald-400 font-medium">
                            מומלץ
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-white/35 mb-3">
                      {option.description}
                    </p>
                    <span
                      className={`text-xs font-semibold ${
                        option.color === "emerald"
                          ? "text-emerald-400"
                          : "text-blue-400"
                      } group-hover:underline`}
                    >
                      {option.actionLabel} ←
                    </span>
                  </a>
                </AnimateIn>
              );
            })}

            {/* Response time */}
            <AnimateIn delay={200} from="right">
              <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-white/50">
                    זמין כעת
                  </span>
                </div>
                <p className="text-xs text-white/25">
                  זמן מענה ממוצע:{" "}
                  <span className="text-white/50">פחות מ-2 שעות</span>
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Contact form */}
          <AnimateIn delay={100} from="left" className="lg:col-span-3">
            <div className="surface-card rounded-xl border border-white/7 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12" aria-live="polite">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/90 mb-2">
                    התדריך התקבל
                  </h3>
                  <p className="text-sm text-white/45">
                    נסקור את פרטי הפרויקט שלך ונצור קשר תוך 2 שעות דרך וואטסאפ או אימייל.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <p className="text-xs text-white/50 mb-4">שדות המסומנים ב-* הם שדות חובה</p>
                  {/* Honeypot — visually hidden, ARIA hidden, no label */}
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
                    tabIndex={-1}
                  >
                    <input
                      type="text"
                      name="_h"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        שמך *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        aria-invalid={serverError ? true : undefined}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="ישראל ישראלי"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        שם העסק
                      </label>
                      <input
                        type="text"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder='חברה בע"מ'
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        אימייל
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="you@example.com"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        טלפון / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="050-000-0000"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      שירות נדרש
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/60 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-[#0d0d18]">
                        בחר שירות...
                      </option>
                      {SERVICES_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#0d0d18]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      תדריך הפרויקט *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      aria-invalid={serverError ? true : undefined}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="תאר את העסק שלך, מה אתה צריך ומהן המטרות שלך..."
                    />
                  </div>

                  {serverError && (
                    <p className="text-xs text-red-400/80 text-center" role="alert">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300 disabled:opacity-60"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      boxShadow: "0 0 20px rgba(59,130,246,0.2)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "שולח..." : "שלח תדריך"}
                  </button>
                </form>
              )}
            </div>
          </AnimateIn>
        </div>
      </div>
    </div>
  );
}
