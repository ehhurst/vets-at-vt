"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Status = "idle" | "submitting" | "success" | "error";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginForm({
  onSuccessRedirectTo = "/",
}: {
  onSuccessRedirectTo?: string;
}) {
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
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setStatus("error");
        setErrorMsg("Incorrect email or password.");
        return;
      }

      setStatus("success");
      window.location.assign(onSuccessRedirectTo);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-900 px-4">

    <section
      className="mx-auto inline-block rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-gray-900"
      aria-label="Login"
    >
      <form onSubmit={handleSubmit} className="w-[360px] sm:w-[420px]" noValidate>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-vt-bold text-gray-800 dark:text-gray-100">
            Sign in
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Use your email and password to access member features.
          </p>

          <div className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 dark:text-gray-100">
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
                  "bg-white dark:bg-gray-900",
                  "text-gray-900 dark:text-gray-100",
                  "border-gray-300 dark:border-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
                  emailError ? "border-red-400 focus-visible:ring-red-400" : "",
                ].join(" ")}
                placeholder="you@vt.edu"
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "email-error" : undefined}
                required
              />
              {emailError && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {emailError}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 dark:text-gray-100">
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
                  "bg-white dark:bg-gray-900",
                  "text-gray-900 dark:text-gray-100",
                  "border-gray-300 dark:border-white/10",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
                  passwordError ? "border-red-400 focus-visible:ring-red-400" : "",
                ].join(" ")}
                placeholder="••••••••"
                aria-invalid={!!passwordError}
                aria-describedby={passwordError ? "password-error" : undefined}
                required
              />
              {passwordError && (
                <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3">
              <a
                href="/forgot-password"
                className="text-sm font-semibold text-vt-impactOrange hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-maroon focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
              >
                Forgot password?
              </a>
            </div>

            {status === "error" && errorMsg && (
              <div
                className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200"
                role="alert"
              >
                {errorMsg}
              </div>
            )}

            {status === "success" && (
              <div
                className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-200"
                role="status"
              >
                Signed in successfully. Redirecting…
              </div>
            )}
          </div>
        </div>

        {/* Full-width footer submit button */}
        <div className="border-t border-gray-200 dark:border-white/10">
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-b-xl bg-vt-impactOrange p-4 text-base font-semibold text-white hover:bg-vt-maroon hover:cursor-pointer"
          >
            {status === "submitting" ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </section>
    </main>
  );
}
