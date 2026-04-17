type Props = { kicker?: string; headline: string; subhead?: string };

export default function AutomationHero({ kicker, headline, subhead }: Props) {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between px-6 sm:px-14 pt-40 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-[1100px]">
        {kicker && (
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-8">
            {kicker}
          </div>
        )}
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-[#f0ebe3]">
          {headline}
        </h1>
        {subhead && (
          <p className="mt-10 font-mono text-xs sm:text-sm leading-[1.6] text-[#8a8480] max-w-[600px]">
            <sup className="text-[#c4835a] mr-1">1</sup>
            {subhead}
          </p>
        )}
      </div>
      <div aria-hidden className="relative z-10 font-mono text-[10px] tracking-[0.25em] uppercase text-[#6b6560] flex items-center gap-3">
        <span>Continue</span>
        <span className="h-px w-10 bg-[#6b6560]" />
      </div>
    </section>
  );
}
