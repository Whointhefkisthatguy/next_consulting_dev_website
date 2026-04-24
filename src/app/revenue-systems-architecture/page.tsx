import type { Metadata } from "next";
import Link from "next/link";
import RSAHero from "@/components/squeeze/revenue-systems-architecture/RSAHero";

export const metadata: Metadata = {
  title: "Revenue Systems Architecture — Next Consulting",
  description:
    "The operating-system thesis, laid out in full. Five layers — brand, website, capture, automation, reporting — installed as one owned stack instead of five rented pieces.",
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

function Pullquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-12 font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed text-center"
      style={{ color: "#f0ebe3", opacity: 0.55 }}
    >
      {children}
    </blockquote>
  );
}

type Layer = {
  n: string;
  name: string;
  question: string;
  body: string;
  owned: string;
  rented: string;
};

const LAYERS: Layer[] = [
  {
    n: "00",
    name: "Brand",
    question: "Who are you?",
    body: "The identity that every other layer inherits from. Name, mark, tone, typography, color. Not decoration — the substrate. When the brand is inconsistent, every downstream layer costs more to produce and converts less.",
    owned: "Source files, design tokens, type licenses, usage rules — in a folder with your name on it.",
    rented: "Canva templates, stock logos, PowerPoint screenshots.",
  },
  {
    n: "01",
    name: "Website",
    question: "Where does the stranger land?",
    body: "The first forty-eight hours. Load speed, clarity, conversion. A site that loads in four seconds is a broken layer no matter how pretty it is. This is Phase 1 of the installation — nothing above it can compound until this runs.",
    owned: "A repo, a hosting account, a domain, an analytics account — all registered to you.",
    rented: "A Wix subscription, a CMS theme you can't export, a platform that holds your data hostage.",
  },
  {
    n: "02",
    name: "Capture",
    question: "What happens when someone says yes?",
    body: "Lead forms, scheduling, payment, CRM. The seam where most revenue leaks. A form that fires into a dead inbox is architecture that isn't there. A CRM you rent per seat is architecture you don't own.",
    owned: "A database under your control, inquiry records you can export, an integration layer written to your spec.",
    rented: "A vendor's lead inbox, a dashboard you log into monthly, a CRM where 'your' contacts are audited by someone else's sales team.",
  },
  {
    n: "03",
    name: "Automation",
    question: "What runs without you?",
    body: "Follow-up sequences, quoting, invoicing, status updates, reporting digests. The manual steps your team shouldn't still be doing. This is Phase 2 — and it only works on top of Layer 02 actually being real.",
    owned: "Workflows written into code you can read. Vendors you can swap. Logic documented somewhere other than one employee's head.",
    rented: "A chatbot widget. A Zap someone built in 2023 that nobody remembers the login for. An 'AI agent' that's a prompt and a prayer.",
  },
  {
    n: "04",
    name: "Feedback",
    question: "How do you know it's working?",
    body: "Reporting that ties to revenue. Channel attribution. Weekly numbers. Quarterly architecture review. This is Phase 3 — the compounding layer. Without it, the rest of the stack drifts silently.",
    owned: "One dashboard answering one question — did the number go up. Access to the raw data underneath.",
    rented: "A monthly PDF with vanity metrics. Screenshots from a vendor's platform that you can't audit.",
  },
];

export default function RevenueSystemsArchitecture() {
  return (
    <>
      <RSAHero />

      <article className="pb-28 px-6 sm:px-14">
        <div className="max-w-[900px] mx-auto">
        <p
          className={`${bodyClass}`}
          style={{ ...bodyStyle, maxWidth: "720px" }}
        >
          Everything Next Consulting does, every phase we sell, every
          conversation we have, eventually routes back to this one idea.
          The rest of this page lays it out layer by layer.
        </p>

        {/* ═══ § I — The problem with 'services' ═══ */}
        <SectionEyebrow numeral="I" title="The problem with 'services'" />

        <p className={bodyClass} style={bodyStyle}>
          Every firm in this category sells pieces. A website shop over
          here. A branding agency over there. A CRM vendor. A marketing
          consultant. An automation contractor. An SEO retainer. A social
          agency. Each piece is competent in isolation. None of them talk
          to each other. The contractor buying them spends a decade
          stitching seams that keep coming apart.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          The revenue leak is never in a single piece. It is always at the
          seam: the form that doesn&rsquo;t fire to the CRM, the lead that
          doesn&rsquo;t get to the follow-up queue, the follow-up that
          doesn&rsquo;t attach to the quote, the quote that doesn&rsquo;t
          tie back to reporting. Agencies sell into the seams on purpose.
          Seams are recurring revenue for them. Seams are how they stay.
        </p>

        <Pullquote>
          The piece is never the problem. The seam is the problem.
        </Pullquote>

        {/* ═══ § II — What an operating system is ═══ */}
        <SectionEyebrow numeral="II" title="What an operating system actually is" />

        <p className={bodyClass} style={bodyStyle}>
          Borrow the word from software. macOS is not a collection of
          features you rent from Apple &mdash; it is an installed stack
          where every layer knows about every other layer by design. The
          keyboard drivers know about the window server. The window server
          knows about the file system. The file system knows about the
          kernel. That coherence is why you can open a document and it
          just works.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          An operating system for revenue is the same idea, applied to a
          business. Brand knows about the website. The website knows about
          capture. Capture knows about automation. Automation knows about
          reporting. When a customer touches the system at any layer, the
          whole stack responds &mdash; because it was designed to.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          You cannot buy that at a marketplace. You install it.
        </p>

        {/* ═══ § III — The five layers ═══ */}
        <SectionEyebrow numeral="III" title="The five layers" />

        <p className={bodyClass} style={bodyStyle}>
          The stack reads bottom-up. You cannot skip a layer. A rented
          piece at any layer breaks every layer above it.
        </p>

        <div className="mt-12 space-y-12">
          {LAYERS.map((layer) => (
            <div
              key={layer.n}
              style={{
                padding: "28px",
                border: "1px solid var(--divider)",
                background: "var(--surface)",
              }}
            >
              <div className="flex items-baseline gap-4 flex-wrap">
                <span
                  className="font-[var(--font-display)] text-xs font-700 tracking-[0.25em] uppercase"
                  style={{ color: "var(--copper)" }}
                >
                  Layer {layer.n}
                </span>
                <h3
                  className="font-[var(--font-display)] text-2xl font-700 tracking-[-0.01em]"
                  style={{ color: "var(--cream)" }}
                >
                  {layer.name}
                </h3>
              </div>
              <p
                className="mt-2 font-[var(--font-body)] italic text-base"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                {layer.question}
              </p>
              <p
                className="mt-5 font-[var(--font-body)] text-[15px] leading-relaxed"
                style={{ color: "rgba(240,235,227,0.7)" }}
              >
                {layer.body}
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  style={{
                    padding: "16px",
                    borderLeft: "2px solid var(--copper)",
                    background: "rgba(196,131,90,0.04)",
                  }}
                >
                  <p
                    className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                    style={{ color: "var(--copper)" }}
                  >
                    Owned
                  </p>
                  <p
                    className="mt-2 font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "rgba(240,235,227,0.75)" }}
                  >
                    {layer.owned}
                  </p>
                </div>
                <div
                  style={{
                    padding: "16px",
                    borderLeft: "2px solid rgba(240,235,227,0.2)",
                  }}
                >
                  <p
                    className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                    style={{ color: "var(--muted)" }}
                  >
                    Rented
                  </p>
                  <p
                    className="mt-2 font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "rgba(240,235,227,0.5)" }}
                  >
                    {layer.rented}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ § IV — Why this compounds ═══ */}
        <SectionEyebrow numeral="IV" title="Why this compounds (and nothing else does)" />

        <p className={bodyClass} style={bodyStyle}>
          An owned stack compounds because every layer you fix makes every
          layer above it cheaper to operate. Fix the brand; the website
          converts harder. Fix the website; capture rates go up. Fix
          capture; automation gets something real to work with. Fix
          automation; your team stops spending two hours a day on
          follow-up. Fix reporting; you actually know which channel is
          worth scaling, so Scale stops being a guess.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          A rented stack decays because every vendor&rsquo;s incentive is
          to widen their own seam. Price increases, feature deprecations,
          support tickets, data lock-in. The agency isn&rsquo;t plotting
          against you. They just don&rsquo;t compound in your direction.
        </p>

        <Pullquote>
          Owned stacks compound. Rented stacks decay.
          <br />
          Nothing about the math is subtle.
        </Pullquote>

        {/* ═══ § V — Installation order ═══ */}
        <SectionEyebrow numeral="V" title="Installation order (Foundation → Automation → Scale)" />

        <p className={bodyClass} style={bodyStyle}>
          The phases on the pricing page aren&rsquo;t service SKUs. They
          are the installation order for the five layers above.
        </p>
        <div className="mt-10 space-y-8">
          <div>
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              Phase 1 &middot; Foundation
            </span>
            <p
              className="mt-3 font-[var(--font-body)] text-base leading-relaxed"
              style={{ color: "rgba(240,235,227,0.75)" }}
            >
              Installs Layer 00 (Brand) and Layer 01 (Website). Credibility
              and entry. Nothing else works until this does.
            </p>
            <p className="mt-2">
              <Link
                href="/websites"
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
                style={{ color: "var(--copper)" }}
              >
                Websites →
              </Link>
              <span className="mx-3" style={{ color: "var(--muted)" }}>
                ·
              </span>
              <Link
                href="/graphic-design"
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
                style={{ color: "var(--copper)" }}
              >
                Graphic Design →
              </Link>
            </p>
          </div>
          <div>
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              Phase 2 &middot; Automation
            </span>
            <p
              className="mt-3 font-[var(--font-body)] text-base leading-relaxed"
              style={{ color: "rgba(240,235,227,0.75)" }}
            >
              Installs Layer 02 (Capture) and Layer 03 (Automation). The
              revenue-producing plumbing behind the site.
            </p>
            <p className="mt-2">
              <Link
                href="/automation"
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
                style={{ color: "var(--copper)" }}
              >
                Automation →
              </Link>
            </p>
          </div>
          <div>
            <span
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              Phase 3 &middot; Scale
            </span>
            <p
              className="mt-3 font-[var(--font-body)] text-base leading-relaxed"
              style={{ color: "rgba(240,235,227,0.75)" }}
            >
              Installs Layer 04 (Feedback). Ongoing iteration, new
              channels, architecture reviews. Compounding begins here and
              runs indefinitely.
            </p>
            <p className="mt-2">
              <Link
                href="/scale"
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
                style={{ color: "var(--copper)" }}
              >
                Scale →
              </Link>
              <span className="mx-3" style={{ color: "var(--muted)" }}>
                ·
              </span>
              <Link
                href="/pricing"
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity hover:opacity-80"
                style={{ color: "var(--copper)" }}
              >
                Pricing →
              </Link>
            </p>
          </div>
        </div>

        {/* ═══ § VI — Where to start ═══ */}
        <SectionEyebrow numeral="VI" title="Where to start (three doors, one room)" />

        <p className={bodyClass} style={bodyStyle}>
          Every other page on this site is a door into the same
          architecture. Pick the one that fits how you think.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/manifesto"
            className="group block p-6 transition-colors"
            style={{
              border: "1px solid var(--divider)",
              background: "var(--surface)",
            }}
          >
            <p
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              Door 01 &middot; Read
            </p>
            <h3
              className="mt-4 font-[var(--font-display)] text-xl font-700 leading-tight group-hover:text-[var(--copper)] transition-colors"
              style={{ color: "var(--cream)" }}
            >
              Read the Manifesto
            </h3>
            <p
              className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              Why the Marketing-Industrial Complex exists, what it costs
              you, and why transparency is the only way out.
            </p>
          </Link>

          <Link
            href="/diagnostic"
            className="group block p-6 transition-colors"
            style={{
              border: "1px solid var(--divider)",
              background: "var(--surface)",
            }}
          >
            <p
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              Door 02 &middot; Get Scored
            </p>
            <h3
              className="mt-4 font-[var(--font-display)] text-xl font-700 leading-tight group-hover:text-[var(--copper)] transition-colors"
              style={{ color: "var(--cream)" }}
            >
              Run the Diagnostic
            </h3>
            <p
              className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              A human-written System Score across all five layers, sent
              inside 24 hours. No chatbot, no auto-report.
            </p>
          </Link>

          <Link
            href="/arena"
            className="group block p-6 transition-colors"
            style={{
              border: "1px solid var(--divider)",
              background: "var(--surface)",
            }}
          >
            <p
              className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
              style={{ color: "var(--copper)" }}
            >
              Door 03 &middot; Pay the Crowd
            </p>
            <h3
              className="mt-4 font-[var(--font-display)] text-xl font-700 leading-tight group-hover:text-[var(--copper)] transition-colors"
              style={{ color: "var(--cream)" }}
            >
              Enter the Arena
            </h3>
            <p
              className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
              style={{ color: "rgba(240,235,227,0.55)" }}
            >
              Don&rsquo;t believe us. Post a brief, let real builders
              fight tournament-style for your business, pick the winner.
            </p>
          </Link>
        </div>

        <p
          className="mt-12 font-[var(--font-display)] font-700 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.01em]"
          style={{ color: "var(--cream)" }}
        >
          Every door opens into the same room. The room is the
          architecture.
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
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            Install the system
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
