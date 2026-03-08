import Link from "next/link";
import { Accessibility } from "lucide-react";

export function AccessibilityWidget() {
  return (
    <Link
      href="/accessibility"
      aria-label="הצהרת נגישות"
      title="הצהרת נגישות"
      className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      <Accessibility className="h-5 w-5" aria-hidden="true" />
    </Link>
  );
}
