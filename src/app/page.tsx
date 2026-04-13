"use client";

import { useState, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── N> Icon Mark ── */
function Monogram({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 215.1 94.2"
      fill="currentColor"
      role="img"
      aria-label="Next Consulting"
      className={className}
    >
      <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
      <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
    </svg>
  );
}

/* ── Inquiry Form ── */
function InquiryForm() {
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

  if (status === "sent") {
    return (
      <p className="font-display text-2xl italic text-text-secondary tracking-wide">
        Received. We&rsquo;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
      {[
        { name: "name", placeholder: "Name", type: "text" },
        { name: "company", placeholder: "Company", type: "text" },
      ].map((field) => (
        <div key={field.name} className="group relative">
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            required
            className="w-full bg-transparent border-0 border-b border-text-faint/60 pb-3 pt-1 text-text-primary font-body text-sm tracking-wider placeholder:text-text-muted/50 placeholder:uppercase placeholder:text-xs placeholder:tracking-[0.2em] focus:outline-none focus:border-amber/40 transition-colors duration-500"
          />
          <div className="absolute bottom-0 left-0 h-px w-0 bg-amber/50 transition-all duration-500 group-focus-within:w-full" />
        </div>
      ))}
      <div className="group relative">
        <textarea
          name="problem"
          placeholder="What problem are you solving?"
          required
          rows={2}
          className="w-full bg-transparent border-0 border-b border-text-faint/60 pb-3 pt-1 text-text-primary font-body text-sm tracking-wider resize-none placeholder:text-text-muted/50 placeholder:uppercase placeholder:text-xs placeholder:tracking-[0.2em] focus:outline-none focus:border-amber/40 transition-colors duration-500"
        />
        <div className="absolute bottom-0 left-0 h-px w-0 bg-amber/50 transition-all duration-500 group-focus-within:w-full" />
      </div>
      <div className="pt-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group relative uppercase text-[11px] tracking-[0.3em] text-text-muted font-body font-light transition-colors duration-300 hover:text-amber disabled:opacity-40"
        >
          {status === "sending" ? "Sending\u2026" : "Request a conversation"}
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-amber/40 transition-all duration-500 group-hover:w-full" />
        </button>
      </div>
      {status === "error" && (
        <p className="text-burnt text-xs tracking-wider">Something went wrong. Try again.</p>
      )}
    </form>
  );
}

/* ── Truths Data ── */
const truths = [
  {
    statement: "Best in class is just the tallest person in a short room.",
    accent: "tallest",
    metric: "92% of companies benchmarking against industry averages are optimizing the wrong targets.",
  },
  {
    statement: "Your funnel isn\u2019t leaking. It was never built to hold.",
    accent: "never",
    metric: "For every dollar spent acquiring customers, 58 cents compensates for process failures downstream.",
  },
  {
    statement: "The revenue you report isn\u2019t the revenue you\u2019re missing.",
    accent: "missing",
    metric: "Most organizations don\u2019t have a revenue problem. They have 30 process problems wearing a revenue mask.",
  },
];

function highlightWord(text: string, word: string) {
  const idx = text.toLowerCase().indexOf(word.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-amber">{text.slice(idx, idx + word.length)}</span>
      {text.slice(idx + word.length)}
    </>
  );
}

/* ── Page ── */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const lineOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  return (
    <main className="relative">

      {/* ── Vertical accent line (left gutter) ── */}
      <motion.div
        style={{ opacity: lineOpacity }}
        className="fixed left-[clamp(1.5rem,4vw,4rem)] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber/15 to-transparent z-10 pointer-events-none"
      />

      {/* ══════════════════════════════════════════
          HERO — Monogram + ambient glow
      ══════════════════════════════════════════ */}
      <section className="relative flex h-dvh items-center justify-center overflow-hidden">
        {/* Ambient glow behind monogram */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[500px] h-[500px] rounded-full animate-breathe"
            style={{
              background: "radial-gradient(circle, rgba(201,150,63,0.07) 0%, rgba(201,150,63,0.02) 40%, transparent 70%)",
            }}
          />
        </div>

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-amber"
        >
          <Monogram className="h-28 w-auto sm:h-36 md:h-44" />
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════
          CONTENT — One continuous flow
      ══════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-2xl px-6 sm:px-8">

        {/* ── Thin gold rule ── */}
        <div className="flex justify-center pb-24">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-16 bg-amber/30 origin-center"
          />
        </div>

        {/* ── Drucker Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote className="text-center">
            <p className="font-display text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.3] font-light italic text-text-primary/90 tracking-wide">
              &ldquo;There is surely nothing quite so useless as doing with great
              efficiency what should not be done at all.&rdquo;
            </p>
            <footer className="mt-8">
              <cite className="not-italic font-body text-[11px] uppercase tracking-[0.25em] text-text-muted">
                Peter Drucker <span className="text-amber/40">/</span> 1963
              </cite>
            </footer>
          </blockquote>
        </motion.div>

        {/* ── H1 Transition ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="py-32 sm:py-40 text-center"
        >
          <h1 className="font-display text-[clamp(1.3rem,3vw,2.4rem)] font-light tracking-wide text-text-primary">
            The problem isn&rsquo;t scale<span className="text-amber">,</span>
            <br className="hidden sm:block" />
            {" "}it&rsquo;s architecture<span className="text-amber">.</span>
          </h1>
        </motion.div>

        {/* ── Truths ── */}
        <div className="space-y-20 sm:space-y-28">
          {truths.map((truth, i) => (
            <motion.div
              key={truth.accent}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Subtle number */}
              <span className="absolute -left-2 sm:-left-10 -top-2 font-display text-6xl sm:text-7xl font-light text-text-faint/30 select-none pointer-events-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-[clamp(1.2rem,2.5vw,2rem)] leading-[1.4] font-light tracking-wide text-text-primary/85">
                {highlightWord(truth.statement, truth.accent)}
              </p>
              <p className="mt-5 font-body text-[13px] leading-relaxed text-text-secondary/70 max-w-lg">
                {truth.metric}
              </p>
              {/* Divider */}
              {i < truths.length - 1 && (
                <div className="mt-20 sm:mt-28 flex items-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-hover to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Inquiry ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="pt-40 sm:pt-52 pb-32"
        >
          <div className="flex justify-center mb-20">
            <div className="h-px w-16 bg-amber/20" />
          </div>

          <p className="font-display text-[clamp(1.3rem,2.5vw,2rem)] font-light italic text-center text-text-primary/80 tracking-wide mb-16">
            If this resonates<span className="text-amber">,</span> we should talk<span className="text-amber">.</span>
          </p>

          <div className="flex justify-center">
            <InquiryForm />
          </div>
        </motion.div>

        {/* ── Footer whisper ── */}
        <div className="border-t border-text-faint/10 py-12 text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-text-muted/40">
            Next Consulting
          </p>
        </div>
      </div>
    </main>
  );
}
