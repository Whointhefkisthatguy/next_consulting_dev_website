import type { Phase } from "@/content/site/positioning";

export default function PhaseSection({ phase }: { phase: Phase }) {
  const altBg = phase.number === "02";
  return (
    <section
      id={phase.slug}
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
      style={{
        borderTop: "1px solid var(--divider)",
        background: altBg ? "#0c0c0e" : undefined,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="font-[var(--font-display)] text-sm font-700 tracking-[0.2em]"
          style={{ color: "var(--copper)" }}
        >
          {phase.number}, Phase {phase.number} · {phase.name}
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          {phase.headline}
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[700px]"
          style={{ color: "rgba(240,235,227,0.55)" }}
        >
          {phase.subhead}
        </p>

        {phase.deliverables.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {phase.deliverables.map((d) => (
              <article
                key={d.slug}
                style={{
                  padding: "32px",
                  border: "1px solid var(--divider)",
                }}
              >
                <span
                  className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                  style={{ color: "var(--copper)" }}
                >
                  {d.hero.kicker ?? d.slug}
                </span>
                <h3
                  className="mt-3 font-[var(--font-display)] text-xl sm:text-2xl font-700 leading-tight"
                  style={{ color: "var(--cream)" }}
                >
                  {d.hero.headline}
                </h3>
                {d.hero.subhead && (
                  <p
                    className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "rgba(240,235,227,0.55)" }}
                  >
                    {d.hero.subhead}
                  </p>
                )}
                <ul className="mt-6 space-y-2">
                  {d.deliverables.slice(0, 4).map((item) => (
                    <li
                      key={item.name}
                      className="font-[var(--font-body)] text-sm leading-relaxed"
                      style={{ color: "rgba(240,235,227,0.7)" }}
                    >
                      <span style={{ color: "var(--copper)" }}>·</span>{" "}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
