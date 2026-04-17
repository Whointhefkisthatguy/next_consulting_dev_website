"use client";

type Props = { kicker?: string; headline: string; subhead?: string };

export default function WebsitesHero({ kicker, headline, subhead }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(240,235,227,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* breakpoint labels */}
      <div aria-hidden className="absolute top-40 right-6 sm:right-14 font-mono text-[10px] tracking-[0.2em] uppercase text-[#6b6560] space-y-1 text-right">
        <div>1440 · DESKTOP</div>
        <div>1024 · LAPTOP</div>
        <div>768 · TABLET</div>
        <div>390 · MOBILE</div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          {kicker && (
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-6">
              {kicker}
            </div>
          )}
          <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-[#f0ebe3]">
            {headline}
            <span className="inline-block w-[0.08em] h-[0.85em] bg-[#c4835a] ml-2 align-middle animate-[blink_1s_step-end_infinite] motion-reduce:animate-none" aria-hidden />
          </h1>
          {subhead && (
            <p className="mt-8 font-[var(--font-body)] text-lg leading-[1.55] text-[#f0ebe3]/70 max-w-[600px]">
              {subhead}
            </p>
          )}
        </div>

        <div className="hidden lg:flex gap-4 items-end justify-end">
          <div className="w-[280px] aspect-[3/2] border border-[#f0ebe3]/20 bg-[#0f0f11] flex items-center justify-center">
            <span className="font-[var(--font-display)] font-800 text-2xl tracking-[-0.02em] text-[#f0ebe3]">N&gt;</span>
          </div>
          <div className="w-[100px] aspect-[9/16] border border-[#f0ebe3]/20 bg-[#0f0f11] flex items-center justify-center">
            <span className="font-[var(--font-display)] font-800 text-lg tracking-[-0.02em] text-[#f0ebe3]">N&gt;</span>
          </div>
        </div>
      </div>
    </section>
  );
}
