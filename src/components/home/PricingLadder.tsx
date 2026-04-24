import { positioning } from "@/content/site/positioning";

export default function PricingLadder() {
  return (
    <section
      id="pricing"
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Pricing · Transparent
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-3xl sm:text-4xl leading-tight"
          style={{ color: "var(--cream)" }}
        >
          Every phase has a price tag. You stop whenever.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[640px]"
          style={{ color: "rgba(240,235,227,0.55)" }}
        >
          No &ldquo;contact us for pricing.&rdquo; No retainer theater. You own
          the code, the data, and the domain the day Phase 1 ships.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {positioning.pricing.map((tier) => (
            <div
              key={tier.phaseSlug}
              style={{
                padding: "28px",
                border: "1px solid var(--divider)",
                background: "var(--surface)",
              }}
            >
              <p
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                style={{ color: "var(--copper)" }}
              >
                {tier.label}
              </p>
              <p
                className="mt-5 font-[var(--font-display)] font-800 text-[clamp(1.75rem,3vw,2.25rem)] leading-none"
                style={{ color: "var(--cream)" }}
              >
                {tier.priceRange}
              </p>
              <p
                className="mt-5 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                {tier.oneLiner}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
