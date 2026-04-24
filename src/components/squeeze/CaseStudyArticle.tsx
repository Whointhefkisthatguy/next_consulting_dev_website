import Link from "next/link";
import type { CaseStudyRecord } from "@/lib/case-studies";
import { renderMdx } from "@/lib/mdx";
import ShareRow from "./ShareRow";
import TierPill from "./TierPill";

type Props = { study: CaseStudyRecord };

export default async function CaseStudyArticle({ study }: Props) {
  const url = `https://nextconsulting.dev/case-studies/${study.slug}`;
  const html = await renderMdx(study.body);

  return (
    <article className="px-6 sm:px-14 pt-40 pb-20 max-w-[860px] mx-auto">
      {/* PLATE marker */}
      <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--copper)] mb-8">
        Plate {study.plate} · Case Study
      </div>

      {/* Title */}
      <h1
        className="font-[var(--font-display)] font-800 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em]"
        style={{ color: "var(--cream)" }}
      >
        {study.title}
      </h1>

      {/* Industry · Engagement metadata */}
      <div className="mt-6 font-[var(--font-body)] text-sm text-[rgba(240,235,227,0.65)] tracking-wide">
        {study.industry} · {study.engagement}
      </div>

      {/* Tier pill */}
      <div className="mt-6">
        <TierPill tier={study.tier} label={study.tierLabel} />
      </div>

      {/* Thesis lede */}
      <p
        className="mt-12 font-[var(--font-display)] font-600 text-[clamp(1.25rem,2.4vw,1.875rem)] leading-[1.3] tracking-[-0.005em]"
        style={{ color: "var(--cream)" }}
      >
        {study.thesis}
      </p>

      {/* Share */}
      <div className="mt-10">
        <ShareRow url={url} title={study.title} />
      </div>

      {/* Body */}
      <div
        className="case-study-prose mt-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <hr className="my-16" style={{ borderColor: "var(--divider)" }} />

      {/* End-of-article block */}
      <div className="space-y-10">
        <p
          className="font-[var(--font-body)] italic text-[15px] leading-[1.7]"
          style={{ color: "rgba(240,235,227,0.7)" }}
        >
          If the operating math in your business has started to feel like a
          ceiling rather than a floor, the same workstreams apply. We come
          back inside one business day with a diagnostic of where the
          operating system actually sits today, and a sequenced plan to
          install the parts that are missing.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-[12px] font-600 tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-[var(--copper-hover)]"
          >
            Start a project →
          </Link>
          <ShareRow url={url} title={study.title} />
        </div>
        <div className="pt-6 border-t border-[var(--divider)]">
          <Link
            href="/case-studies"
            className="font-[var(--font-display)] text-xs tracking-[0.18em] uppercase text-[rgba(240,235,227,0.55)] hover:text-[var(--copper)]"
          >
            ← All case studies
          </Link>
        </div>
      </div>
    </article>
  );
}
