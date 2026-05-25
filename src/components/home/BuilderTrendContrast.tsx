export default function BuilderTrendContrast() {
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
          § Why generic CRM fails
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          BuilderTrend hands you a platform.{" "}
          <em className="italic" style={{ color: "var(--copper)" }}>
            We install a system.
          </em>
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            style={{
              padding: "32px",
              border: "1px solid var(--divider)",
              background: "var(--surface)",
            }}
          >
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "rgba(240,235,227,0.5)" }}
            >
              The Platform Trap
            </span>
            <p
              className="mt-5 font-[var(--font-body)] text-base leading-relaxed"
              style={{ color: "rgba(240,235,227,0.7)" }}
            >
              A vast generic platform you wander, looking for value nobody
              installed into your business. Your crew never learns it. The
              process is a binder they can ignore. You blame the software.
            </p>
          </div>
          <div
            style={{
              padding: "32px",
              border: "1px solid var(--copper)",
              background: "var(--surface)",
            }}
          >
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              The Module Install
            </span>
            <p
              className="mt-5 font-[var(--font-body)] text-base leading-relaxed"
              style={{ color: "rgba(240,235,227,0.85)" }}
            >
              The one module that fixes your worst bleed, configured around
              your actual workflow, roles, and people. The software won't let
              your crew skip a step. The process is the only path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
