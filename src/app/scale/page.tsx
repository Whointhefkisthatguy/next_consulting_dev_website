import type { Metadata } from "next";
import Link from "next/link";
import ScaleHero from "@/components/squeeze/scale/ScaleHero";

export const metadata: Metadata = {
  title: "Scale — Next Consulting",
  description:
    "Phase 3. Ongoing iteration, new channels, reporting that tells you what's actually working — on top of a Foundation and Automation that are already live.",
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

type Area = { n: string; title: string; body: string };

const AREAS: Area[] = [
  {
    n: "01",
    title: "Conversion iteration.",
    body:
      "Weekly review of what the site is actually doing. What pages are leaking. Which offers are converting. Which forms die on mobile. Small, tested changes — not redesigns.",
  },
  {
    n: "02",
    title: "New channels.",
    body:
      "SEO, SEM, paid social, local service ads, OTT, direct mail — picked one at a time based on what your customer data actually says about where they came from. Nothing runs without a measurement plan.",
  },
  {
    n: "03",
    title: "Reporting.",
    body:
      "One dashboard that answers one question: did the number go up. Weekly digest. Nothing fake, nothing vanity. If we can't defend a metric, we don't report it.",
  },
  {
    n: "04",
    title: "Architecture review.",
    body:
      "Quarterly check on the Foundation and Automation layers. What's drifted. What's broken silently. What your team is doing manually that should be re-automated. We keep the system a system.",
  },
];

export default function ScalePage() {
  return (
    <>
      <ScaleHero />

      <article className="pb-28 px-6 sm:px-14">
        <div className="max-w-[900px] mx-auto">
        <p
          className={`${bodyClass}`}
          style={{ ...bodyStyle, maxWidth: "720px" }}
        >
          Ads, content, channels, funnels. The reason the industry&rsquo;s
          version of Scale doesn&rsquo;t work is that it runs on top of
          nothing. Foundation isn&rsquo;t there; Automation isn&rsquo;t
          there; every dollar added to the top of the funnel leaks out
          through a broken system somewhere downstream.
        </p>
        <p
          className={`mt-6 ${bodyClass}`}
          style={{ ...bodyStyle, maxWidth: "720px" }}
        >
          Our version of Scale runs last on purpose. By the time we get here,
          the site converts, the follow-up runs on autopilot, and the
          reporting actually ties back to revenue. At that point, adding
          channels compounds instead of leaking.
        </p>

        {/* ═══ § I — What Scale covers ═══ */}
        <SectionEyebrow numeral="I" title="What Scale covers" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
          {AREAS.map((area) => (
            <div key={area.n}>
              <span
                className="font-[var(--font-display)] text-sm font-700 tracking-[0.15em]"
                style={{ color: "var(--copper)" }}
              >
                {area.n}
              </span>
              <h3
                className="mt-2 font-[var(--font-display)] text-xl font-700 leading-tight"
                style={{ color: "var(--cream)" }}
              >
                {area.title}
              </h3>
              <p
                className="mt-3 font-[var(--font-body)] text-[15px] leading-relaxed"
                style={{ color: "rgba(240,235,227,0.6)" }}
              >
                {area.body}
              </p>
            </div>
          ))}
        </div>

        {/* ═══ § II — Why it comes last ═══ */}
        <SectionEyebrow numeral="II" title="Why it comes last" />
        <p className={bodyClass} style={bodyStyle}>
          Scale on a broken Foundation is expensive noise. You can generate
          five thousand leads and close thirty of them because the site
          didn&rsquo;t load, the form didn&rsquo;t fire, the CRM never got
          the record, the follow-up went to a dead inbox, and the call-back
          happened four days too late. Every one of those failures was a
          system problem, not a marketing problem.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Phase 1 fixes credibility. Phase 2 fixes operations. Phase 3 is
          where the compounding happens — and it compounds because the first
          two are done.
        </p>

        <blockquote
          className="my-12 font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed text-center"
          style={{ color: "#f0ebe3", opacity: 0.55 }}
        >
          Scale is the only phase the Marketing-Industrial Complex knows how
          to sell. It is also the only phase that should be bought last.
        </blockquote>

        {/* ═══ § III — Cadence ═══ */}
        <SectionEyebrow numeral="III" title="Cadence" />
        <p className={bodyClass} style={bodyStyle}>
          Scale is a standing engagement, not a campaign. We check in every
          week on the number, every month on the channel mix, every quarter
          on the architecture underneath. You stop whenever. Everything we
          build continues working when you do.
        </p>

        {/* ═══ § IV — How pricing works ═══ */}
        <SectionEyebrow numeral="IV" title="How pricing works" />
        <p className={bodyClass} style={bodyStyle}>
          Scale is custom-scoped because the right channel mix depends on
          what Phase 1 and Phase 2 revealed about your actual customer.
          We&rsquo;ll quote it straight after one conversation.
        </p>

        {/* ═══ FOOTER CTA ═══ */}
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
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        </div>
      </article>
    </>
  );
}
