"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import Monogram from "@/components/Monogram";
import Link from "next/link";

const SERVICES = [
  {
    name: "Websites",
    href: "/websites",
    description:
      "Revenue-generating systems engineered for conversion, built to last.",
  },
  {
    name: "Graphic Design",
    href: "/graphic-design",
    description:
      "Brand identity that communicates authority before a word is read.",
  },
  {
    name: "Automation",
    href: "/automation",
    description:
      "Intelligent automation that removes the manual and scales the system.",
  },
];

const PROOF_POINTS = [
  "We audit before we build. Every engagement starts with a diagnostic.",
  "We frame every deliverable through client experience and revenue impact.",
  "We don\u2019t fill portfolios. We move needles.",
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative h-dvh min-h-[800px] flex flex-col justify-center overflow-hidden">
        {/* Full-bleed background image */}
        <div className="absolute inset-0">
          <img
            src="/images/bg-leather.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.3) saturate(0.4)" }}
          />
          {/* Gradient overlay — dark at bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(7,7,8,0.5) 0%, rgba(7,7,8,0.3) 40%, rgba(7,7,8,0.7) 80%, rgba(7,7,8,0.95) 100%)",
            }}
          />
          {/* Warm accent glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 30% 60%, rgba(196,131,90,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content — left-aligned, packed with info */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 sm:px-14">
          <div
            className="max-w-[720px] transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="overflow-hidden mb-8" style={{ height: "clamp(40px, 6vw, 70px)" }}>
              <img
                src="/brand/logo-white-transparent.png"
                alt="Next"
                className="w-auto object-left-top"
                style={{ height: "clamp(75px, 11vw, 130px)", marginLeft: "-2%" }}
              />
            </div>

            <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-cream">
              We build the systems
              <br />
              your revenue depends on.
            </h1>

            <p className="mt-6 font-[var(--font-body)] text-base sm:text-lg text-cream/70 leading-relaxed max-w-[560px]">
              Websites that convert. Brands that command authority. Automation that compounds. Every engagement starts with a diagnostic &mdash; not a pitch.
            </p>

            {/* Services inline */}
            <div className="mt-10 flex flex-wrap gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="px-4 py-2 border border-cream/15 text-cream/60 font-[var(--font-display)] text-xs font-500 tracking-[0.1em] uppercase transition-all duration-300 hover:border-copper hover:text-copper"
                >
                  {s.name}
                </Link>
              ))}
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-copper text-void font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-copper-hover"
              >
                Book a Call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="mailto:revops@nextconsulting.dev"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-copper text-copper font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-copper hover:text-void"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000"
          style={{ opacity: mounted ? 0.6 : 0 }}
        >
          <span
            className="text-[0.5rem] tracking-[0.25em] uppercase text-muted"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-copper to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══ QUOTE BREAK ═══ */}
      <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[800px] mx-auto text-center">
          <ScrollReveal>
            <blockquote className="reveal font-[var(--font-body)] italic text-lg sm:text-xl text-cream/60 leading-relaxed">
              &ldquo;There is surely nothing quite so useless as doing with great efficiency what should not be done at all.&rdquo;
            </blockquote>
            <cite className="reveal block mt-6 font-[var(--font-display)] not-italic text-xs font-500 tracking-[0.2em] uppercase text-muted">
              &mdash; Peter Drucker
            </cite>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ═══ */}
      <section className="relative py-28 px-6 sm:px-14 border-t border-[var(--divider)]">
        {/* Full-width BG image strip */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/bg-glass.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.15) saturate(0.3)", opacity: 0.4 }}
          />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto">
          <ScrollReveal>
            <h2 className="reveal font-[var(--font-display)] font-700 text-3xl sm:text-4xl text-cream mb-16">
              What We Build
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.name}>
                <div className="reveal">
                  <span className="font-[var(--font-display)] text-xs text-copper tracking-[0.15em] uppercase font-600">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-2xl font-700 text-cream">
                    {service.name}
                  </h3>
                  <p className="mt-4 font-[var(--font-body)] text-sm text-cream/50 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-6 text-copper font-[var(--font-body)] text-sm transition-colors duration-300 hover:text-copper-hover"
                  >
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUE PROPOSITION ═══ */}
      <section className="relative py-28 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="reveal font-[var(--font-display)] font-700 text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-cream">
              The problem isn&rsquo;t scale,
              <br />
              it&rsquo;s <em className="italic text-copper">architecture</em>.
            </h2>
          </ScrollReveal>

          <div className="mt-16 space-y-8 max-w-[600px] mx-auto">
            {PROOF_POINTS.map((point, i) => (
              <ScrollReveal key={i}>
                <div className="reveal flex items-start gap-4 text-left">
                  <span className="shrink-0 font-[var(--font-display)] text-sm font-700 text-copper">
                    0{i + 1}
                  </span>
                  <p className="font-[var(--font-body)] text-sm text-muted leading-relaxed">
                    {point}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <CTABlock />
    </>
  );
}
