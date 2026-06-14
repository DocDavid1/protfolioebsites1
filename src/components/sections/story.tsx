import {
  Shield,
  Target,
  Zap,
  Sword,
  Heart,
  Users,
  Clock,
  Award,
  MessageCircle,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("שלום, אני רוצה לשמוע עוד על הסיפור שלכם")}`;

const VALUES = [
  {
    icon: Target,
    title: "דיוק",
    description: "בשדה הקרב, דיוק מציל חיים. אצלנו, דיוק מציל תקציבים.",
    color: "#3b82f6",
  },
  {
    icon: Shield,
    title: "אחריות",
    description: "לוקחים אחריות מלאה על כל פרויקט. אם זה לא עובד — אנחנו מתקנים.",
    color: "#f59e0b",
  },
  {
    icon: Users,
    title: "צוותיות",
    description: "שלושה לוחמים שעובדים כיחידה אחת. כל אחד מביא כוח שונה.",
    color: "#10b981",
  },
  {
    icon: Clock,
    title: "משמעת",
    description: "דדליינים הם דדליינים. לעולם לא מאחרים. לעולם לא מתפשרים.",
    color: "#8b5cf6",
  },
];

const FOUNDERS = [
  {
    name: "ALPHA",
    role: "אסטרטגיה ומערכות",
    bio: "10 שנים ביחידות מבצעיות. היום מתכנן תשתיות עסקיות באותה הדיוק שנדרשה לתכנון משימות בסיכון גבוה. רואה את התמונה הגדולה ויודע לתרגם חזון לפעולה.",
    icon: Shield,
    color: "#3b82f6",
  },
  {
    name: "BRAVO",
    role: "טכנולוגיה ואוטומציה",
    bio: "ותיק יחידת מודיעין ואיסוף. בונה מערכות אוטומטיות שאוספות נתונים, מטפלות בלידים ומבצעות 24/7 ללא התערבות אנושית.",
    icon: Target,
    color: "#f59e0b",
  },
  {
    name: "CHARLIE",
    role: "צמיחה וביצוע",
    bio: "פרמדיק קרב שהפך למומחה צמיחה דיגיטלית. מזהה את נקודות הדימום בעסק שלך ועוצר אותן. מהר. בלי פשרות.",
    icon: Zap,
    color: "#10b981",
  },
];

const TIMELINE = [
  {
    period: "2019-2023",
    title: "שירות קרבי",
    description: "שירתנו ביחידות הדורשניות ביותר בצה\"ל. נלחמנו בעזה ובלבנון. למדנו מה זו מחויבות אמיתית.",
    icon: Sword,
    color: "#f43f5e",
  },
  {
    period: "2023",
    title: "ההחלטה",
    description: "אחרי השחרור, החלטנו לאחד כוחות. ידענו שהערכים שלמדנו בצבא — דיוק, אחריות, צוותיות — יכולים לשנות עסקים.",
    icon: Heart,
    color: "#f59e0b",
  },
  {
    period: "2024-היום",
    title: "פייטרס בילדרס",
    description: "היום אנחנו בונים תשתיות דיגיטליות לעסקים במחירים נגישים. הניסיון שלנו גדל, הפורטפוליו מתרחב, והמשימה ברורה.",
    icon: Award,
    color: "#3b82f6",
  },
];

export function StorySection() {
  return (
    <section
      className="py-24 md:py-36 relative overflow-hidden"
      id="story"
      aria-label="הסיפור שלנו"
    >
      <div className="divider-brand absolute top-0 left-0 right-0" />

      {/* Dramatic background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 20%, rgba(245,158,11,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 10% 70%, rgba(59,130,246,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(139,92,246,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-topo opacity-40" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* ── Part 1: The Headline ── */}
        <AnimateIn className="text-center mb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-4 block">
            הסיפור שלנו
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white/90 mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            משדה הקרב{" "}
            <span className="gradient-text-amber">לשדה העסקים</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/55 max-w-3xl mx-auto leading-relaxed">
            אנחנו לא עוד סוכנות דיגיטלית. אנחנו שלושה לוחמי קרב ישראלים שהחליטו להשתמש בכל מה שלמדנו בצבא —
            כדי לעזור לעסקים קטנים לצמוח. בלי יומרות. בלי מחירים מנופחים. רק עבודה קשה ותוצאות.
          </p>
        </AnimateIn>

        {/* ── Part 2: Timeline ── */}
        <div className="max-w-3xl mx-auto mb-24 relative">
          {/* Vertical line */}
          <div
            className="absolute top-0 bottom-0 right-[23px] md:right-1/2 md:-translate-x-1/2 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, rgba(244,63,94,0.4), rgba(245,158,11,0.3), rgba(59,130,246,0.4))",
            }}
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {TIMELINE.map((item, i) => {
              const Icon = item.icon;
              const isEven = i % 2 === 0;
              return (
                <AnimateIn
                  key={item.period}
                  delay={i * 150}
                  from={isEven ? "right" : "left"}
                >
                  <div className={`relative flex items-start gap-6 ${isEven ? "md:flex-row-reverse md:text-left" : ""}`}>
                    {/* Dot */}
                    <div
                      className="timeline-dot shrink-0 mt-1"
                      style={{ borderColor: item.color }}
                    />

                    {/* Content */}
                    <div className="glass rounded-xl p-5 md:p-6 flex-1 max-w-md hover-lift">
                      <span
                        className="text-xs font-mono font-bold tracking-wider mb-2 block"
                        style={{ color: item.color }}
                      >
                        {item.period}
                      </span>
                      <h3
                        className="text-xl font-bold text-gray-900 dark:text-white/90 mb-2"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <Icon className="w-4 h-4 inline-block ml-2 -mt-0.5" style={{ color: item.color }} />
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-white/55 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>

        {/* ── Part 3: The Team ── */}
        <AnimateIn className="text-center mb-12">
          <h3
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white/90 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הצוות
          </h3>
          <p className="text-gray-400 dark:text-white/40 max-w-lg mx-auto">
            שלושה אנשים, שלוש נקודות חוזק, משימה אחת.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {FOUNDERS.map((founder, i) => {
            const Icon = founder.icon;
            return (
              <AnimateIn key={founder.name} delay={i * 100} from="bottom">
                <div className="group card-founder rounded-2xl p-7 h-full border hover-lift"
                  style={{ borderColor: `${founder.color}20` }}
                >
                  {/* Avatar placeholder */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${founder.color}20, ${founder.color}08)`,
                      border: `1px solid ${founder.color}30`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: founder.color }} />
                  </div>

                  {/* Name */}
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-sm font-bold uppercase tracking-widest font-mono"
                      style={{ color: founder.color }}
                    >
                      {founder.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-white/40 mb-4">
                    {founder.role}
                  </p>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* ── Part 4: Values ── */}
        <AnimateIn className="text-center mb-12">
          <h3
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white/90 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הערכים שלנו?{" "}
            <span className="gradient-text-blue">מהשטח.</span>
          </h3>
          <p className="text-gray-400 dark:text-white/40 max-w-lg mx-auto">
            ערכים שלא למדנו מספרים. למדנו אותם בתנאים הקשים ביותר.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <AnimateIn key={value.title} delay={i * 80} from="scale">
                <div className="group glass rounded-xl p-6 text-center hover-lift h-full">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${value.color}12`,
                      border: `1px solid ${value.color}20`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: value.color }} />
                  </div>
                  <h4 className="text-base font-bold text-white/85 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-white/45 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimateIn>
            );
          })}
        </div>

        {/* ── Part 5: Emotional CTA ── */}
        <AnimateIn>
          <div className="glass-strong rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.08), transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h3
                className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white/90 mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                למה מחירים נגישים?
              </h3>
              <p className="text-base text-gray-600 dark:text-white/60 leading-relaxed mb-6 max-w-xl mx-auto">
                כי אנחנו יודעים מה זה להתחיל מאפס. אנחנו בונים ניסיון, פורטפוליו ומוניטין —
                ובתמורה אתם מקבלים שירות ברמה הגבוהה ביותר במחיר שעסק קטן יכול להרשות לעצמו.
                <span className="block mt-3 text-white/75 font-medium">
                  זו לא הנחה. זו אסטרטגיה של win-win.
                </span>
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white"
              >
                <MessageCircle className="w-5 h-5" />
                בואו נדבר
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* Active service badge */}
        <AnimateIn delay={200} className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full glass-light">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-gray-400 dark:text-white/40">
              <span className="text-gray-600 dark:text-white/60 font-medium">משרתי מילואים פעילים.</span>{" "}
              כשהמדינה קוראת — אנחנו שם. כשהעסק שלך צריך אותנו — אנחנו שם.
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
