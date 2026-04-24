import type { CaseStudyRecord } from "@/lib/case-studies";
import Link from "next/link";
import TierPill from "../TierPill";

type Props = { studies: CaseStudyRecord[] };

export default function CaseStudyList({ studies }: Props) {
  if (studies.length === 0) {
    return (
      <p className="font-[var(--font-body)] text-sm text-[#8a8480]">
        Case studies are in production. Browse{" "}
        <Link href="/case-studies" className="text-[#c4835a] hover:text-[#d4935a]">
          all plates →
        </Link>
      </p>
    );
  }
  return (
    <div className="space-y-16">
      {studies.map((s) => (
        <article key={s.slug} className="max-w-[900px]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c4835a]">
              Plate {s.plate}
            </div>
            <TierPill tier={s.tier} label={s.tierLabel} />
          </div>
          <h3 className="font-[var(--font-display)] font-700 text-2xl md:text-3xl leading-[1.18] tracking-[-0.01em] text-[#f0ebe3]">
            {s.title}
          </h3>
          <p className="mt-3 font-[var(--font-body)] text-[13px] tracking-wide text-[rgba(240,235,227,0.55)]">
            {s.industry} · {s.engagement}
          </p>
          <p className="mt-6 font-[var(--font-body)] text-[16px] leading-[1.7] text-[#f0ebe3]/85 max-w-[700px]">
            {s.description}
          </p>
          <Link
            href={`/case-studies/${s.slug}`}
            className="inline-block mt-8 font-[var(--font-display)] text-xs tracking-[0.18em] uppercase text-[#c4835a] hover:text-[#d4935a] border-b border-[#c4835a] pb-0.5"
          >
            Read the full study →
          </Link>
        </article>
      ))}
    </div>
  );
}
