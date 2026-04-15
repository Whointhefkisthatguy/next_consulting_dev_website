"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
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
      <section className="relative h-dvh min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(196,131,90,0.06) 0%, transparent 70%)",
          }}
        />

        {/* BG image — ultrawide, bottom-right */}
        <ParallaxImage
          src="/images/bg-leather.jpg"
          aspect="ultrawide"
          className="bottom-[10%] right-[-5%]"
          opacity={0.12}
        />

        {/* Content */}
        <div
          className="relative z-10 text-center px-6 transition-all duration-[1500ms] ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.95)",
          }}
        >
          <Monogram className="h-24 sm:h-32 md:h-36 w-auto text-[var(--cream)] mx-auto" />
          <p className="mt-8 font-[var(--font-display)] text-sm sm:text-base font-500 tracking-[0.2em] uppercase text-[var(--cream)]">
            Revenue Architecture &amp; Design
          </p>
          <p className="mt-4 font-[var(--font-body)] italic text-sm text-[var(--muted)] max-w-md mx-auto">
            &ldquo;There is surely nothing quite so useless as doing with great
            efficiency what should not be done at all.&rdquo;
            <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
              &mdash; Peter Drucker
            </span>
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-1000"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(16px)",
          }}
        >
          <span
            className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--muted)]"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--copper)] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ═══ */}
      <section className="relative py-32 px-6 sm:px-14 border-t border-[var(--divider)]">
        <ParallaxImage
          src="/images/bg-glass.jpg"
          aspect="tall"
          className="top-[10%] right-[15%] hidden md:block"
          opacity={0.1}
        />

        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.name}>
                <div className="reveal">
                  <span className="font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.15em] uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-2xl font-700 text-[var(--cream)]">
                    {service.name}
                  </h3>
                  <p className="mt-4 font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-6 text-[var(--copper)] font-[var(--font-body)] text-sm transition-colors duration-300 hover:text-[var(--copper-hover)]"
                  >
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
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
      <section className="relative py-32 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="reveal font-[var(--font-display)] font-700 text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--cream)]">
              The problem isn&rsquo;t scale,
              <br />
              it&rsquo;s <em className="italic text-[var(--copper)]">architecture</em>.
            </h2>
          </ScrollReveal>

          <div className="mt-16 space-y-8 max-w-[600px] mx-auto">
            {PROOF_POINTS.map((point, i) => (
              <ScrollReveal key={i}>
                <div className="reveal flex items-start gap-4 text-left">
                  <span className="shrink-0 font-[var(--font-display)] text-sm font-700 text-[var(--copper)]">
                    0{i + 1}
                  </span>
                  <p className="font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
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
