import type { CaseStudyRecord } from "@/lib/case-studies";
import Link from "next/link";

type Props = { studies: CaseStudyRecord[] };

export default function CaseStudyList({ studies }: Props) {
  return (
    <div className="space-y-20">
      {studies.map((s, i) => (
        <article key={s.slug} className="max-w-[900px]">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8a8480] mb-3">
            Case Study · {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="font-[var(--font-display)] font-700 text-2xl md:text-3xl leading-[1.2] text-[#f0ebe3]">
            {s.title}
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-6 md:gap-x-10 font-[var(--font-body)] text-[15px] leading-[1.7]">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Problem</div>
            <p className="text-[#f0ebe3]/85">{s.problem}</p>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Hypothesis</div>
            <p className="text-[#f0ebe3]/85">{s.hypothesis}</p>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Results</div>
            <ul className="space-y-2">
              {s.results.map((r, ri) => (
                <li key={ri} className="flex gap-4">
                  <span className="font-[var(--font-display)] font-700 text-[#f0ebe3] w-20 shrink-0">{r.value}</span>
                  <span className="text-[#f0ebe3]/85">
                    {r.metric}, <span className="text-[#8a8480]">{r.context}</span>
                  </span>
                </li>
              ))}
            </ul>
            {s.sources.length > 0 && (
              <>
                <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Sources</div>
                <ul className="space-y-1">
                  {s.sources.map((src, si) => (
                    <li key={si}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#8a8480] hover:text-[#c4835a]"
                      >
                       , {src.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <Link
            href={`/case-studies/${s.slug}`}
            className="inline-block mt-8 text-sm tracking-[0.12em] uppercase text-[#c4835a] hover:text-[#d4935a] border-b border-[#c4835a] pb-0.5"
          >
            Read the full study →
          </Link>
        </article>
      ))}
    </div>
  );
}
