import Link from "next/link";
import { ShieldX } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "403 — גישה נדחתה",
  robots: { index: false, follow: false },
};

export default function ForbiddenPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#05050b" }}
    >
      <div className="text-center">
        <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-7 h-7 text-red-400" />
        </div>
        <h1
          className="text-4xl font-bold text-white/80 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          גישה נדחתה
        </h1>
        <p className="text-sm text-white/35 mb-8">
          המשתמש שלך אינו מורשה לגשת לאזור זה.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-all"
        >
          חזור לדף הבית
        </Link>
      </div>
    </div>
  );
}
