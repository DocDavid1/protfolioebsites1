"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/admin/projects";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("פרטי הכניסה שגויים.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  };

  return (
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
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white/80 placeholder-white/20 outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all"
            placeholder="admin@example.com"
            dir="ltr"
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
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-2.5 pr-10 text-sm text-white/80 placeholder-white/20 outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all"
              placeholder="••••••••"
              dir="ltr"
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

        {error && (
          <p className="text-xs text-red-400/80 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            boxShadow: "0 0 20px rgba(245,158,11,0.15)",
          }}
        >
          {loading ? "מתחבר..." : "כניסה"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#05050b" }}
    >
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <h1
            className="text-2xl font-bold text-white/90 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ADMIN LOGIN
          </h1>
          <p className="text-xs text-white/30">גישה מוגבלת לצוות בלבד</p>
        </div>

        <Suspense fallback={<div className="p-6 rounded-xl border border-white/[0.07] bg-[#0d0d18] h-48" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
