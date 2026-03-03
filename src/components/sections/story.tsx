import { Shield, Target, Zap } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const FOUNDERS = [
  {
    codename: "ALPHA",
    role: "אסטרטגיה ומערכות",
    bio: "10 שנים במבצעים מיוחדים. כעת בונה תשתיות עסקיות עם אותה הדיוק שנדרשה לתכנון משימות בסיכון גבוה.",
    icon: Shield,
    borderColor: "rgba(59,130,246,0.2)",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    codeColor: "text-blue-400",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.12)]",
  },
  {
    codename: "BRAVO",
    role: "טכנולוגיה ואוטומציה",
    bio: "ותיק יחידת מודיעין. בונה מערכות אוטומטיות שאוספות נתונים, מסיקות לידים ומבצעות ללא התערבות אנושית.",
    icon: Target,
    borderColor: "rgba(245,158,11,0.2)",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    codeColor: "text-amber-400",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.12)]",
  },
  {
    codename: "CHARLIE",
    role: "צמיחה וביצוע",
    bio: "פרמדיק קרב שהפך למומחה צמיחה. מזהה את נקודות הדימום בעסק שלך ועוצר אותן — מהר.",
    icon: Zap,
    borderColor: "rgba(16,185,129,0.2)",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    codeColor: "text-emerald-400",
    hoverShadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.12)]",
  },
];

export function StorySection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="story"
      aria-label="הסיפור שלנו"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Right side in RTL: Story text */}
          <div>
            <AnimateIn from="left">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 block">
                המשימה
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-white/90 mb-6 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                נולדנו
                <br />
                <span className="gradient-text-amber">בשדה</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={100}>
              <div className="space-y-4 text-white/50 leading-relaxed">
                <p className="text-base">
                  אנחנו שלושה לוחמי קרב ישראלים ומשרתי מילואים פעילים. שירתנו
                  בכמה מהיחידות הדורשניות ביותר בצה&quot;ל — והבאנו את המשמעת הזו
                  לעולם העסקי.
                </p>
                <p className="text-base">
                  בשדה, כישלון אינו אפשרות. כל משימה דורשת תכנון מדויק, ביצוע
                  ללא דופי, ויכולת הסתגלות תחת לחץ. אנחנו מיישמים את אותו
                  סטנדרט על כל מערכת דיגיטלית שאנחנו בונים.
                </p>
                <p className="text-base text-white/70 font-medium">
                  הלקוחות שלנו לא מקבלים פתרונות מתבניות. הם מקבלים תשתית מנוסה
                  בקרב הבנויה לנצח.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn delay={200} className="mt-8">
              <div className="flex flex-wrap gap-6">
                {[
                  [
                    "משימה קודמת לכל",
                    "כל פרויקט מתחיל עם מטרה ברורה",
                  ],
                  ["אפס סובלנות", "לביצועים נמוכים ולוחות זמנים שחורגים"],
                  ["תמיד מסתגלים", "אנחנו מחזורים עד שזה עובד"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="flex items-start gap-2 max-w-[200px]"
                  >
                    <span className="w-1 h-1 mt-2 rounded-full bg-amber-400 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-white/80 mb-0.5">
                        {title}
                      </p>
                      <p className="text-[11px] text-white/30">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>

          {/* Left side in RTL: Founder cards */}
          <div className="space-y-4">
            {FOUNDERS.map((founder, i) => {
              const Icon = founder.icon;
              return (
                <AnimateIn key={founder.codename} delay={i * 100} from="right">
                  <div
                    className={`flex items-start gap-5 p-5 rounded-xl transition-all duration-300 ${founder.hoverShadow}`}
                    style={{
                      background: "#0d0d18",
                      border: `1px solid ${founder.borderColor}`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${founder.iconBg}`}
                      style={{ border: `1px solid ${founder.borderColor}` }}
                    >
                      <Icon className={`w-5 h-5 ${founder.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-widest font-mono ${founder.codeColor}`}
                        >
                          {founder.codename}
                        </span>
                        <span className="text-[10px] text-white/20">—</span>
                        <span className="text-xs text-white/40">
                          {founder.role}
                        </span>
                      </div>
                      <p className="text-sm text-white/45 leading-relaxed">
                        {founder.bio}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}

            {/* Active service badge */}
            <AnimateIn delay={350}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-xs text-white/35">
                  <span className="text-white/60 font-medium">
                    משרתי מילואים פעילים.
                  </span>{" "}
                  אנחנו יודעים מה זה להגיע כשזה משנה.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
