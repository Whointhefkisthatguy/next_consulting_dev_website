import Link from "next/link";

const QUALIFIERS: string[] = [
  "You're already running 7+ figures and your worst leak is operational, not awareness.",
  "You'll let your team actually use the system. Installed compliance only works if the crew logs in.",
  "You want one owned operating system, not five rented tools stitched together.",
];

export default function QualificationGate() {
  return (
    <section
      className="py-24 px-6 sm:px-14"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[900px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § A short honesty check
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em]"
          style={{ color: "var(--cream)" }}
        >
          NEXT isn't for everyone.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[680px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          The system only works if the operator is ready for it. Three quick
          checks before we book a call.
        </p>

        <ul className="mt-10 space-y-5">
          {QUALIFIERS.map((q, i) => (
            <li
              key={i}
              className="grid grid-cols-[28px_1fr] gap-4 items-start"
            >
              <span
                aria-hidden="true"
                className="mt-2 block w-2 h-2"
                style={{ background: "var(--copper)" }}
              />
              <p
                className="font-[var(--font-body)] text-base sm:text-lg leading-relaxed"
                style={{ color: "rgba(240,235,227,0.85)" }}
              >
                {q}
              </p>
            </li>
          ))}
        </ul>

        <p
          className="mt-12 font-[var(--font-body)] italic text-base leading-relaxed"
          style={{ color: "rgba(240,235,227,0.65)" }}
        >
          If two of three are true, the diagnostic is the right first move.
        </p>

        <div className="mt-8">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            Run the diagnostic
            <svg
              width="14"
              height="14"
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
