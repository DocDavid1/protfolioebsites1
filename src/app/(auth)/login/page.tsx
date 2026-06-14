"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError("פרטי הכניסה שגויים. אנא נסה שוב.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            FIGHTERS BUILDERS
          </h1>
          <p className="text-gray-400 dark:text-white/40 text-sm mt-1">כניסה לחשבון</p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#0d0d18] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-600 dark:text-white/60 mb-1.5">
                אימייל
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-gray-100/80 dark:bg-white/[0.05] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 focus:bg-gray-100 dark:bg-white/[0.07] transition-all"
                placeholder="you@example.com"
                dir="ltr"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-medium text-gray-600 dark:text-white/60">
                  סיסמה
                </label>
                <Link href="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                  שכחתי סיסמה
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-gray-100/80 dark:bg-white/[0.05] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 focus:bg-gray-100 dark:bg-white/[0.07] transition-all"
                placeholder="••••••••"
                dir="ltr"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "btn-primary w-full",
                loading && "opacity-60 cursor-not-allowed"
              )}
            >
              {loading ? "מתחבר..." : "כניסה"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 dark:text-white/35 mt-4">
            אין לך חשבון?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              הרשמה
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
