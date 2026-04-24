import Link from "next/link";
import type { EssayRecord } from "@/lib/essays";
import { renderMdx } from "@/lib/mdx";
import ShareRow from "./ShareRow";

type Props = { essay: EssayRecord };

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EssayArticle({ essay }: Props) {
  const url = `https://nextconsulting.dev/writing/${essay.slug}`;
  const html = await renderMdx(essay.body);

  return (
    <article className="px-6 sm:px-14 pt-40 pb-20 max-w-[780px] mx-auto">
      {/* Category eyebrow */}
      <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--copper)] mb-8">
        {essay.category}
      </div>

      {/* Title */}
      <h1
        className="font-[var(--font-display)] font-800 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.02em]"
        style={{ color: "var(--cream)" }}
      >
        {essay.title}
      </h1>

      {/* Byline + date */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="font-[var(--font-body)] text-sm leading-[1.5]">
          <span className="text-[var(--cream)] font-600">{essay.author}</span>
          <span className="mx-2 text-[rgba(240,235,227,0.4)]">·</span>
          <span className="text-[rgba(240,235,227,0.65)]">
            {essay.authorTitle}
          </span>
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[rgba(240,235,227,0.45)]">
          {formatDate(essay.publishedAt)}
        </div>
      </div>

      {/* Share */}
      <div className="mt-10">
        <ShareRow url={url} title={essay.title} />
      </div>

      {/* Body */}
      <div
        className="case-study-prose mt-14"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <hr className="my-14" style={{ borderColor: "var(--divider)" }} />

      {/* Author footer + share */}
      <div className="space-y-8">
        <p
          className="font-[var(--font-body)] italic text-[14px] leading-[1.7]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          {essay.author} is the founder of Next Consulting, building revenue
          operating systems and AI-driven client journey infrastructure for
          dealership groups and high-growth operators.{" "}
          <Link href="/" className="not-italic text-[var(--copper)] hover:text-[var(--copper-hover)]">
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
          <ShareRow url={url} title={essay.title} />
        </div>
        <div className="pt-6 border-t border-[var(--divider)]">
          <Link
            href="/writing"
            className="font-[var(--font-display)] text-xs tracking-[0.18em] uppercase text-[rgba(240,235,227,0.55)] hover:text-[var(--copper)]"
          >
            ← All writing
          </Link>
        </div>
      </div>
    </article>
  );
}
