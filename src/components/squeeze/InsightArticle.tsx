import Link from "next/link";
import type { InsightRecord } from "@/lib/insights";
import { renderMdx } from "@/lib/mdx";
import ShareRow from "./ShareRow";

type Props = { insight: InsightRecord };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export default async function InsightArticle({ insight }: Props) {
  const url = `https://nextconsulting.dev/insights/${insight.slug}`;
  const html = await renderMdx(insight.body);
  const seriesMark = insight.series
    ? `${insight.series.name} ${insight.series.volume}`
    : insight.classification.toUpperCase();

  return (
    <article className="pt-32 pb-20">
      {/* Drafting-plate cover block */}
      <header className="px-6 sm:px-14 pt-20 pb-16 border-b border-[var(--divider)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--copper)]">
            <span>NEXT · CONSULTING CORP.</span>
            <span style={{ color: "rgba(240,235,227,0.5)" }}>
              {insight.classification}
            </span>
          </div>

          {/* Volume + series mark */}
          <div className="mt-16 flex items-baseline gap-6 flex-wrap">
            <div
              className="font-[var(--font-display)] font-800 text-[clamp(4rem,12vw,9rem)] leading-none tracking-[-0.04em]"
              style={{ color: "var(--copper)" }}
            >
              {insight.series?.volume ?? "—"}
            </div>
            <div className="flex flex-col">
              <span
                className="font-mono text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                {seriesMark}
              </span>
              <span
                className="mt-1 font-[var(--font-body)] text-sm tracking-wide"
                style={{ color: "rgba(240,235,227,0.45)" }}
              >
                Published {formatDate(insight.publishedAt)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1
            className="mt-14 font-[var(--font-display)] font-800 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.025em] max-w-[1000px]"
            style={{ color: "var(--cream)" }}
          >
            {insight.title}
          </h1>

          {insight.subtitle && (
            <p
              className="mt-8 font-[var(--font-display)] italic text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.4] tracking-[-0.005em] max-w-[860px]"
              style={{ color: "rgba(240,235,227,0.7)" }}
            >
              {insight.subtitle}
            </p>
          )}

          {/* Author + share */}
          <div className="mt-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-[var(--divider)]">
            <div className="font-[var(--font-body)] text-sm leading-[1.5]">
              <span className="text-[var(--cream)] font-600">{insight.author}</span>
              <span className="block mt-1 text-[rgba(240,235,227,0.6)]">
                {insight.authorTitle}
              </span>
            </div>
            <ShareRow url={url} title={insight.title} />
          </div>

          {insight.partial && insight.partialNote && (
            <p
              className="mt-10 font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "rgba(240,235,227,0.45)" }}
            >
              {insight.partialNote}
            </p>
          )}
        </div>
      </header>

      {/* Abstract block (if provided) */}
      {insight.abstract && (
        <section className="px-6 sm:px-14 py-16 border-b border-[var(--divider)]">
          <div className="max-w-[860px] mx-auto">
            <span
              className="font-mono text-[11px] tracking-[0.3em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              § Abstract
            </span>
            <p
              className="mt-6 font-[var(--font-body)] text-[18px] leading-[1.7]"
              style={{ color: "rgba(240,235,227,0.85)" }}
            >
              {insight.abstract}
            </p>
          </div>
        </section>
      )}

      {/* Body */}
      <section className="px-6 sm:px-14 py-20">
        <div className="max-w-[820px] mx-auto">
          <div
            className="insight-prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      <hr className="my-12" style={{ borderColor: "var(--divider)" }} />

      {/* End matter */}
      <section className="px-6 sm:px-14">
        <div className="max-w-[820px] mx-auto space-y-10">
          <p
            className="font-[var(--font-body)] italic text-[15px] leading-[1.7]"
            style={{ color: "rgba(240,235,227,0.6)" }}
          >
            {insight.author} is the founder of Next Consulting Corp., building
            revenue operating systems and AI-driven client journey
            infrastructure for dealership groups, infrastructure operators, and
            high-growth firms.{" "}
            <Link
              href="/"
              className="not-italic text-[var(--copper)] hover:text-[var(--copper-hover)]"
            >
              nextconsulting.dev
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-[12px] font-600 tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-[var(--copper-hover)]"
            >
              Start a project →
            </Link>
            <ShareRow url={url} title={insight.title} />
          </div>
          <div className="pt-6 border-t border-[var(--divider)]">
            <Link
              href="/insights"
              className="font-[var(--font-display)] text-xs tracking-[0.18em] uppercase text-[rgba(240,235,227,0.55)] hover:text-[var(--copper)]"
            >
              ← All insights
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
