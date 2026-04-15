"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
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
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.55) saturate(0.6)" }}
          >
            <source src="/videos/hero-earth.mp4" type="video/mp4" />
          </video>
          {/* Dark mask overlay — lighter so video shows on mobile */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(7,7,8,0.35) 0%, rgba(7,7,8,0.1) 30%, rgba(7,7,8,0.25) 70%, rgba(7,7,8,0.85) 100%)",
            }}
          />
          {/* Left-side darken for text legibility — lighter on mobile */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(7,7,8,0.45) 0%, rgba(7,7,8,0.1) 50%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 sm:px-14">
          <div
            className="max-w-[720px] transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <img
              src="/brand/logo-white-transparent.png"
              alt="Next Consulting"
              className="mb-8 w-auto"
              style={{ height: "clamp(150px, 25vw, 280px)" }}
            />

            <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]" style={{ color: "#f0ebe3" }}>
              We build the systems
              <br />
              your revenue depends on.
            </h1>

            <p className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[560px]" style={{ color: "rgba(240,235,227,0.65)" }}>
              Websites that convert. Brands that command authority. Automation that compounds. Every engagement starts with a diagnostic &mdash; not a pitch.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="px-4 py-2 font-[var(--font-display)] text-xs font-500 tracking-[0.1em] uppercase transition-all duration-300"
                  style={{ border: "1px solid rgba(240,235,227,0.15)", color: "rgba(240,235,227,0.6)" }}
                >
                  {s.name}
                </Link>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ backgroundColor: "#c4835a", color: "#070708" }}
              >
                Book a Call
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="mailto:revops@nextconsulting.dev"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ border: "1px solid #c4835a", color: "#c4835a" }}
              >
                Email Us
              </a>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-1000 delay-1000"
          style={{ opacity: mounted ? 0.6 : 0 }}
        >
          <span
            className="text-[0.5rem] tracking-[0.25em] uppercase"
            style={{ writingMode: "vertical-rl", color: "#6b6560" }}
          >
            Scroll
          </span>
          <div className="w-px h-8 animate-pulse" style={{ background: "linear-gradient(to bottom, #c4835a, transparent)" }} />
        </div>
      </section>

      {/* ═══ QUOTE BREAK ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <blockquote className="font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed" style={{ color: "#f0ebe3", opacity: 0.6 }}>
            &ldquo;There is surely nothing quite so useless as doing with great efficiency what should not be done at all.&rdquo;
          </blockquote>
          <cite className="block mt-6 font-[var(--font-display)] not-italic text-xs font-500 tracking-[0.2em] uppercase" style={{ color: "#6b6560" }}>
            &mdash; Peter Drucker
          </cite>
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)", background: "#0a0a0c" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-[var(--font-display)] font-700 text-3xl sm:text-4xl mb-16" style={{ color: "#f0ebe3" }}>
            What We Build
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {SERVICES.map((service, i) => (
              <div key={service.name}>
                <span className="font-[var(--font-display)] text-xs tracking-[0.15em] uppercase font-600" style={{ color: "#c4835a" }}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl font-700" style={{ color: "#f0ebe3" }}>
                  {service.name}
                </h3>
                <p className="mt-4 font-[var(--font-body)] text-sm leading-relaxed" style={{ color: "rgba(240,235,227,0.5)" }}>
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 mt-6 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
                  style={{ color: "#c4835a" }}
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUE PROPOSITION ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-[var(--font-display)] font-700 text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em]" style={{ color: "#f0ebe3" }}>
            The problem isn&rsquo;t scale,
            <br />
            it&rsquo;s <em className="italic" style={{ color: "#c4835a" }}>architecture</em>.
          </h2>

          <div className="mt-16 space-y-8 max-w-[600px] mx-auto">
            {PROOF_POINTS.map((point, i) => (
              <div key={i} className="flex items-start gap-4 text-left">
                <span className="shrink-0 font-[var(--font-display)] text-sm font-700" style={{ color: "#c4835a" }}>
                  0{i + 1}
                </span>
                <p className="font-[var(--font-body)] text-sm leading-relaxed" style={{ color: "#8a8480" }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <CTABlock />
    </>
  );
}
