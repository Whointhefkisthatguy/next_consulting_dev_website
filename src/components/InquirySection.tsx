"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function InquirySection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      problem: (form.elements.namedItem("problem") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <ScrollReveal>
          <p className="mb-16 text-center font-display text-xl tracking-tight text-text-primary sm:text-2xl">
            If this resonates<span className="text-amber">,</span> we should talk<span className="text-amber">.</span>
          </p>
        </ScrollReveal>
        {status === "sent" ? (
          <ScrollReveal>
            <p className="text-center text-text-muted">Received. We&apos;ll be in touch.</p>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.3}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder:text-text-faint focus:border-amber focus:outline-none transition-colors"
              />
              <input
                name="company"
                type="text"
                placeholder="Company"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder:text-text-faint focus:border-amber focus:outline-none transition-colors"
              />
              <textarea
                name="problem"
                placeholder="What problem are you solving?"
                required
                rows={3}
                className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder:text-text-faint focus:border-amber focus:outline-none transition-colors"
              />
              <div className="pt-8 text-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="text-sm tracking-widest text-text-muted uppercase transition-colors hover:text-amber disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Request a conversation"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-center text-sm text-burnt-orange">Something went wrong. Try again.</p>
              )}
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
