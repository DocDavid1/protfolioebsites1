import { MessageCircle, Shield, Target, Zap, CheckCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Three Israeli combat veterans turned digital builders. Learn the story behind Fighters Builders.",
};

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to learn more about Fighters Builders.")}`;

const VALUES = [
  {
    icon: Shield,
    title: "Discipline",
    description:
      "Military precision in every deliverable. Deadlines aren't suggestions — they're orders.",
  },
  {
    icon: Target,
    title: "Accuracy",
    description:
      "We zero in on your business objective and don't stop until the target is hit.",
  },
  {
    icon: Zap,
    title: "Speed",
    description:
      "In combat and in business, speed is a competitive advantage. We move fast without breaking things.",
  },
];

const TIMELINE = [
  {
    year: "2019",
    event: "Combined service",
    detail: "Founders serve simultaneously in IDF combat units",
    color: "blue",
  },
  {
    year: "2021",
    event: "First project",
    detail: "Built a system for a family business while on reserve duty",
    color: "amber",
  },
  {
    year: "2022",
    event: "Fighters Builders founded",
    detail: "Officially launched as a digital agency",
    color: "emerald",
  },
  {
    year: "2023",
    event: "Scale-up",
    detail: "Grew to serving 15+ clients across 3 countries",
    color: "blue",
  },
  {
    year: "2024",
    event: "Full-stack agency",
    detail: "Launched CRM, automation, and AI integration services",
    color: "amber",
  },
  {
    year: "2025",
    event: "Platform launch",
    detail: "Building the next generation of digital business tools",
    color: "emerald",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-tactical-grid opacity-50" aria-hidden="true" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 40% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 sm:px-6">
          <AnimateIn>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4 block">
              About Us
            </span>
            <h1
              className="text-5xl md:text-7xl font-bold text-white/90 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              THREE FIGHTERS.
              <br />
              <span className="gradient-text-amber">ONE MISSION.</span>
            </h1>
            <p className="text-xl text-white/45 max-w-2xl leading-relaxed">
              We traded our uniforms for keyboards — but kept the mindset that
              got us through impossible situations.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative">
        <div className="divider-brand absolute top-0 left-0 right-0" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <AnimateIn key={value.title} delay={i * 100}>
                  <div className="p-6 rounded-xl surface-card border border-white/7 hover:border-blue-500/20 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white/90 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <AnimateIn className="mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              THE <span className="gradient-text-blue">MISSION LOG</span>
            </h2>
          </AnimateIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-white/[0.06]" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <AnimateIn key={item.year} delay={i * 80} from="left">
                  <div className="flex gap-6 pl-10 relative">
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        item.color === "blue"
                          ? "border-blue-500/50 bg-blue-500/10"
                          : item.color === "amber"
                            ? "border-amber-500/50 bg-amber-500/10"
                            : "border-emerald-500/50 bg-emerald-500/10"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.color === "blue"
                            ? "bg-blue-400"
                            : item.color === "amber"
                              ? "bg-amber-400"
                              : "bg-emerald-400"
                        }`}
                      />
                    </div>

                    <div>
                      <span
                        className={`text-xs font-bold font-mono ${
                          item.color === "blue"
                            ? "text-blue-400"
                            : item.color === "amber"
                              ? "text-amber-400"
                              : "text-emerald-400"
                        }`}
                      >
                        {item.year}
                      </span>
                      <p className="text-sm font-semibold text-white/80 mt-0.5">
                        {item.event}
                      </p>
                      <p className="text-xs text-white/35 mt-0.5">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why work with us */}
      <section className="py-20 relative">
        <div className="divider-brand absolute top-0 left-0 right-0" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimateIn from="left">
              <h2
                className="text-3xl md:text-4xl font-bold text-white/90 mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                WHY WORK
                <br />
                <span className="gradient-text-amber">WITH US</span>
              </h2>
              <p className="text-white/45 mb-6 leading-relaxed">
                We don&apos;t just deliver projects — we deploy solutions. Every
                engagement is treated as a mission with a clear objective,
                measurable outcomes, and full accountability.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
              >
                <MessageCircle className="w-4 h-4" />
                Let&apos;s Talk
              </a>
            </AnimateIn>

            <AnimateIn delay={100} from="right">
              <div className="space-y-3">
                {[
                  "Dedicated project manager on every engagement",
                  "Weekly progress reports with real metrics",
                  "Military-grade accountability — no excuses",
                  "Full IP ownership transferred to you",
                  "Post-launch support included in every project",
                  "Direct WhatsApp access to the founding team",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/55">{item}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </div>
  );
}
