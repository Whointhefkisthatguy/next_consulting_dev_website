import type { Metadata } from "next";
import Link from "next/link";
import PricingLadder from "@/components/home/PricingLadder";

export const metadata: Metadata = {
  title: "Pricing — Next Consulting",
  description:
    "Published on the site, not hidden behind intake calls. Foundation $3,000–$5,500. Automation and Scale custom-scoped. You own everything from day one.",
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

type IncludedItem = { title: string; body: string };

const FOUNDATION_INCLUDES: IncludedItem[] = [
  {
    title: "Custom site build.",
    body:
      "Up to a dozen unique page templates, designed and developed from scratch against your customer journey. No WordPress themes.",
  },
  {
    title: "Brand system.",
    body:
      "Logo audit or rebuild, type system, color tokens, document templates, social kit. Delivered as editable source files.",
  },
  {
    title: "Performance baseline.",
    body:
      "Mobile PageSpeed ≥ 90. LCP under 2.5 seconds. Fully indexed structured data. Analytics wired before launch.",
  },
  {
    title: "Ownership handoff.",
    body:
      "Source repo, hosting account, domain settings, and every vendor login handed to you when Phase 1 ships.",
  },
  {
    title: "30 days post-launch.",
    body:
      "Bug fixes, small copy changes, and performance tuning free of charge for the first 30 days after go-live.",
  },
];

type FAQ = { q: string; a: string };

const FAQ_ITEMS: FAQ[] = [
  {
    q: "What's the payment schedule?",
    a: "50% to kick off, 50% at launch. Milestones spelled out in the signed proposal. No surprise invoices, no scope-creep billing.",
  },
  {
    q: "Can I stop between phases?",
    a: "Yes. Phases are bought in order but never as a bundle. When Phase 1 ships, you decide whether to engage Phase 2. You keep everything delivered to date.",
  },
  {
    q: "What if I already have a website?",
    a: "We'll audit it first. If it's structurally sound, Phase 1 becomes a targeted rebuild of the pages that leak revenue. If it's built on sand, we rebuild. Audit is free via the Diagnostic.",
  },
  {
    q: "Do you require a retainer?",
    a: "No. Retainers are how agencies make bad work survive. Scale is ongoing by choice, priced monthly, cancellable any time.",
  },
  {
    q: "What does 'you own everything' actually mean?",
    a: "Code lives in a repo under your GitHub. Hosting, domain, DNS, analytics accounts are registered in your name. Design files are handed over in editable form. You could fire us and hire someone else tomorrow and lose nothing.",
  },
  {
    q: "Why isn't Automation priced the same way?",
    a: "Because the scope depends entirely on what your current operations look like. We quote it after one conversation — usually the same call that kicks off Phase 1.",
  },
];

export default function PricingPage() {
  return (
    <article className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[1100px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Pricing · Published
        </span>
        <h1
          className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-[-0.02em]"
          style={{ color: "var(--cream)" }}
        >
          Every phase has a price tag. You stop whenever.
        </h1>
        <p
          className={`mt-8 ${bodyClass}`}
          style={{ ...bodyStyle, maxWidth: "720px" }}
        >
          The agency industry runs on &ldquo;contact us for pricing.&rdquo;
          That phrase is the number-one trust-killer in home-service marketing,
          and the number-one reason contractors get burned. We publish the
          range that matters &mdash; Phase 1, the website that anchors the
          whole system &mdash; directly on the site. Phase 2 and Phase 3 are
          custom-scoped because the right scope depends on what your
          operations actually look like.
        </p>
      </div>

      {/* ═══ LADDER (reused homepage component, rendered inline) ═══ */}
      <div className="mt-8 -mx-6 sm:-mx-14">
        <PricingLadder />
      </div>

      <div className="max-w-[1100px] mx-auto">
        {/* ═══ § I — What Phase 1 includes ═══ */}
        <SectionEyebrow
          numeral="I"
          title="What Phase 1 ($3,000 – $5,500) includes"
        />

        <div className="space-y-10">
          {FOUNDATION_INCLUDES.map((item, i) => (
            <div key={item.title} className="flex items-start gap-6">
              <span
                className="shrink-0 font-[var(--font-display)] text-sm font-700 mt-1 tracking-[0.15em]"
                style={{ color: "var(--copper)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  className="font-[var(--font-display)] text-xl font-700 leading-tight"
                  style={{ color: "var(--cream)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-3 font-[var(--font-body)] text-[15px] leading-relaxed max-w-[680px]"
                  style={{ color: "rgba(240,235,227,0.65)" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ § II — Where the range lands ═══ */}
        <SectionEyebrow numeral="II" title="Where the range lands" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
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
              $3,000 &mdash; Floor
            </p>
            <p
              className="mt-4 font-[var(--font-display)] text-lg font-700 leading-tight"
              style={{ color: "var(--cream)" }}
            >
              Single-industry home-service site.
            </p>
            <p
              className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
              style={{ color: "rgba(240,235,227,0.6)" }}
            >
              Five to eight pages, one service vertical, lead form to email,
              existing brand. Launch inside six weeks.
            </p>
          </div>
          <div
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
              $5,500 &mdash; Ceiling
            </p>
            <p
              className="mt-4 font-[var(--font-display)] text-lg font-700 leading-tight"
              style={{ color: "var(--cream)" }}
            >
              Multi-trade site + brand rebuild.
            </p>
            <p
              className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
              style={{ color: "rgba(240,235,227,0.6)" }}
            >
              Ten-plus pages, multiple service verticals, full brand system,
              CRM integration, structured-data SEO pass. Launch inside
              eight to ten weeks.
            </p>
          </div>
        </div>

        {/* ═══ § III — What's NOT included ═══ */}
        <SectionEyebrow numeral="III" title="What's NOT included (and won't be padded in)" />
        <p className={bodyClass} style={bodyStyle}>
          Third-party subscriptions run under your own accounts &mdash;
          hosting, email sending, CRM seats, analytics, ad budgets. We tell
          you every line item before you sign. We never mark them up, and we
          never bundle them into our invoice to make it look like we&rsquo;re
          cheaper than we are. Expect $60&ndash;$200/month in platform fees
          depending on traffic and feature mix.
        </p>

        {/* ═══ § IV — FAQ ═══ */}
        <SectionEyebrow numeral="IV" title="FAQ" />

        <div className="space-y-12">
          {FAQ_ITEMS.map((item) => (
            <div key={item.q}>
              <h3
                className="font-[var(--font-display)] text-lg sm:text-xl font-700 leading-tight"
                style={{ color: "var(--cream)" }}
              >
                {item.q}
              </h3>
              <p
                className="mt-3 font-[var(--font-body)] text-base leading-relaxed max-w-[720px]"
                style={{ color: "rgba(240,235,227,0.65)" }}
              >
                {item.a}
              </p>
            </div>
          ))}
        </div>

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
  );
}
