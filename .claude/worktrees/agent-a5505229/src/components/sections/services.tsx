import type { ComponentType } from "react";
import {
  Globe,
  MessageCircle,
  BarChart2,
  Users,
  Zap,
  TrendingUp,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

interface Service {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  highlight: string;
  accent: "blue" | "amber" | "emerald" | "purple" | "orange" | "cyan";
}

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "אתרים מוכנים לקרב",
    description:
      "אתרים בעלי ביצועים גבוהים הבנויים להמיר מבקרים ללקוחות. ללא תבניות — כל אתר מהונדס למהירות, SEO ותוצאות.",
    highlight: "ביצועי Lighthouse 95+",
    accent: "blue",
  },
  {
    icon: MessageCircle,
    title: "מערכות וואטסאפ",
    description:
      "משפכי וואטסאפ אוטומטיים שמעסיקים, מסיקים ומסיקים לידים 24/7. איש המכירות הטוב ביותר שלך לא ישן.",
    highlight: "500+ שיחות אוטומטיות ביום",
    accent: "emerald",
  },
  {
    icon: BarChart2,
    title: "מעקב לידים",
    description:
      "לעולם אל תאבד פוטנציאל לקוח שוב. מעקב מלא על כל המשפך מהקלקול הראשון ועד חתימת החוזה, עם דשבורדים בזמן אמת.",
    highlight: "אפס לידים שאבדו",
    accent: "amber",
  },
  {
    icon: Users,
    title: "אינטגרציית CRM",
    description:
      "שלוט על כל מערכת היחסים עם הלקוח ממרכז פעולות אחד. מסונכרן, מאורגן ומוכן לקרב.",
    highlight: "נראות מלאה של הצינור",
    accent: "purple",
  },
  {
    icon: Zap,
    title: "מערכות אוטומציה",
    description:
      "פרוס מערכות, לא מאמץ. אנחנו מאטוטמים את התהליכים החוזרים שלך כדי שהצוות שלך יתמקד במה שחשוב.",
    highlight: "80% מהמשימות החוזרות אוטומטיות",
    accent: "orange",
  },
  {
    icon: TrendingUp,
    title: "נוכחות דיגיטלית",
    description:
      "שלוט בשוק שלך אונליין. SEO, נוכחות ברשתות חברתיות, זהות מותג וקמפיינים פרסומיים הבנויים בדיוק צבאי.",
    highlight: "מיצוב מוביל בשוק",
    accent: "cyan",
  },
];

const ACCENT_STYLES: Record<
  Service["accent"],
  { icon: string; badge: string; border: string }
> = {
  blue: {
    icon: "text-blue-400 bg-blue-500/10",
    badge: "text-blue-400 bg-blue-500/[0.07] border-blue-500/15",
    border: "group-hover:border-blue-500/30",
  },
  amber: {
    icon: "text-amber-400 bg-amber-500/10",
    badge: "text-amber-400 bg-amber-500/[0.07] border-amber-500/15",
    border: "group-hover:border-amber-500/30",
  },
  emerald: {
    icon: "text-emerald-400 bg-emerald-500/10",
    badge: "text-emerald-400 bg-emerald-500/[0.07] border-emerald-500/15",
    border: "group-hover:border-emerald-500/30",
  },
  purple: {
    icon: "text-purple-400 bg-purple-500/10",
    badge: "text-purple-400 bg-purple-500/[0.07] border-purple-500/15",
    border: "group-hover:border-purple-500/30",
  },
  orange: {
    icon: "text-orange-400 bg-orange-500/10",
    badge: "text-orange-400 bg-orange-500/[0.07] border-orange-500/15",
    border: "group-hover:border-orange-500/30",
  },
  cyan: {
    icon: "text-cyan-400 bg-cyan-500/10",
    badge: "text-cyan-400 bg-cyan-500/[0.07] border-cyan-500/15",
    border: "group-hover:border-cyan-500/30",
  },
};

export function ServicesSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="services"
      aria-label="Our Services"
    >
      {/* Subtle top divider */}
      <div className="divider-brand mb-0 absolute top-0 left-0 right-0" />

      {/* Section atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            מה אנחנו מפרסים
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ארסנל הנשק
            <span className="gradient-text-amber"> הדיגיטלי</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            כל כלי בסטאק שלנו נבחר לביצועים ולROI. ללא שטויות, ללא נפיחות — רק מערכות שמבצעות.
          </p>
        </AnimateIn>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const styles = ACCENT_STYLES[service.accent];
            const Icon = service.icon;
            return (
              <AnimateIn key={service.title} delay={i * 80} from="bottom">
                <div
                  className={`group relative card-service rounded-xl p-6 transition-all duration-300 h-full ${styles.border}`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-lg mb-5 ${styles.icon}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/65 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Highlight badge */}
                  <div className="mt-auto">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${styles.badge}`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                      {service.highlight}
                    </span>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
