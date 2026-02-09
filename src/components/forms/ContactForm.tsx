"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg(null);

    // Basic client-side validation
    if (!userEmail.trim() || !userMessage.trim()) {
      setStatus("error");
      setErrorMsg("Please include your email and a message.");
      return;
    }

    try {
      // TODO: replace with your real endpoint
      // await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, userEmail, userMessage }) });

      // Simulate success for now
      await new Promise((r) => setTimeout(r, 400));

      setStatus("sent");
      setName("");
      setUserEmail("");
      setUserMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  return (


    <form onSubmit={handleSubmit} className="space-y-4 text-white/90">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white/80">
          Name
        </label>
        <input
          id="name"
          className="mt-1 w-full rounded-md border border-white/10 bg-[#20252a] px-3 py-2 text-white/90 placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>

      <div>
        <label htmlFor="userEmail" className="block text-sm font-medium text-white/80">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="userEmail"
          type="email"
          className="mt-1 w-full rounded-md border border-white/10 bg-[#20252a] px-3 py-2 text-white/90 placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="userMessage" className="block text-sm font-medium text-white/80">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="userMessage"
          rows={6}
          className="mt-1 w-full rounded-md border border-white/10 bg-[#20252a] px-3 py-2 text-white/90 placeholder:text-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-vt-impactOrange"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Enter your message here..."
          required
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {status === "sent" && (
        <p className="text-sm text-green-400">Message sent — thank you!</p>
      )}

      {/* Divider */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-md bg-vt-impactOrange py-3 font-semibold text-white ring-2 ring-inset ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-lg disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Submit"}
        </button>
      </div>
    </form>



  );
}
