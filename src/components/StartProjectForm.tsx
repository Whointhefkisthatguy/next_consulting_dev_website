"use client";

import { useState } from "react";
import type { ServiceSlug } from "@/content/squeeze/types";

type Props = {
  service: ServiceSlug;
  submitLabel?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full bg-transparent py-3 px-2 font-[var(--font-body)] text-sm outline-none transition-colors duration-300";

const inputStyle: React.CSSProperties = {
  color: "#f0ebe3",
  borderBottom: "1px solid rgba(240,235,227,0.2)",
  background: "rgba(240,235,227,0.03)",
};

const labelClass =
  "block font-[var(--font-body)] text-xs tracking-[0.1em] uppercase mb-2";

const labelStyle: React.CSSProperties = { color: "#6b6560" };

export default function StartProjectForm({
  service,
  submitLabel = "Start the project",
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim() || undefined,
      company: String(fd.get("company") ?? "").trim(),
      projectDescription: String(fd.get("projectDescription") ?? "").trim(),
      service,
    };

    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="p-10 md:p-12 text-center"
        style={{
          border: "1px solid rgba(196,131,90,0.35)",
          background: "linear-gradient(180deg, rgba(196,131,90,0.06), rgba(196,131,90,0) 80%)",
        }}
      >
        <div className="text-xs tracking-[0.2em] uppercase text-[#c4835a] font-[var(--font-body)]">
          Received
        </div>
        <p className="mt-5 font-[var(--font-display)] text-[clamp(1.35rem,2.4vw,1.8rem)] leading-[1.3] text-[#f0ebe3]">
          Thanks. We&rsquo;ll reach out within one business day with next steps.
        </p>
        <p className="mt-4 font-[var(--font-body)] text-sm text-[#8a8480] max-w-md mx-auto">
          Keep an eye on your inbox (and phone if you left a number). If it&rsquo;s urgent, email{" "}
          <a href="mailto:nextconsulting.ai@gmail.com" className="text-[#c4835a] hover:text-[#d4935a]">
            nextconsulting.ai@gmail.com
          </a>
          .
        </p>
      </div>
    );
  }

  const disabled = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <input type="hidden" name="service" value={service} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sp-name" className={labelClass} style={labelStyle}>
            Name
          </label>
          <input
            id="sp-name"
            type="text"
            name="name"
            required
            maxLength={200}
            disabled={disabled}
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c4835a")}
            onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.2)")}
          />
        </div>
        <div>
          <label htmlFor="sp-email" className={labelClass} style={labelStyle}>
            Email
          </label>
          <input
            id="sp-email"
            type="email"
            name="email"
            required
            maxLength={200}
            disabled={disabled}
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c4835a")}
            onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.2)")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sp-phone" className={labelClass} style={labelStyle}>
            Phone <span className="text-[#6b6560] normal-case tracking-normal">(optional, for SMS updates)</span>
          </label>
          <input
            id="sp-phone"
            type="tel"
            name="phone"
            maxLength={40}
            disabled={disabled}
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c4835a")}
            onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.2)")}
          />
        </div>
        <div>
          <label htmlFor="sp-company" className={labelClass} style={labelStyle}>
            Company
          </label>
          <input
            id="sp-company"
            type="text"
            name="company"
            required
            maxLength={200}
            disabled={disabled}
            className={inputClass}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c4835a")}
            onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.2)")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sp-project" className={labelClass} style={labelStyle}>
          Tell us about your project
        </label>
        <textarea
          id="sp-project"
          name="projectDescription"
          rows={5}
          required
          maxLength={2000}
          disabled={disabled}
          placeholder="What are you trying to build, fix, or automate? What&rsquo;s in the way?"
          className={`${inputClass} resize-none`}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderBottomColor = "#c4835a")}
          onBlur={(e) => (e.currentTarget.style.borderBottomColor = "rgba(240,235,227,0.2)")}
        />
      </div>

      {error && (
        <p className="font-[var(--font-body)] text-sm text-[#d97757]">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#c4835a", color: "#070708" }}
        >
          {disabled ? "Sending…" : submitLabel}
          {!disabled && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
        <p className="font-[var(--font-body)] text-xs text-[#6b6560]">
          We&rsquo;ll reach out within one business day via email or SMS.
        </p>
      </div>
    </form>
  );
}
