import type { ComponentType } from "react";
import {
  Globe,
  ShoppingCart,
  BarChart2,
  Bot,
  Users,
  TrendingUp,
  Megaphone,
} from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

interface Service {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  color: string;
  glowColor: string;
}

const SERVICES: Service[] = [
  {
    icon: Globe,
    title: "בניית אתרים",
    description:
      "אתרים מהירים, מרשימים ומותאמים לכל מכשיר. כל אתר מהונדס להמרה מקסימלית ולחוויית משתמש יוצאת דופן.",
    features: ["עיצוב מותאם אישית", "Lighthouse 95+", "SEO מובנה"],
    color: "#3b82f6",
    glowColor: "rgba(59,130,246,0.12)",
  },
  {
    icon: ShoppingCart,
    title: "חנויות אונליין",
    description:
      "חנויות דיגיטליות שמוכרות. מערכת ניהול מוצרים, תשלומים מאובטחים וחוויית קנייה חלקה מהנייד.",
    features: ["מערכת תשלומים", "ניהול מלאי", "Mobile-first"],
    color: "#10b981",
    glowColor: "rgba(16,185,129,0.12)",
  },
  {
    icon: BarChart2,
    title: "משפכים שיווקיים",
    description:
      "משפכים שמובילים את הלקוח מהרגע הראשון ועד לסגירה. כל שלב מתוכנן ומבוקר למקסם המרות.",
    features: ["דפי נחיתה", "A/B Testing", "אופטימיזציה"],
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.12)",
  },
  {
    icon: Bot,
    title: "אוטומציה עסקית",
    description:
      "מערכות אוטומטיות שעובדות בשבילך 24/7. מוואטסאפ ועד CRM — הכל רץ בלי לגעת.",
    features: ["וואטסאפ בוטים", "תהליכים אוטומטיים", "חיסכון בזמן"],
    color: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.12)",
  },
  {
    icon: Users,
    title: "ייצור לידים",
    description:
      "מכונת לידים שלא עוצרת. מקמפיינים ממומנים ועד לכידה אוטומטית — כל ליד נכנס למערכת ומטופל.",
    features: ["לכידה אוטומטית", "סיווג לידים", "מעקב מלא"],
    color: "#f43f5e",
    glowColor: "rgba(244,63,94,0.12)",
  },
  {
    icon: Megaphone,
    title: "שיווק דיגיטלי",
    description:
      "אסטרטגיית שיווק מלאה מותאמת לעסק שלך. Google Ads, Meta, SEO ותוכן — הכל תחת קורת גג אחת.",
    features: ["Google Ads", "Meta Campaigns", "Content Strategy"],
    color: "#22d3ee",
    glowColor: "rgba(34,211,238,0.12)",
  },
  {
    icon: TrendingUp,
    title: "ניהול אתרים",
    description:
      "אחזקה, עדכונים, גיבויים ואבטחה. אנחנו דואגים שהאתר שלך תמיד עובד, מהיר ומאובטח.",
    features: ["עדכונים שוטפים", "גיבויים יומיים", "תמיכה טכנית"],
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,0.12)",
  },
];

export function ServicesSection() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      id="services"
      aria-label="השירותים שלנו"
    >
      <div className="divider-glow absolute top-0 left-0 right-0" />

      <div
        className="absolute inset-0 pointer-events-none section-gradient-blue"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dot-grid opacity-20" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <AnimateIn className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400 mb-4 block">
            מה אנחנו בונים
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white/90 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            כל מה שהעסק שלך צריך{" "}
            <span className="gradient-text-blue">כדי לצמוח</span>
          </h2>
          <p className="text-gray-400 dark:text-white/40 max-w-2xl mx-auto text-lg">
            מאתרים ועד אוטומציות מלאות — אנחנו בונים את התשתית הדיגיטלית שמייצרת לקוחות, לידים והכנסות.
          </p>
        </AnimateIn>

        {/* Services grid — first row of 3, second row of 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {SERVICES.slice(0, 3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.slice(3).map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <AnimateIn delay={index * 70} from="bottom">
      <div className="group relative card-service rounded-2xl p-6 md:p-7 h-full hover-lift overflow-hidden">
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${service.glowColor}, transparent 70%)`,
          }}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${service.color}12`,
              border: `1px solid ${service.color}25`,
              color: service.color,
            }}
          >
            <Icon className="w-5 h-5" />
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-gray-900 dark:text-white/90 mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-white/55 leading-relaxed mb-5">
            {service.description}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                style={{
                  color: `${service.color}cc`,
                  background: `${service.color}0a`,
                  border: `1px solid ${service.color}18`,
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"
          style={{ background: service.color }}
        />
      </div>
    </AnimateIn>
  );
}
