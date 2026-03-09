"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent";
const CONSENT_VERSION = "1.0";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  version: string;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — show banner
      setVisible(true);
    }
  }, []);

  const saveConsent = useCallback((accepted: boolean) => {
    const consent: CookieConsent = {
      accepted,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      // Storage unavailable
    }

    // Expose for future analytics wiring
    if (typeof window !== "undefined") {
      (window as Record<string, unknown>).__cookieConsent = consent;
    }

    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Cookie consent bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.07] bg-[#0d0d18]/95 backdrop-blur-sm"
        role="banner"
        aria-label="באנר עוגיות"
        style={{
          animation: "fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/50 leading-relaxed max-w-xl">
            אתר זה משתמש בעוגיות כדי להבטיח חוויית גלישה מיטבית.{" "}
            <Link
              href="/cookies"
              className="text-blue-400 hover:underline"
            >
              מדיניות עוגיות
            </Link>{" "}
            |{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-400 hover:underline"
            >
              מדיניות פרטיות
            </Link>
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrefs(true)}
              className="px-3 py-1.5 text-xs text-white/40 hover:text-white/60 transition-colors rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
            >
              העדפות
            </button>
            <button
              onClick={() => saveConsent(false)}
              className="px-3 py-1.5 text-xs text-white/50 hover:text-white/70 transition-colors rounded-lg border border-white/[0.08] hover:border-white/[0.15]"
            >
              סרב לאי-הכרחיות
            </button>
            <button
              onClick={() => saveConsent(true)}
              className="px-4 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              }}
            >
              קבל הכל
            </button>
          </div>
        </div>
      </div>

      {/* Preferences modal placeholder */}
      {showPrefs && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPrefs(false)}
          role="dialog"
          aria-label="העדפות עוגיות"
        >
          <div
            className="bg-[#0d0d18] border border-white/10 rounded-xl p-6 max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-lg font-bold text-white/90 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              העדפות עוגיות
            </h3>
            <p className="text-sm text-white/50 mb-5 leading-relaxed">
              בקרוב — ניהול העדפות עוגיות
            </p>
            <button
              onClick={() => setShowPrefs(false)}
              className="w-full py-2 text-sm font-semibold text-white rounded-lg transition-colors"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              }}
            >
              סגור
            </button>
          </div>
        </div>
      )}
    </>
  );
}
