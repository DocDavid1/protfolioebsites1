"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/login`,
      },
    });

    if (signUpError) {
      const msg = signUpError.message;
      if (msg.includes("already registered") || msg.includes("already been registered")) {
        setError("אימייל זה כבר רשום במערכת. נסה להתחבר.");
      } else if (msg.includes("rate limit") || msg.includes("too many")) {
        setError("יותר מדי ניסיונות. נסה שוב עוד מספר דקות.");
      } else if (msg.includes("valid email")) {
        setError("כתובת האימייל אינה תקינה.");
      } else {
        setError(`שגיאה ברישום: ${msg}`);
      }
      setLoading(false);
      return;
    }

    // If email confirmation is disabled, Supabase returns a session immediately
    if (data.session) {
      router.push("/");
      router.refresh();
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
            className="text-2xl font-bold text-white/90 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            נרשמת בהצלחה!
          </h2>
          <p className="text-sm text-white/40 mb-6">
            שלחנו לך אימייל אישור. בדוק את תיבת הדואר שלך.
          </p>
          <button
            onClick={() => router.push("/auth/login")}
            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            }}
          >
            חזור לכניסה
          </button>
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
            <UserPlus className="w-6 h-6 text-blue-400" />
          </div>
          <h1
            className="text-2xl font-bold text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            יצירת חשבון
          </h1>
          <p className="text-xs text-white/30">הצטרף ל-Fighters Builders</p>
        </div>

        <div className="p-6 rounded-xl border border-white/[0.07] bg-[#0d0d18]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                אימייל
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                placeholder="you@example.com"
                dir="ltr"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                סיסמה
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 pr-10 text-sm text-white/80 placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  placeholder="לפחות 6 תווים"
                  dir="ltr"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
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
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                אישור סיסמה
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
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
                  <Loader2 className="w-4 h-4 animate-spin" /> נרשם...
                </>
              ) : (
                "יצירת חשבון"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          כבר יש לך חשבון?{" "}
          <Link
            href="/auth/login"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            כניסה
          </Link>
        </p>
      </div>
    </div>
  );
}
