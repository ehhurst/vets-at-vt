"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getRedirectPathForRole } from "@/lib/auth/redirects";

type Status = "idle" | "submitting" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginForm({
  onSuccessRedirectTo = "/",
}: {
  onSuccessRedirectTo?: string;
}) {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const emailError = useMemo(() => {
    if (!email) return null;
    if (!isValidEmail(email)) return "Please enter a valid email address.";
    return null;
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return null;
    if (password.length < 8) return "Password must be at least 8 characters.";
    return null;
  }, [password]);

  const canSubmit =
    email.trim().length > 0 &&
    password.length > 0 &&
    !emailError &&
    !passwordError &&
    status !== "submitting";

  async function redirectByRole(userId: string, fallbackPath = onSuccessRedirectTo) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      throw error;
    }

    window.location.assign(getRedirectPathForRole(data?.role) || fallbackPath);
  }

  async function handleGoogleLogin() {
    setStatus("submitting");
    setErrorMsg(null);

    try {
      const callbackUrl = new URL("/auth/callback", window.location.origin);
      callbackUrl.searchParams.set("next", onSuccessRedirectTo);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl.toString(),
        },
      });

      if (error) {
        setStatus("error");
        setErrorMsg(error.message || "Unable to sign in with Google right now.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("submitting");
    setErrorMsg(null);

    const cleanEmail = email.trim();

    if (!isValidEmail(cleanEmail)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setStatus("error");
        setErrorMsg(error.message || "Incorrect email or password.");
        return;
      }

      setStatus("success");
      if (!data.user) {
        throw new Error("Signed in successfully, but no user record was returned.");
      }

      await redirectByRole(data.user.id);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#14171a] px-4">
      <section
        className="mx-auto inline-block rounded-xl border border-white/10 bg-[#1a1e22] shadow-lg"
        aria-label="Login"
      >
        <form onSubmit={handleSubmit} className="w-[360px] sm:w-[420px]" noValidate>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-vt-bold text-white/95">Sign in</h2>
            <p className="mt-1 text-sm text-white/70">
              Use your email and password to access member features.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={[
                    "mt-1 w-full rounded-md border px-3 py-2",
                    "bg-[#20252a]",
                    "text-white/90",
                    "border-white/10",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange",
                    emailError ? "border-red-400 focus-visible:ring-red-400" : "",
                  ].join(" ")}
                  placeholder="you@vt.edu"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  required
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={[
                    "mt-1 w-full rounded-md border px-3 py-2",
                    "bg-[#20252a]",
                    "text-white/90",
                    "border-white/10",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange",
                    passwordError ? "border-red-400 focus-visible:ring-red-400" : "",
                  ].join(" ")}
                  placeholder="••••••••"
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                  required
                />
                {passwordError && (
                  <p id="password-error" className="mt-1 text-sm text-red-400" role="alert">
                    {passwordError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <a
                  href="/forgot-password"
                  className="text-sm font-semibold text-white/80 hover:text-vt-impactOrange hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
                >
                  Forgot password?
                </a>
              </div>

              {status === "error" && errorMsg && (
                <div
                  className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}

              {status === "success" && (
                <div
                  className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-200"
                  role="status"
                >
                  Signed in successfully. Redirecting…
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 px-6 pb-6 pt-4 sm:px-8 sm:pb-8">
            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full rounded-md bg-vt-impactOrange p-4 text-base font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg disabled:opacity-70"
            >
              {status === "submitting" ? "Signing in..." : "Sign in"}
            </button>

            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-white/40">
                Or
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={status === "submitting"}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-md border border-white/10 bg-[#20252a] px-4 py-3 text-sm font-semibold text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#252b31] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
                <path
                  fill="#4285F4"
                  d="M21.6 12.23c0-.68-.06-1.33-.17-1.95H12v3.69h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.75 2.97-4.32 2.97-7.26Z"
                />
                <path
                  fill="#34A853"
                  d="M12 22c2.7 0 4.96-.89 6.62-2.41l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.58A9.99 9.99 0 0 0 12 22Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.41 13.93A5.98 5.98 0 0 1 6.1 12c0-.67.11-1.31.31-1.93V7.49H3.06A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.06 4.51l3.35-2.58Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.95c1.47 0 2.8.51 3.84 1.5l2.88-2.88C16.95 2.93 14.7 2 12 2A9.99 9.99 0 0 0 3.06 7.49l3.35 2.58C7.2 7.71 9.4 5.95 12 5.95Z"
                />
              </svg>
              <span>
                {status === "submitting" ? "Connecting to Google..." : "Login with Google"}
              </span>
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
