import { positioning } from "@/content/site/positioning";

export default function IndustriesGrid() {
  return (
    <section
      className="py-24 px-6 sm:px-14"
      style={{
        borderTop: "1px solid var(--divider)",
        background: "#0c0c0e",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § We're specialists, not generalists
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[760px]"
          style={{ color: "var(--cream)" }}
        >
          Contractors. Trades. Home services.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[680px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          The modules are fixed. The language flexes to the trade. Whichever
          side of the lot you stand on, the bleed has the same shape.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-px bg-[var(--divider)]">
          {positioning.industries.map((industry) => (
            <div
              key={industry.name}
              className="group p-7 sm:p-9 transition-colors duration-300 hover:bg-[#0a0a0c]"
              style={{ background: "#0c0c0e" }}
            >
              <h3
                className="font-[var(--font-display)] font-700 text-lg sm:text-xl leading-tight group-hover:text-[var(--copper)] transition-colors"
                style={{ color: "var(--cream)" }}
              >
                {industry.name}
              </h3>
              <p
                className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                {industry.oneLine}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
