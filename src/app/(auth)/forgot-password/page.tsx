"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);
    if (resetError) {
      setError("שגיאה בשליחת הקישור. נסה שוב.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">בדוק את האימייל שלך</h2>
          <p className="text-white/50 text-sm mb-1">{`שלחנו קישור לאיפוס סיסמה ל‑${email}`}</p>
          <p className="text-white/30 text-xs">הקישור בתוקף למשך 60 דקות</p>
          <Link href="/login" className="mt-6 inline-block text-sm text-blue-400 hover:text-blue-300">
            חזרה להתחברות
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            FIGHTERS BUILDERS
          </h1>
          <p className="text-white/40 text-sm mt-1">איפוס סיסמה</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0d0d18] p-6">
          <p className="text-sm text-white/50 mb-4 text-center">הכנס את כתובת האימייל שלך ונשלח לך קישור לאיפוס</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-white/60 mb-1.5">אימייל</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/[0.05] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 transition-all"
                placeholder="you@example.com" dir="ltr" />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className={cn("w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all bg-blue-600 hover:bg-blue-500 focus:outline-none", loading && "opacity-60 cursor-not-allowed")}>
              {loading ? "שולח..." : "שלח קישור לאיפוס"}
            </button>
          </form>

          <p className="text-center text-xs text-white/35 mt-4">
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">חזרה להתחברות</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
