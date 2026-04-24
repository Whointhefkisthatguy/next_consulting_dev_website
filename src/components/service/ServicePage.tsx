import Link from "next/link";
import type { SqueezePageContent } from "@/content/squeeze/types";
import TrustStrip from "@/components/squeeze/TrustStrip";
import Promise from "@/components/squeeze/Promise";
import WhatYouGet from "@/components/squeeze/WhatYouGet";
import WorkGrid from "@/components/squeeze/WorkGrid";
import Process from "@/components/squeeze/Process";
import StartProjectSection from "@/components/squeeze/StartProjectSection";

type Props = { content: SqueezePageContent };

export default function ServicePage({ content }: Props) {
  const { hero, trustStats, promise, deliverables, workSamples, process, startProject, slug } =
    content;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-20 px-6 sm:px-14">
        <div className="max-w-[1100px] mx-auto">
          {hero.kicker && (
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              {hero.kicker}
            </span>
          )}
          <h1
            className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em] max-w-[900px]"
            style={{ color: "var(--cream)" }}
          >
            {hero.headline}
          </h1>
          {hero.subhead && (
            <p
              className="mt-8 font-[var(--font-body)] text-lg sm:text-xl leading-[1.6] max-w-[720px]"
              style={{ color: "rgba(240,235,227,0.6)" }}
            >
              {hero.subhead}
            </p>
          )}
          {hero.attribution && (
            <p
              className="mt-6 font-[var(--font-display)] text-xs font-500 tracking-[0.2em] uppercase"
              style={{ color: "var(--muted)" }}
            >
              {hero.attribution}
            </p>
          )}
        </div>
      </section>

      <TrustStrip stats={trustStats} />

      <Promise text={promise} kicker="§ The promise" />

      <WhatYouGet deliverables={deliverables} heading="What you get" />

      {workSamples && workSamples.length > 0 && (
        <WorkGrid samples={workSamples} heading="Selected work" />
      )}

      <Process steps={process} heading="Process" />

      <StartProjectSection service={slug} block={startProject} />

      {/* ═══ RETURN HOME ═══ */}
      <section
        className="px-6 sm:px-14 py-16"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
        </div>
      </section>
    </>
  );
}
