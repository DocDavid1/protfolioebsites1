"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  from?: "bottom" | "left" | "right" | "scale";
  threshold?: number;
}

export function AnimateIn({
  children,
  className,
  delay = 0,
  duration = 700,
  from = "bottom",
  threshold = 0.1,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hiddenStyles = {
    bottom: "opacity-0 translate-y-6",
    left: "opacity-0 -translate-x-6",
    right: "opacity-0 translate-x-6",
    scale: "opacity-0 scale-95",
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={cn(
        "transition-all ease-out",
        visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hiddenStyles[from],
        className
      )}
    >
      {children}
    </div>
  );
}
