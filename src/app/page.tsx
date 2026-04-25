"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryClaim from "@/components/home/CategoryClaim";
import PricingLadder from "@/components/home/PricingLadder";

type PhaseCard = {
  n: "01" | "02" | "03";
  name: "Foundation" | "Automation" | "Scale";
  oneLiner: string;
  href: string;
};

const PHASES: PhaseCard[] = [
  {
    n: "01",
    name: "Foundation",
    oneLiner: "Website + brand. Credibility in the first 50 milliseconds.",
    href: "/websites",
  },
  {
    n: "02",
    name: "Automation",
    oneLiner: "Lead capture to paid invoice, without babysitting.",
    href: "/automation",
  },
  {
    n: "03",
    name: "Scale",
    oneLiner: "Ongoing iteration, new channels, honest reporting.",
    href: "/scale",
  },
];

type Door = {
  kicker: string;
  title: string;
  body: string;
  href: string;
};

const DOORS: Door[] = [
  {
    kicker: "Door 01 · Read",
    title: "Read the Manifesto",
    body: "Why the Marketing-Industrial Complex exists, what it costs you, and why transparency is the only way out.",
    href: "/manifesto",
  },
  {
    kicker: "Door 02 · Get Scored",
    title: "Run the Diagnostic",
    body: "A human-written System Score across all five layers, sent inside 24 hours. No chatbot.",
    href: "/diagnostic",
  },
  {
    kicker: "Door 03 · Pay the Crowd",
    title: "Enter the Arena",
    body: "Don’t believe us. Post a brief, let real builders fight tournament-style for your business, pick the winner.",
    href: "/arena",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ═══ 1. HERO · Character + Problem (plan preview inline) ═══ */}
      <section className="relative h-dvh min-h-[760px] flex flex-col justify-center overflow-hidden">
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
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(7,7,8,0.35) 0%, rgba(7,7,8,0.1) 30%, rgba(7,7,8,0.25) 70%, rgba(7,7,8,0.85) 100%)",
            }}
          />
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
            className="max-w-[760px] transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <span
              className="block font-[var(--font-display)] text-[11px] font-600 tracking-[0.3em] uppercase mb-5"
              style={{ color: "#c4835a" }}
            >
              The Art of Engineered Profitability
            </span>

            <h1
              className="font-[var(--font-display)] font-800 text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
              style={{ color: "#f0ebe3" }}
            >
              Your revenue has a ceiling.
              <br />
              <span style={{ color: "rgba(240,235,227,0.45)" }}>
                It&rsquo;s not the market.
              </span>
              <br />
              It&rsquo;s the{" "}
              <em className="italic" style={{ color: "#c4835a" }}>system</em>.
            </h1>

            <p
              className="mt-7 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[560px]"
              style={{ color: "rgba(240,235,227,0.65)" }}
            >
              Your website, your brand, your lead flow, your reporting. Five
              layers that leak at the seams because you rented them from
              five different vendors. We install the whole stack as one owned
              system, in three phases, with the price tag on the door.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
                style={{ backgroundColor: "#c4835a", color: "#070708" }}
              >
                Start a project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/diagnostic"
                className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
                style={{ color: "#c4835a" }}
              >
                Get your System Score
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Plan-preview chip row: the SB7 Plan beat, visible above the fold */}
            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
              {PHASES.map((phase, i) => (
                <div key={phase.n} className="flex items-center gap-3">
                  <Link
                    href={phase.href}
                    className="font-[var(--font-display)] text-[11px] font-600 tracking-[0.2em] uppercase transition-colors hover:text-[var(--cream)]"
                    style={{ color: "rgba(240,235,227,0.7)" }}
                  >
                    <span style={{ color: "#c4835a" }}>{phase.n}</span>{" "}
                    {phase.name}
                  </Link>
                  {i < PHASES.length - 1 && (
                    <span
                      className="font-[var(--font-display)] text-xs"
                      style={{ color: "rgba(240,235,227,0.3)" }}
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
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

      {/* ═══ 1.5. FEATURED INSIGHT · INSIGHT 01 release strip ═══ */}
      <section
        className="relative px-6 sm:px-14 py-20 overflow-hidden"
        style={{
          borderTop: "1px solid var(--divider)",
          borderBottom: "1px solid var(--divider)",
          background:
            "linear-gradient(180deg, #0a0a0c 0%, var(--surface) 100%)",
        }}
      >
        {/* Faint grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(196,131,90,1) 1px, transparent 1px), linear-gradient(90deg, rgba(196,131,90,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, transparent 80%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.35em] uppercase mb-12">
            <span style={{ color: "var(--copper)" }}>
              Just Published · April 2026
            </span>
            <span style={{ color: "rgba(240,235,227,0.5)" }}>
              Plate 00 · Volume I
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[160px_1fr_auto] gap-10 lg:gap-14 items-center">
            {/* Volume number */}
            <Link
              href="/insights/01-recursive-business-management-system"
              className="group block"
              aria-label="Read Insight 01"
            >
              <div className="font-[var(--font-display)] font-800 leading-none tracking-[-0.04em] text-[clamp(5rem,12vw,9rem)] transition-colors duration-300 group-hover:opacity-90"
                style={{ color: "var(--copper)" }}
              >
                01
              </div>
              <div
                className="mt-1 font-mono text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                INSIGHT
              </div>
            </Link>

            {/* Headline + subtitle */}
            <div>
              <Link
                href="/insights/01-recursive-business-management-system"
                className="group block"
              >
                <h2
                  className="font-[var(--font-display)] font-800 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] transition-colors duration-300 group-hover:text-[var(--copper)]"
                  style={{ color: "var(--cream)" }}
                >
                  The Recursive Business Management System
                </h2>
                <p
                  className="mt-4 font-[var(--font-display)] italic text-[clamp(1rem,1.6vw,1.25rem)] leading-[1.45] max-w-[680px]"
                  style={{ color: "rgba(240,235,227,0.7)" }}
                >
                  An architectural and operational theory of the category that
                  replaces enterprise software.
                </p>
              </Link>
              <div
                className="mt-6 font-[var(--font-body)] text-sm leading-[1.5]"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                <span style={{ color: "var(--cream)" }}>Shawn Beekman</span>
                <span className="mx-2 text-[rgba(240,235,227,0.35)]">·</span>
                <span>
                  Founder, NEXT Consulting Corp.
                </span>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/insights/01-recursive-business-management-system"
              className="inline-flex items-center justify-between gap-4 px-6 py-4 min-w-[200px] font-[var(--font-display)] text-[11px] font-600 tracking-[0.18em] uppercase border border-[var(--copper)] text-[var(--copper)] transition-colors duration-300 hover:bg-[var(--copper)] hover:text-[var(--void)] group"
            >
              <span>Read Volume I</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2. GUIDE · Category claim ═══ */}
      <CategoryClaim />

      {/* ═══ 3. PROBLEM · Name the pain (seam-leak thesis) ═══ */}
      <section
        className="py-24 px-6 sm:px-14"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[900px] mx-auto">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § The Problem
          </span>
          <h2
            className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[760px]"
            style={{ color: "var(--cream)" }}
          >
            Revenue leaks at the seams between vendors. Not in any single piece.
          </h2>
          <p
            className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[720px]"
            style={{ color: "rgba(240,235,227,0.6)" }}
          >
            Your agency runs ads. Your website sits on a platform. Your CRM
            rents by the seat. Your call center has its own dashboard. Each
            piece is competent in isolation. None of them talk to each other.
            The contractor buying them spends a decade stitching seams that
            keep coming apart. That&rsquo;s the leak.
          </p>
          <p className="mt-8">
            <Link
              href="/revenue-systems-architecture"
              className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
              style={{ color: "var(--copper)" }}
            >
              Read the full thesis
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </p>
        </div>
      </section>

      {/* ═══ 4. PLAN · Three phases, bought in order ═══ */}
      <section
        className="py-28 px-6 sm:px-14"
        style={{
          borderTop: "1px solid var(--divider)",
          background: "#0c0c0e",
        }}
      >
        <div className="max-w-[1200px] mx-auto">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § The Plan
          </span>
          <h2
            className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
            style={{ color: "var(--cream)" }}
          >
            Three phases. Bought in order. Stop whenever.
          </h2>
          <p
            className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[640px]"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            Every phase ships with code, data, and domain rights handed to
            you the day it goes live. No retainer. No lock-in.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHASES.map((phase) => (
              <Link
                key={phase.n}
                href={phase.href}
                className="group block"
                style={{
                  padding: "28px",
                  border: "1px solid var(--divider)",
                  background: "var(--surface)",
                }}
              >
                <span
                  className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                  style={{ color: "var(--copper)" }}
                >
                  Phase {phase.n} · {phase.name}
                </span>
                <p
                  className="mt-5 font-[var(--font-display)] text-xl sm:text-2xl font-700 leading-tight group-hover:text-[var(--copper)] transition-colors duration-300"
                  style={{ color: "var(--cream)" }}
                >
                  {phase.oneLiner}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-2 font-[var(--font-display)] text-[11px] font-600 tracking-[0.2em] uppercase"
                  style={{ color: "var(--copper)" }}
                >
                  See {phase.name}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. PRICING · Transparent price tags ═══ */}
      <PricingLadder />

      {/* ═══ 6. CTA + THREE DOORS · Direct ask, softer alternatives ═══ */}
      <section
        className="py-28 px-6 sm:px-14"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § Where to start
          </span>
          <h2
            className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
            style={{ color: "var(--cream)" }}
          >
            Start a project. Or pick a door.
          </h2>
          <p
            className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[640px]"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            Ready to build? Skip to the contact form. Not there yet? Every
            page on this site is a different way into the same architecture.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
              style={{ background: "var(--copper)", color: "var(--void)" }}
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity hover:opacity-80"
              style={{ color: "var(--copper)" }}
            >
              See how we work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOORS.map((door) => (
              <Link
                key={door.href}
                href={door.href}
                className="group block p-6 transition-colors"
                style={{
                  border: "1px solid var(--divider)",
                  background: "var(--surface)",
                }}
              >
                <p
                  className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
                  style={{ color: "var(--copper)" }}
                >
                  {door.kicker}
                </p>
                <h3
                  className="mt-4 font-[var(--font-display)] text-xl font-700 leading-tight group-hover:text-[var(--copper)] transition-colors"
                  style={{ color: "var(--cream)" }}
                >
                  {door.title}
                </h3>
                <p
                  className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
                  style={{ color: "rgba(240,235,227,0.55)" }}
                >
                  {door.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. SUCCESS · Paint the after ═══ */}
      <section
        className="py-28 px-6 sm:px-14"
        style={{
          borderTop: "1px solid var(--divider)",
          background: "#0c0c0e",
        }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § What you walk away with
          </span>
          <h2
            className="mt-6 font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em]"
            style={{ color: "var(--cream)" }}
          >
            Your website converts.
            <br />
            Your brand commands the room.
            <br />
            Your operations{" "}
            <em className="italic" style={{ color: "#c4835a" }}>
              run themselves
            </em>
            .
          </h2>
          <p
            className="mt-8 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[620px] mx-auto"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            That&rsquo;s not a fantasy. It&rsquo;s what happens when you stop
            scaling a broken system and start compounding an owned one.
          </p>
        </div>
      </section>

      {/* ═══ 8. STAKES · What happens if you don't ═══ */}
      <section
        className="py-24 px-6 sm:px-14"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[820px] mx-auto text-center">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § The Stakes
          </span>
          <p
            className="mt-6 font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed"
            style={{ color: "#f0ebe3", opacity: 0.6 }}
          >
            Every quarter you delay, the gap between where you are and where
            you should be compounds. Revenue without architecture is funded
            chaos.
          </p>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
              style={{ background: "var(--copper)", color: "var(--void)" }}
            >
              Install the system
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex sm:hidden items-center justify-center gap-3 px-4 py-3 transition-transform duration-300"
        style={{
          background: "rgba(7,7,8,0.95)",
          borderTop: "1px solid rgba(196,131,90,0.2)",
          backdropFilter: "blur(8px)",
          transform: mounted ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
          style={{ backgroundColor: "#c4835a", color: "#070708" }}
        >
          Start a Project
        </Link>
        <Link
          href="/diagnostic"
          className="flex-1 flex items-center justify-center py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
          style={{ border: "1px solid #c4835a", color: "#c4835a" }}
        >
          System Score
        </Link>
      </div>
    </>
  );
}
