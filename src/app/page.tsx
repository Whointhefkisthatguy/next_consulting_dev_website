"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryClaim from "@/components/home/CategoryClaim";
import ModuleSequence from "@/components/home/ModuleSequence";
import EntryTiers from "@/components/home/EntryTiers";
import ThreeRules from "@/components/home/ThreeRules";
import BuilderTrendContrast from "@/components/home/BuilderTrendContrast";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import QualificationGate from "@/components/home/QualificationGate";
import { positioning } from "@/content/site/positioning";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ═══ § 1 · HERO · Lens-matched pain hook ═══ */}
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
            className="max-w-[820px] transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <span
              className="block font-[var(--font-display)] text-[11px] font-600 tracking-[0.3em] uppercase mb-5"
              style={{ color: "#c4835a" }}
            >
              The Operating System for Contractors
            </span>

            <h1
              className="font-[var(--font-display)] font-800 text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
              style={{ color: "#f0ebe3" }}
            >
              You can&rsquo;t outwork
              <br />
              <span style={{ color: "rgba(240,235,227,0.45)" }}>
                an unsystemized business.
              </span>
              <br />
              So we install the{" "}
              <em className="italic" style={{ color: "#c4835a" }}>
                system
              </em>
              , one module at a time.
            </h1>

            <p
              className="mt-7 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[620px]"
              style={{ color: "rgba(240,235,227,0.65)" }}
            >
              Leads disappear. Quotes don&rsquo;t get followed up. Jobs leak in
              the field. Billing chases the owner. Whichever bleed is worst
              right now is the door you walk through first. We install the one
              module that fixes it, configured to your crew, and the data tells
              you where to go next.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href={positioning.nleIntakeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
                style={{ backgroundColor: "#c4835a", color: "#070708" }}
              >
                Find your worst leak
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
              <Link
                href="#entry-tiers"
                className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
                style={{ color: "#c4835a" }}
              >
                See pricing
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Module chip strip: the five-module preview, visible above the fold */}
            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
              {positioning.modules.map((m, i) => (
                <div key={m.slug} className="flex items-center gap-2">
                  <Link
                    href="#operating-system"
                    className="font-[var(--font-display)] text-[11px] font-600 tracking-[0.2em] uppercase transition-colors hover:text-[var(--cream)]"
                    style={{ color: "rgba(240,235,227,0.7)" }}
                  >
                    <span style={{ color: "#c4835a" }}>{m.number}</span>{" "}
                    {m.name}
                  </Link>
                  {i < positioning.modules.length - 1 && (
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
          <div
            className="w-px h-8 animate-pulse"
            style={{
              background:
                "linear-gradient(to bottom, #c4835a, transparent)",
            }}
          />
        </div>
      </section>

      {/* ═══ § 2 · GUIDE · Category claim ═══ */}
      <CategoryClaim />

      {/* ═══ § 3 · PROBLEM · Name the bleed ═══ */}
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
            Growing a contracting business has never been harder.
          </h2>
          <p
            className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[720px]"
            style={{ color: "rgba(240,235,227,0.6)" }}
          >
            Labor is tight. Materials swing. Cashflow is unpredictable. Leads
            slip through the cracks. The good ones get to the right hands
            slowly or not at all. Job sites run without the discipline you
            would have run them with. Then the work is done and you spend
            evenings chasing money that should have collected itself.
          </p>
          <p
            className="mt-5 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[720px]"
            style={{ color: "rgba(240,235,227,0.6)" }}
          >
            You don&rsquo;t have a marketing problem. You have an unsystemized
            business problem. They look the same from the front, but the cure
            is completely different.
          </p>
        </div>
      </section>

      {/* ═══ § 4 · CONTRAST · Why BuilderTrend fails ═══ */}
      <BuilderTrendContrast />

      {/* ═══ § 5 · THE OS · Five-module sequence ═══ */}
      <ModuleSequence />

      {/* ═══ § 6 · THE THREE RULES ═══ */}
      <ThreeRules />

      {/* ═══ § 7 · ENTRY TIERS · Three doors with pricing ═══ */}
      <EntryTiers />

      {/* ═══ § 8 · STANDALONE HONESTY · The constraint ═══ */}
      <section
        className="py-24 px-6 sm:px-14"
        style={{
          borderTop: "1px solid var(--divider)",
          background: "#0c0c0e",
        }}
      >
        <div className="max-w-[820px] mx-auto text-center">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § The Standalone Honesty Constraint
          </span>
          <blockquote
            className="mt-8 font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed"
            style={{
              color: "#f0ebe3",
              opacity: 0.85,
              borderLeft: "2px solid var(--copper)",
              paddingLeft: "1.5rem",
              textAlign: "left",
            }}
          >
            &ldquo;Every module is genuinely worth its price on its own. A
            complete win, even for the contractor who never buys the next one.
            The next build is something the data reveals you want, never
            something the system withholds until you pay.&rdquo;
          </blockquote>
          <p
            className="mt-6 font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase text-left max-w-[820px] mx-auto"
            style={{ color: "rgba(240,235,227,0.5)", paddingLeft: "1.5rem" }}
          >
            The rule we won&rsquo;t break.
          </p>
        </div>
      </section>

      {/* ═══ § 9 · INDUSTRIES · Who this is for ═══ */}
      <IndustriesGrid />

      {/* ═══ § 10 · QUALIFICATION GATE · Who this isn't for ═══ */}
      <QualificationGate />

      {/* ═══ § 11 · FINAL CTA · Two doors close ═══ */}
      <section
        className="py-28 px-6 sm:px-14"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[820px] mx-auto text-center">
          <span
            className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            § Start here
          </span>
          <h2
            className="mt-4 font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em]"
            style={{ color: "var(--cream)" }}
          >
            Pick the door. Or run the diagnostic.
          </h2>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
              style={{ background: "var(--copper)", color: "var(--void)" }}
            >
              Start a project
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
            <Link
              href="/diagnostic"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase border transition-colors duration-300 hover:bg-[var(--copper)] hover:text-[var(--void)]"
              style={{ borderColor: "var(--copper)", color: "var(--copper)" }}
            >
              Get your System Score
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

          <p
            className="mt-12 font-[var(--font-body)] italic text-base sm:text-lg leading-relaxed max-w-[640px] mx-auto"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            Every quarter you delay, the gap between where you are and where
            you should be compounds. Revenue without architecture is funded
            chaos.
          </p>
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
