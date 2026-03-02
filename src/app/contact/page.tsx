"use client";

import { useState } from "react";
import { MessageCircle, Mail, Send, CheckCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const WHATSAPP_NUMBER = "972501234567";

const CONTACT_OPTIONS = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Fastest response. We reply within minutes.",
    action: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Fighters Builders! I'd like to discuss a project.")}`,
    actionLabel: "Open WhatsApp",
    color: "emerald",
    highlight: true,
  },
  {
    icon: Mail,
    title: "Email",
    description: "For detailed briefs and formal inquiries.",
    action: "mailto:hello@fightersbuilders.com",
    actionLabel: "Send Email",
    color: "blue",
    highlight: false,
  },
];

const SERVICES_OPTIONS = [
  "Website Development",
  "WhatsApp Automation",
  "CRM Integration",
  "Lead Tracking System",
  "Full Digital Presence",
  "Consultation Only",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Future: send to API route
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Header */}
        <AnimateIn className="mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4 block">
            Get In Touch
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold text-white/90 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BEGIN YOUR
            <br />
            <span className="gradient-text-blue">MISSION</span>
          </h1>
          <p className="text-white/40 max-w-lg text-lg leading-relaxed">
            Tell us about your business. We&apos;ll tell you exactly how to
            build it right.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact options */}
          <div className="lg:col-span-2 space-y-4">
            {CONTACT_OPTIONS.map((option, i) => {
              const Icon = option.icon;
              return (
                <AnimateIn key={option.title} delay={i * 100} from="left">
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
                            Recommended
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
                      {option.actionLabel} →
                    </span>
                  </a>
                </AnimateIn>
              );
            })}

            {/* Response time */}
            <AnimateIn delay={200} from="left">
              <div className="p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-white/50">
                    Currently available
                  </span>
                </div>
                <p className="text-xs text-white/25">
                  Average response time:{" "}
                  <span className="text-white/50">under 2 hours</span>
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Contact form */}
          <AnimateIn delay={100} from="right" className="lg:col-span-3">
            <div className="surface-card rounded-xl border border-white/7 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white/90 mb-2">
                    Brief Received
                  </h3>
                  <p className="text-sm text-white/45">
                    We&apos;ll review your project details and be in touch within
                    2 hours via WhatsApp or email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={form.business}
                        onChange={(e) =>
                          setForm({ ...form, business: e.target.value })
                        }
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        placeholder="Acme Corp"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                      Service Needed
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/60 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none"
                    >
                      <option value="" className="bg-[#0d0d18]">
                        Select a service...
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
                      Project Brief *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
                      placeholder="Describe your business, what you need, and your goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-white text-sm transition-all duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                      boxShadow: "0 0 20px rgba(59,130,246,0.2)",
                    }}
                  >
                    <Send className="w-4 h-4" />
                    Send Brief
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
