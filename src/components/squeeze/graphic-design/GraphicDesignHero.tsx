type Props = { kicker?: string; headline: string; subhead?: string; attribution?: string };

export default function GraphicDesignHero({ kicker, headline, subhead, attribution }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* subtle drafting grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(240,235,227,0.9) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.9) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* oversized ampersand */}
      <div
        aria-hidden
        className="absolute -right-[8vw] top-1/2 -translate-y-1/2 font-[var(--font-display)] font-800 text-[60vw] leading-[0.8] text-[#f0ebe3]/[0.06] select-none pointer-events-none"
      >
        &amp;
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        {kicker && (
          <div className="font-[var(--font-body)] text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-6">
            {kicker}
          </div>
        )}
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-[#f0ebe3] max-w-[900px]">
          {headline}
        </h1>
        {attribution && (
          <div className="mt-5 font-[var(--font-body)] text-sm tracking-[0.1em] uppercase text-[#a39d97]/80">
            {attribution}
          </div>
        )}
        {subhead && (
          <p className="mt-10 font-[var(--font-display)] font-600 text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.2] tracking-[-0.01em] text-[#c4835a] max-w-[600px]">
            {subhead}
          </p>
        )}
        {/* color chips */}
        <div aria-hidden className="mt-14 flex gap-0">
          {["#f0ebe3", "#c4835a", "#070708", "#6b6560", "#0f0f11"].map((c, i) => (
            <div key={i} className="w-14 h-3" style={{ background: c, border: "1px solid rgba(240,235,227,0.1)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
