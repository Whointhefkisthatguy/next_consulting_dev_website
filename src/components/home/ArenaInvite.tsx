import Link from "next/link";
import { positioning } from "@/content/site/positioning";

export default function ArenaInvite() {
  const { eyebrow, headline, body, ctaLabel, href, external } = positioning.arena;
  return (
    <section
      id="arena"
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
          § {eyebrow}
        </span>
        <h2
          className="mt-5 font-[var(--font-display)] font-700 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          {headline}
        </h2>
        <p
          className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[720px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          {body}
        </p>

        <div className="mt-10">
          <Link
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
