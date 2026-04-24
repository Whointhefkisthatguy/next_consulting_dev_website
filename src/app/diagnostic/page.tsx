"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

function hostnameFrom(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] || "unknown-site";
  }
}

export default function Diagnostic() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const company = hostnameFrom(url);
    const name = email.split("@")[0] || "Diagnostic Requester";
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          service: "diagnostic",
          name,
          email,
          company,
          projectDescription: `Diagnostic request for ${url}`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[760px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Diagnostic · Free
        </span>
        <h1
          className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.02em]"
          style={{ color: "var(--cream)" }}
        >
          Get your System Score.
        </h1>
        <p
          className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          We audit your site across six vectors, speed, conversion, CRM
          connectivity, mobile behavior, stack bloat, and lead handoff , 
          and send you a human-written diagnostic inside 24 hours. No chatbot.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-12"
          style={{
            padding: "28px",
            border: "1px solid var(--divider-accent)",
            background: "var(--surface)",
          }}
        >
          <label
            htmlFor="d-url"
            className="block font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--copper)" }}
          >
            Your website
          </label>
          <input
            id="d-url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-site.com"
            className="w-full px-4 py-3 mb-6 font-[var(--font-body)] text-base"
            style={{
              background: "var(--void)",
              border: "1px solid var(--divider)",
              color: "var(--cream)",
            }}
          />
          <label
            htmlFor="d-email"
            className="block font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--copper)" }}
          >
            Email
          </label>
          <input
            id="d-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-3 mb-8 font-[var(--font-body)] text-base"
            style={{
              background: "var(--void)",
              border: "1px solid var(--divider)",
              color: "var(--cream)",
            }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase disabled:opacity-60"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            {status === "sending" ? "Sending…" : "Request the diagnostic"}
          </button>
          {status === "sent" && (
            <p
              className="mt-4 font-[var(--font-body)] text-sm"
              style={{ color: "var(--cream)" }}
            >
              Got it. We&rsquo;ll be in touch inside one business day.
            </p>
          )}
          {status === "error" && (
            <p
              className="mt-4 font-[var(--font-body)] text-sm"
              style={{ color: "#d28a8a" }}
            >
              Something broke. Email us directly at hi@nextconsulting.dev.
            </p>
          )}
        </form>

        <div className="mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
