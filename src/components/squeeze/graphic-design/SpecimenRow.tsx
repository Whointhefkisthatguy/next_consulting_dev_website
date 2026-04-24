const WEIGHTS = [400, 500, 600, 700, 800];

export default function SpecimenRow({ word = "next" }: { word?: string }) {
  return (
    <section className="px-6 sm:px-14 py-24" style={{ borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="font-[var(--font-body)] text-xs tracking-[0.25em] uppercase text-[#8a8480] mb-10">
          Specimen · Syne display · 400 → 800
        </div>
        <div className="space-y-2">
          {WEIGHTS.map((w) => (
            <div
              key={w}
              className="flex items-baseline gap-6 border-b pb-3"
              style={{ borderColor: "var(--divider)" }}
            >
              <span className="font-mono text-xs text-[#6b6560] w-12 shrink-0">{w}</span>
              <span
                className="font-[var(--font-display)] text-[clamp(3rem,8vw,6rem)] leading-none tracking-[-0.02em] text-[#f0ebe3]"
                style={{ fontWeight: w }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
