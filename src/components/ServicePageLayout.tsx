"use client";

import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";
import CTABlock from "./CTABlock";

type Deliverable = {
  name: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type ServicePageProps = {
  title: string;
  quote: string;
  quoteAuthor: string;
  heroImage: string;
  bodyImage: string;
  intro: string[];
  deliverables: Deliverable[];
  process?: ProcessStep[];
};

export default function ServicePageLayout({
  title,
  quote,
  quoteAuthor,
  heroImage,
  bodyImage,
  intro,
  deliverables,
  process,
}: ServicePageProps) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-24 px-6 sm:px-14 overflow-hidden">
        <ParallaxImage
          src={heroImage}
          aspect="ultrawide"
          className="top-[15%] right-[-10%]"
          opacity={0.2}
        />

        <div className="relative z-10 max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              {title}
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;{quote}&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; {quoteAuthor}
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="relative py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <ParallaxImage
          src={bodyImage}
          aspect="tall"
          className="top-[5%] right-[8%] hidden md:block"
          opacity={0.12}
        />

        <div className="max-w-[680px]">
          {intro.map((paragraph, i) => (
            <ScrollReveal key={i}>
              <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] mb-8">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ DELIVERABLES ═══ */}
      <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[700px]">
          <ScrollReveal>
            <h2 className="reveal font-[var(--font-display)] font-700 text-2xl text-[var(--cream)] mb-16">
              Deliverables
            </h2>
          </ScrollReveal>

          <div className="space-y-12">
            {deliverables.map((d, i) => (
              <ScrollReveal key={i}>
                <div className="reveal flex items-start gap-6">
                  <span className="shrink-0 font-[var(--font-display)] text-sm font-700 text-[var(--copper)] mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[var(--font-display)] text-lg font-600 text-[var(--cream)]">
                      {d.name}
                    </h3>
                    <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS (optional) ═══ */}
      {process && process.length > 0 && (
        <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
          <div className="max-w-[1000px] mx-auto">
            <ScrollReveal>
              <h2 className="reveal font-[var(--font-display)] font-700 text-2xl text-[var(--cream)] mb-16">
                Process
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {process.map((step, i) => (
                <ScrollReveal key={i}>
                  <div className="reveal relative">
                    <span className="font-[var(--font-display)] text-sm font-700 text-[var(--copper)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-[var(--font-display)] text-base font-600 text-[var(--cream)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                      {step.description}
                    </p>
                    {i < process.length - 1 && (
                      <div className="hidden md:block absolute top-3 left-full w-full h-px bg-[var(--divider)]" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <CTABlock />
    </>
  );
}
