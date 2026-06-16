"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle,
  ChevronDown,
  Clock,
  Shield,
  Zap,
  Award,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { BUSINESS, whatsappUrl } from "@/lib/config";

const CONTACT_OPTIONS = [
  {
    icon: MessageCircle,
    title: "וואטסאפ",
    description: "המענה המהיר ביותר. אנחנו עונים תוך דקות.",
    action: whatsappUrl("שלום פייטרס בילדרס! אני רוצה לדון על פרויקט."),
    actionLabel: "פתח וואטסאפ",
    color: "emerald",
    highlight: true,
  },
  {
    icon: Mail,
    title: "אימייל",
    description: "לתדריכים מפורטים ופניות רשמיות.",
    action: `mailto:${BUSINESS.email}`,
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

const TRUST_BADGES = [
  { icon: Award, label: "5+ שנות ניסיון", color: "#3b82f6" },
  { icon: Shield, label: "30+ פרויקטים", color: "#22c55e" },
  { icon: Clock, label: "מענה תוך שעתיים", color: "#f59e0b" },
  { icon: Zap, label: "תוצאות מוכחות", color: "#8b5cf6" },
];

const FAQ_ITEMS = [
  {
    question: "כמה זה עולה?",
    answer:
      "המחיר תלוי בהיקף הפרויקט. אנחנו מציעים מגוון חבילות שמתחילות ממחיר נגיש לכל עסק. שיחת הייעוץ הראשונית חינמית ובה נתאים לך את ההצעה המדויקת.",
  },
  {
    question: "כמה זמן לוקח לבנות אתר?",
    answer:
      "אתר עסקי סטנדרטי מוכן תוך 2-4 שבועות. פרויקטים מורכבים יותר עם מערכות CRM ואוטומציות יכולים לקחת 4-8 שבועות. אנחנו תמיד עומדים בלוח הזמנים.",
  },
  {
    question: "מה התהליך?",
    answer:
      "התהליך מתחיל בשיחת תדריך חינמית, ממשיך לאסטרטגיה ועיצוב, דרך פיתוח ובדיקות, ועד להשקה מלאה ותמיכה שוטפת. כל שלב מתועד ושקוף לחלוטין.",
  },
  {
    question: "יש אחריות?",
    answer:
      "בהחלט. כל פרויקט מגיע עם תקופת אחריות מלאה, תמיכה טכנית שוטפת, ותיקון באגים ללא עלות נוספת. לא משאירים אתכם לבד אחרי ההשקה.",
  },
];

const TYPING_PHRASES = [
  "ספר לנו על העסק שלך. אנחנו נגיד לך בדיוק איך לבנות אותו נכון.",
  "כל פרויקט מתחיל בשיחה. בוא נתחיל את שלך.",
  "אנחנו בונים עסקים דיגיטליים. מה אתה בונה?",
  "התדריך הבא שלך מתחיל כאן.",
];

interface FormState {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Confetti particles for the success state
const CONFETTI_COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f59e0b",
  "#8b5cf6",
  "#f43f5e",
  "#06b6d4",
];

// Pre-computed confetti pieces — avoids Math.random() during render
const CONFETTI_PIECES = Array.from({ length: 30 }, (_, i) => {
  // Deterministic pseudo-random based on index
  const seed1 = ((i * 7 + 13) % 100);
  const seed2 = ((i * 11 + 3) % 40);
  const seed3 = ((i * 17 + 5) % 150) / 100;
  const seed4 = ((i * 23 + 7) % 100) / 100;
  const seed5 = ((i * 31 + 11) % 360);
  return {
    id: i,
    left: `${seed1}%`,
    top: `${seed2}%`,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] ?? "#3b82f6",
    delay: `${seed3}s`,
    size: `${6 + seed4 * 6}px`,
    rotation: `${seed5}deg`,
  };
});

function ConfettiEffect() {
  return (
    <div className="confetti-container">
      {CONFETTI_PIECES.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top: p.top,
            background: p.color,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            transform: `rotate(${p.rotation})`,
          }}
        />
      ))}
    </div>
  );
}

function TypingEffect({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("");
  const stateRef = useRef({
    phraseIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      const s = stateRef.current;
      const currentPhrase = phrases[s.phraseIndex] ?? phrases[0] ?? "";

      if (!s.isDeleting && s.charIndex === currentPhrase.length) {
        // Pause before deleting
        timeout = setTimeout(() => {
          s.isDeleting = true;
          tick();
        }, 2500);
        return;
      }

      if (s.isDeleting && s.charIndex === 0) {
        // Move to next phrase
        s.isDeleting = false;
        s.phraseIndex = (s.phraseIndex + 1) % phrases.length;
        tick();
        return;
      }

      if (s.isDeleting) {
        s.charIndex -= 1;
      } else {
        s.charIndex += 1;
      }

      const newPhrase = phrases[s.phraseIndex] ?? phrases[0] ?? "";
      setText(newPhrase.slice(0, s.charIndex));

      const speed = s.isDeleting ? 30 : 50;
      timeout = setTimeout(tick, speed);
    }

    tick();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [phrases]);

  return (
    <span>
      {text}
      <span className="typing-cursor" />
    </span>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <h3
        className="text-lg font-bold text-gray-900 dark:text-white/90 mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        שאלות נפוצות
      </h3>
      {FAQ_ITEMS.map((item, i) => (
        <div
          key={i}
          className="rounded-xl border border-gray-200 dark:border-white/7 overflow-hidden transition-all duration-300"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
            aria-expanded={openIndex === i}
          >
            <span className="text-sm font-semibold text-gray-800 dark:text-white/80">
              {item.question}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 dark:text-white/40 transition-transform duration-300 flex-shrink-0 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className="grid transition-all duration-300"
            style={{
              gridTemplateRows: openIndex === i ? "1fr" : "0fr",
            }}
          >
            <div className="overflow-hidden">
              <p className="px-4 pb-4 text-sm text-gray-500 dark:text-white/45 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
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
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
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
          privacy_policy_accepted: privacyConsent,
          consent_to_contact: privacyConsent,
          marketing_consent: marketingConsent,
          privacy_policy_version: "1.0",
          source_page: "/contact",
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
    <div className="min-h-screen py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 20%, rgba(59,130,246,0.05) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <AnimateIn className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            צור קשר
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            התחל את
            <br />
            <span className="gradient-text-blue">המשימה שלך</span>
          </h1>
          <p className="text-gray-400 dark:text-white/40 max-w-lg text-lg leading-relaxed min-h-[3.5rem]">
            <TypingEffect phrases={TYPING_PHRASES} />
          </p>
        </AnimateIn>

        {/* Trust Badges */}
        <AnimateIn className="mb-12" delay={50}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200/60 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${badge.color}15`,
                      color: badge.color,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-white/60">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
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
                        : "border-gray-200 dark:border-white/7 bg-white dark:bg-[#0d0d18] hover:border-blue-500/25"
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
                        <p className="text-sm font-semibold text-gray-800 dark:text-white/80">
                          {option.title}
                        </p>
                        {option.highlight && (
                          <span className="text-[10px] text-emerald-400 font-medium">
                            מומלץ
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-white/35 mb-3">
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
              <div className="p-4 rounded-xl border border-gray-200/60 dark:border-white/[0.05] bg-gray-50 dark:bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-gray-500 dark:text-white/50">
                    זמין כעת
                  </span>
                </div>
                <p className="text-xs text-gray-300 dark:text-white/25">
                  זמן מענה ממוצע:{" "}
                  <span className="text-gray-500 dark:text-white/50">פחות מ-2 שעות</span>
                </p>
              </div>
            </AnimateIn>

            {/* FAQ Accordion */}
            <AnimateIn delay={300} from="right">
              <div className="mt-6">
                <FAQAccordion />
              </div>
            </AnimateIn>
          </div>

          {/* Contact form */}
          <AnimateIn delay={100} from="left" className="lg:col-span-3">
            <div className="surface-card rounded-xl border border-gray-200 dark:border-white/7 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12 relative" aria-live="polite">
                  <ConfettiEffect />
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 animate-scale-in"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)",
                      border: "2px solid rgba(34,197,94,0.3)",
                      boxShadow: "0 0 40px rgba(34,197,94,0.2), 0 0 80px rgba(34,197,94,0.1)",
                    }}
                  >
                    <CheckCircle className="w-9 h-9 text-emerald-400" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-3 animate-fade-up"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    התדריך התקבל בהצלחה!
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-white/45 mb-6 animate-fade-up delay-200">
                    נסקור את פרטי הפרויקט שלך ונצור קשר תוך 2 שעות דרך וואטסאפ או אימייל.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-400">
                    <a
                      href={whatsappUrl("שלום! שלחתי תדריך דרך האתר.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold hover:bg-emerald-500/15 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      שלח גם בוואטסאפ
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setLoading(false);
                        setForm({
                          name: "",
                          business: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                        setPrivacyConsent(false);
                        setMarketingConsent(false);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 text-sm font-semibold hover:bg-white/[0.06] transition-colors"
                    >
                      שלח תדריך נוסף
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <p className="text-xs text-gray-500 dark:text-white/50 mb-4">שדות המסומנים ב-* הם שדות חובה</p>
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
                      <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                        שמך *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        aria-invalid={serverError ? true : undefined}
                        className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="ישראל ישראלי"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                        שם העסק
                      </label>
                      <input
                        type="text"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder='חברה בע"מ'
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                        אימייל
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="you@example.com"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                        טלפון / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="050-000-0000"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                      שירות נדרש
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-600 dark:text-white/60 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-white dark:bg-[#0d0d18]">
                        בחר שירות...
                      </option>
                      {SERVICES_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-white dark:bg-[#0d0d18]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                      תדריך הפרויקט *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      aria-invalid={serverError ? true : undefined}
                      className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="תאר את העסק שלך, מה אתה צריך ומהן המטרות שלך..."
                    />
                  </div>

                  {/* Privacy consent */}
                  <div className="space-y-3 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        required
                        checked={privacyConsent}
                        onChange={(e) => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
                      />
                      <span className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">
                        קראתי ואני מסכים/ה ל
                        <Link href="/privacy-policy" className="text-blue-400 hover:underline mx-1">מדיניות הפרטיות</Link>
                        ומסכים/ה לקבלת פניות בחזרה *
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
                      />
                      <span className="text-xs text-gray-500 dark:text-white/50 leading-relaxed">
                        אני מסכים/ה לקבל עדכונים ותוכן שיווקי (לא חובה)
                      </span>
                    </label>
                  </div>

                  {serverError && (
                    <p className="text-xs text-red-400/80 text-center" role="alert">{serverError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm disabled:opacity-60"
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
