"use client";

import CTABlock from "./CTABlock";
import ServiceCards from "./ServiceCards";

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
  serviceName: string;
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
  serviceName,
  quote,
  quoteAuthor,
  heroImage,
  intro,
  deliverables,
  process,
}: ServicePageProps) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.4) saturate(0.5)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(7,7,8,0.3) 0%, rgba(7,7,8,0.4) 50%, rgba(7,7,8,0.9) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 sm:px-14 pb-16 pt-40">
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "#f0ebe3" }}
          >
            {title}
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] italic text-base max-w-lg"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            &ldquo;{quote}&rdquo;
            <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
              &mdash; {quoteAuthor}
            </span>
          </p>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[680px]">
          {intro.map((paragraph, i) => (
            <p
              key={i}
              className="font-[var(--font-body)] text-[15px] leading-[1.8] mb-8"
              style={{ color: "rgba(240,235,227,0.75)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* ═══ DELIVERABLES ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[700px]">
          <h2
            className="font-[var(--font-display)] font-700 text-2xl mb-16"
            style={{ color: "#f0ebe3" }}
          >
            Deliverables
          </h2>

          <div className="space-y-12">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-start gap-6">
                <span
                  className="shrink-0 font-[var(--font-display)] text-sm font-700 mt-0.5"
                  style={{ color: "#c4835a" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="font-[var(--font-display)] text-lg font-600"
                    style={{ color: "#f0ebe3" }}
                  >
                    {d.name}
                  </h3>
                  <p
                    className="mt-2 font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "#8a8480" }}
                  >
                    {d.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS (optional) ═══ */}
      {process && process.length > 0 && (
        <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
          <div className="max-w-[1000px] mx-auto">
            <h2
              className="font-[var(--font-display)] font-700 text-2xl mb-16"
              style={{ color: "#f0ebe3" }}
            >
              Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {process.map((step, i) => (
                <div key={i}>
                  <span
                    className="font-[var(--font-display)] text-sm font-700"
                    style={{ color: "#c4835a" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className="mt-3 font-[var(--font-display)] text-base font-600"
                    style={{ color: "#f0ebe3" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="mt-2 font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "#8a8480" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SERVICE CARDS ═══ */}
      <ServiceCards current={serviceName} />

      {/* ═══ CTA ═══ */}
      <CTABlock />
    </>
  );
}
