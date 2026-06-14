"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
      }
    );

    if (resetError) {
      const msg = resetError.message;
      if (msg.includes("rate limit") || msg.includes("too many")) {
        setError("יותר מדי ניסיונות. נסה שוב עוד כמה דקות.");
      } else if (msg.includes("not authorized") || msg.includes("redirect")) {
        setError("שגיאת הגדרות. פנה לתמיכה.");
      } else {
        setError(`שגיאה: ${msg}`);
      }
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#05050b" }}
      >
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2
            className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            אימייל נשלח!
          </h2>
          <p className="text-sm text-gray-400 dark:text-white/40 mb-2">
            שלחנו קישור לאיפוס סיסמה לכתובת:
          </p>
          <p className="text-sm text-blue-400 mb-6 font-mono">{email}</p>
          <p className="text-xs text-gray-300 dark:text-white/25 mb-6">
            בדוק גם את תיקיית הספאם אם לא קיבלת.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 dark:text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            חזור לכניסה
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#05050b" }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            שכחתי סיסמה
          </h1>
          <p className="text-xs text-gray-400 dark:text-white/30">
            נשלח לך קישור לאיפוס סיסמה
          </p>
        </div>

        <div className="p-6 rounded-xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#0d0d18]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                אימייל
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="you@example.com"
                dir="ltr"
                autoComplete="email"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400/80 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={{
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                boxShadow: "0 0 20px rgba(59,130,246,0.15)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> שולח...
                </>
              ) : (
                "שלח קישור לאיפוס"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-white/30 mt-6">
          <Link
            href="/auth/login"
            className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
          >
            <ArrowRight className="w-3 h-3 rotate-180" />
            חזור לכניסה
          </Link>
        </p>
      </div>
    </div>
  );
}
