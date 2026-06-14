"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "972501234567";
const WHATSAPP_MESSAGE = "שלום פייטרס בילדרס! אני מתעניין בשירותים שלכם.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-3" dir="rtl">
      {/* Tooltip */}
      {!tooltipDismissed && (
        <div className="glass-strong rounded-xl px-4 py-3 max-w-[200px] animate-fade-up relative">
          <button
            onClick={() => setTooltipDismissed(true)}
            className="absolute top-1 left-1 p-1 rounded-full text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
            aria-label="סגור"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-xs text-gray-600 dark:text-white/60 leading-relaxed">
            <span className="text-gray-800 dark:text-white/80 font-semibold">צריכים עזרה?</span>
            <br />
            שלחו לנו הודעה בוואטסאפ ונחזור תוך דקות
          </p>
        </div>
      )}

      {/* FAB button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלח הודעה בוואטסאפ"
        className="group relative w-14 h-14 rounded-full flex items-center justify-center btn-whatsapp shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
        <MessageCircle className="w-6 h-6 text-white relative" />
      </a>
    </div>
  );
}
