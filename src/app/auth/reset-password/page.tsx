"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    // The /auth/callback route already exchanged the code server-side.
    // We just need to confirm there's an active session.
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setValidToken(!!session);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }
    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError("שגיאה בעדכון הסיסמה. נסה לבקש קישור חדש.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/auth/login?reset=success"), 2000);
  };

  if (validToken === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#05050b" }}
      >
        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (validToken === false) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#05050b" }}
      >
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h2
            className="text-xl font-bold text-gray-900 dark:text-white/90 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הקישור פג תוקף
          </h2>
          <p className="text-sm text-gray-400 dark:text-white/40 mb-6">
            הקישור לאיפוס הסיסמה אינו תקף או שפג תוקפו.
          </p>
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            בקש קישור חדש
          </button>
        </div>
      </div>
    );
  }

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
            הסיסמה עודכנה!
          </h2>
          <p className="text-sm text-gray-400 dark:text-white/40">
            מעביר אותך לדף הכניסה...
          </p>
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
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            הגדרת סיסמה חדשה
          </h1>
          <p className="text-xs text-gray-400 dark:text-white/30">
            בחר סיסמה חזקה לחשבון שלך
          </p>
        </div>

        <div className="p-6 rounded-xl border border-gray-200 dark:border-white/[0.07] bg-white dark:bg-[#0d0d18]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                סיסמה חדשה
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="לפחות 6 תווים"
                  dir="ltr"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider mb-2">
                אישור סיסמה
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="חזור על הסיסמה"
                dir="ltr"
                autoComplete="new-password"
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
                  <Loader2 className="w-4 h-4 animate-spin" /> מעדכן...
                </>
              ) : (
                "שמור סיסמה חדשה"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "#05050b" }}
        >
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
