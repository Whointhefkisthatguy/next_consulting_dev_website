import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Arena — Next Consulting",
  description:
    "Don't believe us. Pay the crowd. Real builders fight tournament-style to earn your business — we're only here to see you win.",
};

const bodyClass =
  "font-[var(--font-body)] text-lg leading-[1.75] tracking-[0.005em]";
const bodyStyle = { color: "rgba(240,235,227,0.78)" } as const;

function SectionEyebrow({
  numeral,
  title,
}: {
  numeral: string;
  title: string;
}) {
  return (
    <div
      className="mt-20 mb-10 pt-10 flex items-baseline gap-4"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <span
        className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
        style={{ color: "var(--copper)" }}
      >
        § {numeral}
      </span>
      <span
        className="font-[var(--font-display)] text-xs font-500 tracking-[0.25em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        {title}
      </span>
    </div>
  );
}

type Step = { n: string; title: string; body: string };

const STEPS: Step[] = [
  {
    n: "01",
    title: "Post the brief.",
    body:
      "You write what you need built — a site, a rebrand, a landing page — and set the prize. Everything is public: the brief, the budget, the deadline.",
  },
  {
    n: "02",
    title: "Builders compete for five days.",
    body:
      "Vetted builders submit real work against your brief. No spec-work sleight of hand. No anonymous junior designers. Every submission is named and visible.",
  },
  {
    n: "03",
    title: "You watch in public.",
    body:
      "Submissions ladder in the open. You leave comments, direct iterations, and see taste expressed in minutes, not weeks.",
  },
  {
    n: "04",
    title: "You pick the winner.",
    body:
      "At the end of five days, you pick the work you actually want. The top builders get paid out of your prize pool. Losing builders do not get stiffed on dignity — the top three all take a cut.",
  },
  {
    n: "05",
    title: "You own everything.",
    body:
      "Source files, code, IP, the domain the work lives on — yours the moment you pay out. No retainers. No licensing language. No one to call to export your own assets.",
  },
];

export default function Arena() {
  return (
    <article className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[900px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Arena
        </span>
        <h1
          className="mt-6 font-[var(--font-display)] font-800 text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.025em]"
          style={{ color: "var(--cream)" }}
        >
          Don&rsquo;t believe us.
          <br />
          Pay the crowd.
          <br />
          <span style={{ color: "var(--copper)" }}>
            We&rsquo;re only here to see you win.
          </span>
        </h1>

        <p
          className={`mt-10 ${bodyClass}`}
          style={{ ...bodyStyle, maxWidth: "720px" }}
        >
          Arena is the tournament we built for the buyers who should be
          skeptical of us. Post a brief. Real builders compete in the open
          for five days. You pick the winner, pay the crowd, and walk away
          with work you watched get made.
        </p>
        <p
          className={`mt-6 ${bodyClass}`}
          style={{ ...bodyStyle, maxWidth: "720px" }}
        >
          If NEXT is the right answer, you&rsquo;ll see it play out. If
          someone else builds it better, you get that work instead. Either
          way, the business problem gets solved &mdash; and that is the
          only outcome we are optimizing for.
        </p>

        {/* ═══ § I — How it works ═══ */}
        <SectionEyebrow numeral="I" title="How it works" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {STEPS.map((step) => (
            <div key={step.n}>
              <span
                className="font-[var(--font-display)] text-sm font-700 tracking-[0.15em]"
                style={{ color: "var(--copper)" }}
              >
                {step.n}
              </span>
              <h3
                className="mt-2 font-[var(--font-display)] text-xl font-700 leading-tight"
                style={{ color: "var(--cream)" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-3 font-[var(--font-body)] text-[15px] leading-relaxed"
                style={{ color: "rgba(240,235,227,0.6)" }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* ═══ § II — Why we built it ═══ */}
        <SectionEyebrow numeral="II" title="Why we built it" />

        <p className={bodyClass} style={bodyStyle}>
          Every agency in this category sells trust as a retainer. You sign
          a contract, you wait a quarter, you see a deck, you hope. If the
          work is bad, the cost of leaving is the cost of starting over.
          That dynamic is the entire business model of the firms NEXT
          competes with.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Arena breaks it. The skeptic buyer does not have to take our word
          for anything. Post the brief, let the crowd compete, see the
          submissions, pay the winner. If we win, we earned it in public.
          If a better builder wins, you got what you came for &mdash; and
          we learn who to partner with next.
        </p>

        <blockquote
          className="my-12 font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed text-center"
          style={{ color: "#f0ebe3", opacity: 0.55 }}
        >
          Nothing about our model survives without transparency.
          <br />
          So we stopped pretending we&rsquo;re the only answer.
        </blockquote>

        {/* ═══ § III — How it pairs with NEXT ═══ */}
        <SectionEyebrow numeral="III" title="How it pairs with NEXT" />

        <p className={bodyClass} style={bodyStyle}>
          Arena is the on-ramp. NEXT is the full installation.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          You can run Arena and stop there &mdash; you walk away with a
          finished deliverable, owned outright. Or you can use Arena to
          prove the website out, then keep building with us on Phase 2
          (Automation) and Phase 3 (Scale). Builders who win Arena
          contests often end up joining our delivery network, which is how
          the system compounds in both directions: you get proof on the
          way in, we get talent on the way out.
        </p>

        {/* ═══ § IV — Get early access ═══ */}
        <SectionEyebrow numeral="IV" title="Get early access" />

        <p className={bodyClass} style={bodyStyle}>
          Arena is live in private and opening publicly soon. If you want
          a seat in the first cohort of public briefs &mdash; or you want
          to compete as a builder &mdash; tell us what you&rsquo;d post.
        </p>

        <div
          className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
          <Link
            href="/contact?interest=arena"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            Get early access
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
