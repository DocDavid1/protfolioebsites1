import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export default function NotFound() {
  return (
    <div dir="rtl" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-tactical-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
        {/* 404 number */}
        <AnimateIn from="scale" duration={900}>
          <p
            className="gradient-text-blue text-[8rem] font-extrabold leading-none tracking-tighter sm:text-[10rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            404
          </p>
        </AnimateIn>

        {/* Headline */}
        <AnimateIn from="bottom" delay={150}>
          <h1
            className="mt-4 text-3xl font-bold text-gray-900 dark:text-white/90 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הדף לא נמצא
          </h1>
        </AnimateIn>

        {/* Subtitle */}
        <AnimateIn from="bottom" delay={300}>
          <p className="mt-4 text-lg leading-relaxed text-gray-500 dark:text-white/45">
            נראה שהגעת למקום לא קיים. אבל אל דאגה — יש לנו הרבה מקומות טובים
            יותר.
          </p>
        </AnimateIn>

        {/* CTA buttons */}
        <AnimateIn from="bottom" delay={450}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              חזור לדף הבית
            </Link>
            <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
              צור קשר
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
