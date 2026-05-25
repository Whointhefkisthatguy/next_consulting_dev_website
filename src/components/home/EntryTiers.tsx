import Link from "next/link";
import { positioning } from "@/content/site/positioning";

function formatDollars(n: number): string {
  return n.toLocaleString("en-US");
}

export default function EntryTiers() {
  return (
    <section
      id="entry-tiers"
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Where to start · Three doors
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          You pick the door. Each one is the first move of the same OS.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[700px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          Buy the door that matches whichever bleed is worst right now. Every
          tier is the start of a full operating system, so you keep the option
          open to expand later when your own data tells you to.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {positioning.entryTiers.map((tier) => (
            <div
              key={tier.slug}
              className="flex flex-col"
              style={{
                padding: "32px",
                border: "1px solid var(--divider)",
                background: "var(--surface)",
              }}
            >
              <span
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                style={{ color: "var(--copper)" }}
              >
                Tier {tier.number} · {tier.name}
              </span>

              <p
                className="mt-5 font-[var(--font-display)] font-700 text-xl sm:text-2xl leading-tight"
                style={{ color: "var(--cream)" }}
              >
                &ldquo;{tier.lensQuote}&rdquo;
              </p>

              <p
                className="mt-5 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.6)" }}
              >
                <span
                  className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase block mb-1"
                  style={{ color: "rgba(240,235,227,0.45)" }}
                >
                  First installed
                </span>
                {tier.firstModule}
              </p>

              {/* Pricing block */}
              <div
                className="mt-7 pt-6 grid grid-cols-2 gap-4"
                style={{ borderTop: "1px solid var(--divider)" }}
              >
                <div>
                  <span
                    className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase block"
                    style={{ color: "rgba(240,235,227,0.45)" }}
                  >
                    Build
                  </span>
                  <p
                    className="mt-2 font-[var(--font-display)] font-800 text-[clamp(1.4rem,2.4vw,1.85rem)] leading-none"
                    style={{ color: "var(--cream)" }}
                  >
                    <span
                      className="text-[10px] font-600 tracking-[0.2em] uppercase align-middle mr-1"
                      style={{ color: "rgba(240,235,227,0.5)" }}
                    >
                      From
                    </span>
                    ${formatDollars(tier.buildFrom)}
                  </p>
                </div>
                <div>
                  <span
                    className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase block"
                    style={{ color: "rgba(240,235,227,0.45)" }}
                  >
                    Then
                  </span>
                  <p
                    className="mt-2 font-[var(--font-display)] font-800 text-[clamp(1.4rem,2.4vw,1.85rem)] leading-none"
                    style={{ color: "var(--cream)" }}
                  >
                    ${formatDollars(tier.monthly)}
                    <span
                      className="text-[10px] font-600 tracking-[0.2em] uppercase align-middle ml-1"
                      style={{ color: "rgba(240,235,227,0.5)" }}
                    >
                      / mo
                    </span>
                  </p>
                </div>
              </div>

              <p
                className="mt-6 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.6)" }}
              >
                <span
                  className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase block mb-1"
                  style={{ color: "rgba(240,235,227,0.45)" }}
                >
                  Expansion path
                </span>
                {tier.expansionPath}
              </p>

              <div className="flex-1" />

              <Link
                href={tier.contactHref}
                className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 font-[var(--font-display)] text-[11px] font-600 tracking-[0.18em] uppercase border transition-colors duration-300 hover:bg-[var(--copper)] hover:text-[var(--void)]"
                style={{
                  borderColor: "var(--copper)",
                  color: "var(--copper)",
                }}
              >
                Start with Tier {tier.number}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        <p
          className="mt-10 font-[var(--font-body)] italic text-sm leading-relaxed max-w-[760px]"
          style={{ color: "rgba(240,235,227,0.5)" }}
        >
          Build fees scale with the scope of your operation. The figures above
          are floors. Larger crews and more complex workflows are priced on
          consultation.
        </p>
      </div>
    </section>
  );
}
