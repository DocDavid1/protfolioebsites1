"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";
  const resetSuccess = searchParams.get("reset") === "success";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdminFlow = redirectTo.startsWith("/admin");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("פרטי הכניסה שגויים. בדוק אימייל וסיסמה.");
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#05050b" }}>
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 border"
            style={
              isAdminFlow
                ? { background: "rgba(245,158,11,0.1)", borderColor: "rgba(245,158,11,0.2)" }
                : { background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.2)" }
            }
          >
            <Shield className="w-6 h-6" style={{ color: isAdminFlow ? "#fbbf24" : "#60a5fa" }} />
          </div>
          <h1
            className="text-2xl font-bold text-gray-900 dark:text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {isAdminFlow ? "ADMIN LOGIN" : "כניסה לחשבון"}
          </h1>
          <p className="text-xs text-gray-400 dark:text-white/30">
            {isAdminFlow ? "גישה מוגבלת לצוות בלבד" : "ברוכים השבים ל-Fighters Builders"}
          </p>
        </div>

        <div
          className="p-6 rounded-xl border bg-white dark:bg-[#0d0d18]"
          style={{ borderColor: isAdminFlow ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.07)" }}
        >
          {resetSuccess && (
            <p className="text-xs text-green-400 text-center mb-4 p-2 rounded-lg bg-green-400/10 border border-green-400/20">
              הסיסמה אופסה בהצלחה. התחבר עם הסיסמה החדשה.
            </p>
          )}

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
                className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 outline-none focus:ring-1 transition-all"
                style={
                  isAdminFlow
                    ? ({ "--tw-ring-color": "rgba(245,158,11,0.2)" } as React.CSSProperties)
                    : undefined
                }
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = isAdminFlow ? "rgba(245,158,11,0.4)" : "rgba(59,130,246,0.4)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
                placeholder="you@example.com"
                dir="ltr"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-wider">
                  סיסמה
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs transition-colors"
                  style={{ color: isAdminFlow ? "rgba(251,191,36,0.7)" : "rgba(96,165,250,0.7)" }}
                >
                  שכחתי סיסמה
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-800 dark:text-white/80 placeholder-gray-400 dark:placeholder-white/20 outline-none transition-all"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = isAdminFlow ? "rgba(245,158,11,0.4)" : "rgba(59,130,246,0.4)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  }}
                  placeholder="••••••••"
                  dir="ltr"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 hover:text-gray-600 dark:hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400/80 text-center p-2 rounded-lg bg-red-400/10 border border-red-400/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              style={
                isAdminFlow
                  ? { background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", boxShadow: "0 0 20px rgba(245,158,11,0.15)" }
                  : { background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", boxShadow: "0 0 20px rgba(59,130,246,0.15)" }
              }
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> מתחבר...</> : "כניסה"}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="mt-6 space-y-3 text-center">
          {!isAdminFlow && (
            <p className="text-xs text-gray-400 dark:text-white/30">
              אין לך חשבון?{" "}
              <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                הרשמה
              </Link>
            </p>
          )}
          <p className="text-xs text-gray-300 dark:text-white/20">
            <Link href="/" className="hover:text-gray-400 dark:hover:text-white/40 transition-colors">
              ← חזור לאתר
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#05050b" }}>
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
