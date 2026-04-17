"use client";

import { useEffect, useState } from "react";
import CTABlock from "@/components/CTABlock";
import ServiceCard from "@/components/ServiceCard";
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

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ═══ HERO — Character + Problem ═══ */}
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
            className="max-w-[720px] transition-all duration-[1200ms] ease-out"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]" style={{ color: "#f0ebe3" }}>
              Your revenue has a ceiling.
              <br />
              <span style={{ color: "rgba(240,235,227,0.45)" }}>It&rsquo;s not the market &mdash;</span>
              <br />
              it&rsquo;s the <em className="italic" style={{ color: "#c4835a" }}>system</em>.
            </h1>

            <p className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[560px]" style={{ color: "rgba(240,235,227,0.6)" }}>
              You built something worth scaling. But the website doesn&rsquo;t convert, the brand doesn&rsquo;t command, and your team is buried in manual work that should have been automated last year.
            </p>

            <p className="mt-4 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[560px]" style={{ color: "rgba(240,235,227,0.45)" }}>
              That&rsquo;s not a growth problem. That&rsquo;s an architecture problem.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
                style={{ backgroundColor: "#c4835a", color: "#070708" }}
              >
                Book a Diagnostic
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
                style={{ color: "#c4835a" }}
              >
                See how we work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
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

      {/* ═══ GUIDE — empathy + authority ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[800px] mx-auto">
          <p className="font-[var(--font-body)] text-base sm:text-lg leading-relaxed" style={{ color: "rgba(240,235,227,0.6)" }}>
            We&rsquo;ve watched this pattern destroy good businesses. Revenue goes up, but margins don&rsquo;t. Headcount grows, but output doesn&rsquo;t. The website looks fine, but it doesn&rsquo;t convert. The brand exists, but it doesn&rsquo;t command.
          </p>
          <p className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed" style={{ color: "rgba(240,235,227,0.45)" }}>
            Next Consulting works at the intersection of design, technology, and operations. We don&rsquo;t pitch &mdash; we diagnose. Then we build systems that compound.
          </p>
        </div>
      </section>

      {/* ═══ PLAN — 3 steps ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)", background: "#0c0c0e" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-[var(--font-display)] font-700 text-3xl sm:text-4xl mb-6" style={{ color: "#f0ebe3" }}>
            How It Works
          </h2>
          <p className="font-[var(--font-body)] text-sm mb-16" style={{ color: "rgba(240,235,227,0.4)" }}>
            Every engagement follows the same discipline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Diagnose",
                body: "We audit your current systems \u2014 website, brand, operations \u2014 and identify exactly where revenue is leaking. No assumptions. No pitches. Just data.",
              },
              {
                step: "02",
                title: "Architect",
                body: "We design the fix. Whether it\u2019s a full website rebuild, a brand identity system, or workflow automation \u2014 we architect the solution before touching a single pixel.",
              },
              {
                step: "03",
                title: "Build & Compound",
                body: "We build it, launch it, and stay. Every system we deploy is designed to compound \u2014 not expire. We monitor, iterate, and optimize after go-live.",
              },
            ].map((item) => (
              <div key={item.step} style={{ padding: "32px", border: "1px solid rgba(240,235,227,0.06)" }}>
                <span className="font-[var(--font-display)] text-sm font-700" style={{ color: "#c4835a" }}>
                  {item.step}
                </span>
                <h3 className="mt-3 font-[var(--font-display)] text-xl font-700" style={{ color: "#f0ebe3" }}>
                  {item.title}
                </h3>
                <p className="mt-4 font-[var(--font-body)] text-sm leading-relaxed" style={{ color: "rgba(240,235,227,0.45)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-[var(--font-display)] font-700 text-3xl sm:text-4xl mb-16" style={{ color: "#f0ebe3" }}>
            What We Build
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.name}
                index={i}
                name={service.name}
                href={service.href}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUCCESS — paint the after ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)", background: "#0c0c0e" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] leading-[1.15]" style={{ color: "#f0ebe3" }}>
            Your website converts. Your brand commands the room.
            <br />
            Your operations <em className="italic" style={{ color: "#c4835a" }}>run themselves</em>.
          </h2>
          <p className="mt-8 font-[var(--font-body)] text-base leading-relaxed max-w-[600px] mx-auto" style={{ color: "rgba(240,235,227,0.45)" }}>
            That&rsquo;s not a fantasy. It&rsquo;s what happens when you stop scaling a broken system and start building one that compounds.
          </p>
        </div>
      </section>

      {/* ═══ STAKES — what happens if you don't ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <blockquote className="font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed" style={{ color: "#f0ebe3", opacity: 0.55 }}>
            &ldquo;The purpose of business is to create a customer, the business enterprise thus has two&mdash;and only two basic functions: marketing and innovation. Marketing and innovation produce results, all the rest are costs.&rdquo;
          </blockquote>
          <cite className="block mt-6 font-[var(--font-display)] not-italic text-xs font-500 tracking-[0.2em] uppercase" style={{ color: "#6b6560" }}>
            &mdash; Peter Drucker
          </cite>
          <p className="mt-10 font-[var(--font-body)] text-sm leading-relaxed max-w-[500px] mx-auto" style={{ color: "rgba(240,235,227,0.35)" }}>
            Every quarter you delay, the gap between where you are and where you should be compounds. Revenue without architecture is funded chaos.
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <CTABlock />

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
        <a
          href="#book"
          className="flex-1 flex items-center justify-center gap-2 py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
          style={{ backgroundColor: "#c4835a", color: "#070708" }}
        >
          Book a Diagnostic
        </a>
        <a
          href="mailto:revops@nextconsulting.dev"
          className="flex-1 flex items-center justify-center py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
          style={{ border: "1px solid #c4835a", color: "#c4835a" }}
        >
          Email Us
        </a>
      </div>
    </>
  );
}
