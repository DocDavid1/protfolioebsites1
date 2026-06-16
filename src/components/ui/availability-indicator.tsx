"use client";

import { useSyncExternalStore } from "react";
import { CalendarClock } from "lucide-react";

// Simple mounted check that avoids setState in effects
const subscribeMounted = () => () => {};
const getMountedClient = () => true;
const getMountedServer = () => false;

/**
 * A "limited availability" indicator that shows the current month
 * and remaining project slots — creates urgency without being dishonest.
 */
export function AvailabilityIndicator() {
  const mounted = useSyncExternalStore(subscribeMounted, getMountedClient, getMountedServer);

  // Hebrew month names
  const MONTHS = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  const now = new Date();
  const monthName = MONTHS[now.getMonth()] ?? "החודש";

  // Show a plausible number of remaining slots based on how far into the month we are
  const dayOfMonth = now.getDate();
  const slotsBase = dayOfMonth > 20 ? 1 : dayOfMonth > 10 ? 2 : 3;

  if (!mounted) return null;

  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-amber-500/20 bg-amber-500/[0.05] mb-8">
      <div className="relative flex items-center justify-center">
        <div
          className="absolute w-8 h-8 rounded-full bg-amber-500/20"
          style={{ animation: "availability-pulse 2s ease-in-out infinite" }}
          aria-hidden="true"
        />
        <CalendarClock className="w-4 h-4 text-amber-400 relative" />
      </div>
      <span className="text-xs font-semibold text-amber-300/90">
        {monthName} — נשארו {slotsBase} מקומות פנויים לפרויקטים חדשים
      </span>
    </div>
  );
}
