import Link from "next/link";
import { positioning } from "@/content/site/positioning";

const NAME_BY_SLUG: Record<string, string> = Object.fromEntries(
  positioning.modules.map((m) => [m.slug, m.name])
);

export default function ModuleSequence() {
  return (
    <section
      id="operating-system"
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
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
          § The Operating System
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          Five modules. Bought in order. Stop whenever.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[720px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          Every module is sold as a specific, bounded promise. Each one is built
          to deliver roughly twice that. The second half is always
          instrumentation that sees further down the funnel than you asked for,
          and it surfaces the next problem in your own numbers.
        </p>

        <ol className="mt-16 space-y-6">
          {positioning.modules.map((m, i) => (
            <li
              key={m.slug}
              className="relative grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 sm:gap-10 p-6 sm:p-10"
              style={{
                border: "1px solid var(--divider)",
                background: "var(--surface)",
              }}
            >
              {/* Left rail: big copper numeral */}
              <div className="flex flex-col">
                <span
                  className="font-[var(--font-display)] font-800 leading-none tracking-[-0.04em] text-[clamp(3rem,7vw,5rem)]"
                  style={{ color: "var(--copper)" }}
                >
                  {m.number}
                </span>
                <span
                  className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(240,235,227,0.45)" }}
                >
                  Module
                </span>
              </div>

              {/* Right: module body */}
              <div>
                <h3
                  className="font-[var(--font-display)] font-700 leading-tight text-[clamp(1.4rem,2.6vw,2rem)] tracking-[-0.01em]"
                  style={{ color: "var(--cream)" }}
                >
                  {m.name}
                </h3>

                <p
                  className="mt-4 font-[var(--font-body)] italic text-base sm:text-lg leading-relaxed"
                  style={{ color: "rgba(240,235,227,0.65)" }}
                >
                  &ldquo;{m.lens}&rdquo;
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <span
                      className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase"
                      style={{ color: "var(--copper)" }}
                    >
                      Sold as
                    </span>
                    <p
                      className="mt-2 font-[var(--font-body)] text-sm leading-relaxed"
                      style={{ color: "rgba(240,235,227,0.78)" }}
                    >
                      {m.soldAs}
                    </p>
                  </div>
                  <div>
                    <span
                      className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase"
                      style={{ color: "var(--copper)" }}
                    >
                      Built as (the 2x)
                    </span>
                    <p
                      className="mt-2 font-[var(--font-body)] text-sm leading-relaxed"
                      style={{ color: "rgba(240,235,227,0.78)" }}
                    >
                      {m.builtAs}
                    </p>
                  </div>
                </div>

                {m.handsOffTo && (
                  <div
                    className="mt-7 pt-5"
                    style={{ borderTop: "1px solid var(--divider)" }}
                  >
                    <span
                      className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase"
                      style={{ color: "rgba(240,235,227,0.45)" }}
                    >
                      Hands off to
                    </span>{" "}
                    <span
                      className="ml-2 font-[var(--font-display)] text-sm font-600 tracking-[0.05em]"
                      style={{ color: "var(--copper)" }}
                    >
                      {String(positioning.modules[i + 1]?.number ?? "")}{" "}
                      {NAME_BY_SLUG[m.handsOffTo]}
                    </span>
                  </div>
                )}
                {!m.handsOffTo && (
                  <div
                    className="mt-7 pt-5"
                    style={{ borderTop: "1px solid var(--divider)" }}
                  >
                    <span
                      className="font-[var(--font-display)] text-[10px] font-600 tracking-[0.25em] uppercase"
                      style={{ color: "rgba(240,235,227,0.45)" }}
                    >
                      Closes the loop
                    </span>{" "}
                    <span
                      className="ml-2 font-[var(--font-body)] text-sm italic"
                      style={{ color: "rgba(240,235,227,0.65)" }}
                    >
                      The OS now compounds on its own data.
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <Link
            href="/insights/01-recursive-business-management-system"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            Read the full architecture
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
      </div>
    </section>
  );
}
