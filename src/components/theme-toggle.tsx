"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/[0.04] dark:bg-white/[0.04]" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 bg-gray-100 hover:bg-gray-200 dark:hover:bg-white/[0.06] dark:hover:bg-white/[0.1] text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white/90"
      aria-label={isDark ? "עבור למצב יום" : "עבור למצב לילה"}
      title={isDark ? "מצב יום" : "מצב לילה"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0" />
      )}
    </button>
  );
}
