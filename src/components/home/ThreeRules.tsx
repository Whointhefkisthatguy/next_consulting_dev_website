import { positioning } from "@/content/site/positioning";

export default function ThreeRules() {
  return (
    <section
      className="py-24 px-6 sm:px-14"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § The Three Rules
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[760px]"
          style={{ color: "var(--cream)" }}
        >
          The three rules that govern every module.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[700px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          These are design constraints, not preferences. A module that violates
          any of the three breaks the model.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {positioning.rules.map((rule) => (
            <div
              key={rule.number}
              className="flex flex-col"
              style={{
                padding: "28px",
                border: "1px solid var(--divider)",
                background: "var(--surface)",
              }}
            >
              <span
                className="font-[var(--font-display)] font-800 leading-none tracking-[-0.04em] text-[clamp(2.25rem,4vw,3rem)]"
                style={{ color: "var(--copper)" }}
              >
                {rule.number}
              </span>
              <h3
                className="mt-5 font-[var(--font-display)] font-700 text-lg sm:text-xl leading-tight"
                style={{ color: "var(--cream)" }}
              >
                {rule.name}
              </h3>
              <p
                className="mt-4 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.7)" }}
              >
                {rule.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
