"use client";

import Link from "next/link";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function MemberLoginForm() {
  const [memberPassword, setMemberPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSubmit = memberPassword.trim().length > 0 && status !== "submitting";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("submitting");
    setErrorMsg(null);

    try {
      const response = await fetch("/api/member-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: memberPassword }),
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        redirectTo?: string;
      };

      if (!response.ok || !payload.ok || !payload.redirectTo) {
        setStatus("error");
        setErrorMsg(payload.error || "Unable to sign in with the member password.");
        return;
      }

      setStatus("success");
      window.location.assign(payload.redirectTo);
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
        aria-label="Member Login"
      >
        <form onSubmit={handleSubmit} className="w-[360px] sm:w-[420px] p-6 sm:p-8" noValidate>
          <h2 className="text-2xl font-vt-bold text-white/95">Member Login</h2>
          <p className="mt-1 text-sm text-white/70">
            Enter the shared member password to access the members-only calendar.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="member-password" className="block text-sm font-medium text-white/80">
                Member password
              </label>
              <input
                id="member-password"
                name="member-password"
                type="password"
                autoComplete="current-password"
                value={memberPassword}
                onChange={(e) => setMemberPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-[#20252a] px-3 py-2 text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
                placeholder="Enter shared password"
                required
              />
            </div>

            {status === "error" && errorMsg ? (
              <div
                className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200"
                role="alert"
              >
                {errorMsg}
              </div>
            ) : null}

            {status === "success" ? (
              <div
                className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-200"
                role="status"
              >
                Signed in successfully. Redirecting…
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-6 w-full rounded-md bg-vt-impactOrange p-4 text-base font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg disabled:opacity-70"
          >
            {status === "submitting" ? "Signing in..." : "Enter member area"}
          </button>

          <p className="mt-6 text-center text-sm text-white/70">
            Are you an admin?{" "}
            <Link
              href="/admin-login"
              className="font-semibold text-vt-impactOrange underline-offset-2 hover:underline"
            >
              Go to admin login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
