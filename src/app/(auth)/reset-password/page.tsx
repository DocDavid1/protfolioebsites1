"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Supabase sends the session in the URL hash on password reset
  useEffect(() => {
    const supabase = createClient();

    // Listen for the PASSWORD_RECOVERY event from the URL hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("הסיסמאות אינן תואמות.");
      return;
    }
    if (password.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (updateError) {
      setError("שגיאה בעדכון הסיסמה. נסה שוב.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">הסיסמה עודכנה!</h2>
          <p className="text-white/50 text-sm">מעביר אותך להתחברות...</p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-8 h-8 border-2 border-blue-500/40 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/40 text-sm">מאמת את הקישור...</p>
          <p className="text-white/25 text-xs mt-2">אם הדף נטען ישירות, חזור לאימייל ולחץ שוב על הקישור.</p>
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
          <p className="text-white/40 text-sm mt-1">הגדרת סיסמה חדשה</p>
        </div>

        <div className="rounded-xl border border-white/[0.08] bg-[#0d0d18] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-white/60 mb-1.5">סיסמה חדשה</label>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-white/[0.05] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 transition-all"
                placeholder="לפחות 6 תווים" dir="ltr" />
            </div>
            <div>
              <label htmlFor="confirm" className="block text-xs font-medium text-white/60 mb-1.5">אימות סיסמה</label>
              <input id="confirm" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-lg bg-white/[0.05] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-blue-500/60 transition-all"
                placeholder="••••••••" dir="ltr" />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className={cn("btn-primary w-full", loading && "opacity-60 cursor-not-allowed")}>
              {loading ? "מעדכן..." : "עדכן סיסמה"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
