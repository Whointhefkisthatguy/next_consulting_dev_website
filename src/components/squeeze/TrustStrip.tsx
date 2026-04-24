import type { TrustStat } from "@/content/squeeze/types";
import Link from "next/link";
import CountUp from "@/components/CountUp";

type Props = {
  stats: [TrustStat, TrustStat, TrustStat];
  accent?: "copper" | "mono";
  ctaLabel?: string;
  ctaHref?: string;
};

export default function TrustStrip({ stats, accent = "copper", ctaLabel, ctaHref }: Props) {
  const valueColor = accent === "copper" ? "text-[#c4835a]" : "text-[#f0ebe3]";
  return (
    <section
      aria-label="Trust indicators"
      className="px-6 sm:px-14 py-20"
      style={{ borderTop: "1px solid var(--divider-strong)", borderBottom: "1px solid var(--divider-strong)" }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col gap-3">
            <CountUp
              value={s.value}
              className={`font-[var(--font-display)] text-5xl md:text-6xl font-800 tracking-tight ${valueColor}`}
            />
            <div className="text-[15px] leading-[1.55] text-[#f0ebe3]/90 font-[var(--font-body)]">
              {s.label}
            </div>
            <a
              href={s.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.1em] uppercase text-[#8a8480] hover:text-[#c4835a] transition-colors w-fit"
            >
             , {s.source.label} &nearr;
            </a>
          </div>
        ))}
      </div>
      {ctaLabel && ctaHref && (
        <div className="max-w-[1200px] mx-auto mt-14">
          <Link
            href={ctaHref}
            className="inline-block text-[#c4835a] hover:text-[#d4935a] font-[var(--font-body)] text-sm tracking-[0.12em] uppercase border-b border-[#c4835a] hover:border-[#d4935a] pb-0.5"
          >
            {ctaLabel} →
          </Link>
        </div>
      )}
    </section>
  );
}
