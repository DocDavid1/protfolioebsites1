"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Accessibility,
  X,
  ZoomIn,
  ZoomOut,
  Contrast,
  SunMoon,
  Palette,
  Link2,
  Heading,
  Type,
  Underline,
  Pause,
  Keyboard,
  RotateCcw,
} from "lucide-react";

/** Preference key names stored in localStorage */
type PrefKey =
  | "textSize"
  | "highContrast"
  | "invert"
  | "grayscale"
  | "highlightLinks"
  | "highlightHeadings"
  | "readableFont"
  | "underlineLinks"
  | "reduceMotion"
  | "keyboardNav";

interface A11yPrefs {
  textSize?: "large" | "small" | undefined;
  highContrast?: boolean | undefined;
  invert?: boolean | undefined;
  grayscale?: boolean | undefined;
  highlightLinks?: boolean | undefined;
  highlightHeadings?: boolean | undefined;
  readableFont?: boolean | undefined;
  underlineLinks?: boolean | undefined;
  reduceMotion?: boolean | undefined;
  keyboardNav?: boolean | undefined;
}

const STORAGE_KEY = "a11y-prefs";

/** Map from pref key to the data attribute on <html> */
const ATTR_MAP: Record<PrefKey, string> = {
  textSize: "data-a11y-text-size",
  highContrast: "data-a11y-high-contrast",
  invert: "data-a11y-invert",
  grayscale: "data-a11y-grayscale",
  highlightLinks: "data-a11y-highlight-links",
  highlightHeadings: "data-a11y-highlight-headings",
  readableFont: "data-a11y-readable-font",
  underlineLinks: "data-a11y-underline-links",
  reduceMotion: "data-a11y-reduce-motion",
  keyboardNav: "data-a11y-keyboard-nav",
};

/** Control definitions for the toolbar UI */
const CONTROLS: Array<{
  key: PrefKey;
  label: string;
  icon: typeof Accessibility;
  type: "toggle" | "textSize";
  value?: "large" | "small";
}> = [
  { key: "textSize", label: "הגדל טקסט", icon: ZoomIn, type: "textSize", value: "large" },
  { key: "textSize", label: "הקטן טקסט", icon: ZoomOut, type: "textSize", value: "small" },
  { key: "highContrast", label: "ניגודיות גבוהה", icon: Contrast, type: "toggle" },
  { key: "invert", label: "צבעים הפוכים", icon: SunMoon, type: "toggle" },
  { key: "grayscale", label: "גווני אפור", icon: Palette, type: "toggle" },
  { key: "highlightLinks", label: "הדגש קישורים", icon: Link2, type: "toggle" },
  { key: "highlightHeadings", label: "הדגש כותרות", icon: Heading, type: "toggle" },
  { key: "readableFont", label: "גופן קריא", icon: Type, type: "toggle" },
  { key: "underlineLinks", label: "קו מתחת לקישורים", icon: Underline, type: "toggle" },
  { key: "reduceMotion", label: "ללא אנימציות", icon: Pause, type: "toggle" },
  { key: "keyboardNav", label: "ניווט מקלדת", icon: Keyboard, type: "toggle" },
];

function loadPrefs(): A11yPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as A11yPrefs;
    }
  } catch {
    // Corrupted storage — ignore
  }
  return {};
}

function savePrefs(prefs: A11yPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Storage full or unavailable — ignore
  }
}

/** Apply all saved preferences as data attributes on <html> */
function applyPrefs(prefs: A11yPrefs): void {
  const el = document.documentElement;

  for (const [key, attr] of Object.entries(ATTR_MAP)) {
    const prefKey = key as PrefKey;
    const value = prefs[prefKey];

    if (prefKey === "textSize") {
      if (value === "large" || value === "small") {
        el.setAttribute(attr, value);
      } else {
        el.removeAttribute(attr);
      }
    } else {
      if (value) {
        el.setAttribute(attr, "");
      } else {
        el.removeAttribute(attr);
      }
    }
  }
}

/** Remove all data-a11y-* attributes from <html> */
function clearAllAttrs(): void {
  const el = document.documentElement;
  for (const attr of Object.values(ATTR_MAP)) {
    el.removeAttribute(attr);
  }
}

export function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Lazy init reads localStorage only on client (SSR-safe: returns {} on server)
  const [prefs, setPrefs] = useState<A11yPrefs>(() => {
    if (typeof window === "undefined") return {};
    return loadPrefs();
  });
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Apply saved preferences as DOM attributes on mount
  useEffect(() => {
    applyPrefs(prefs);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Trap focus within the panel when open
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleToggle = useCallback(
    (key: PrefKey) => {
      setPrefs((prev) => {
        const next: A11yPrefs = { ...prev, [key]: !prev[key] };
        savePrefs(next);
        applyPrefs(next);
        return next;
      });
    },
    []
  );

  const handleTextSize = useCallback(
    (size: "large" | "small") => {
      setPrefs((prev) => {
        const next: A11yPrefs = {
          ...prev,
          textSize: prev.textSize === size ? undefined : size,
        };
        savePrefs(next);
        applyPrefs(next);
        return next;
      });
    },
    []
  );

  const handleReset = useCallback(() => {
    clearAllAttrs();
    setPrefs({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  // Don't render interactive content before mount to avoid hydration mismatch
  if (!mounted) {
    return (
      <button
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"
        aria-label="פתח סרגל נגישות"
        aria-expanded={false}
      >
        <Accessibility className="h-5 w-5" aria-hidden="true" />
      </button>
    );
  }

  return (
    <>
      {/* Trigger button */}
      <button
        ref={triggerRef}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        aria-label={open ? "סגור סרגל נגישות" : "פתח סרגל נגישות"}
        aria-expanded={open}
        aria-controls="a11y-panel"
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Accessibility className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="dialog"
          aria-label="סרגל נגישות"
          className="fixed bottom-20 left-6 z-50 w-72 max-h-[70vh] overflow-y-auto rounded-xl bg-[#0d0d18] border border-white/10 shadow-2xl"
          style={{
            animation: "fade-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#0d0d18] border-b border-white/[0.07] px-4 py-3 flex items-center justify-between z-10">
            <h2
              className="text-sm font-bold text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              סרגל נגישות
            </h2>
            <button
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white/[0.06] text-white/50 hover:text-white/80 transition-colors"
              aria-label="סגור סרגל נגישות"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Controls */}
          <div className="p-3 space-y-1">
            {CONTROLS.map((control, idx) => {
              const Icon = control.icon;
              const active =
                control.type === "textSize"
                  ? prefs.textSize === control.value
                  : !!prefs[control.key];

              return (
                <button
                  key={`${control.key}-${control.value ?? idx}`}
                  onClick={() => {
                    if (control.type === "textSize" && control.value) {
                      handleTextSize(control.value);
                    } else {
                      handleToggle(control.key);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                      : "text-white/60 hover:bg-white/[0.04] hover:text-white/80 border border-transparent"
                  }`}
                  aria-pressed={active}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-right">{control.label}</span>
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}

            {/* Reset button */}
            <div className="border-t border-white/[0.06] pt-2 mt-2">
              <button
                onClick={handleReset}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-amber-400/80 hover:bg-amber-500/[0.06] hover:text-amber-400 transition-colors border border-transparent"
              >
                <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="flex-1 text-right">איפוס הכל</span>
              </button>
            </div>
          </div>

          {/* Footer link */}
          <div className="border-t border-white/[0.06] px-4 py-2.5">
            <a
              href="/accessibility"
              className="text-xs text-white/35 hover:text-blue-400 transition-colors"
            >
              הצהרת נגישות מלאה
            </a>
          </div>
        </div>
      )}
    </>
  );
}
