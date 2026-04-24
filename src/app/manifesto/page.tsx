import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifesto — Next Consulting",
  description:
    "The Marketing-Industrial Complex is lying to your business. Here is what we actually sell, and why.",
};

const bodyClass =
  "font-[var(--font-body)] text-lg leading-[1.75] tracking-[0.005em]";
const bodyStyle = { color: "rgba(240,235,227,0.78)" } as const;
const phaseNameClass =
  "font-[var(--font-display)] font-700 tracking-[-0.01em]";
const phaseNameStyle = { color: "var(--cream)" } as const;

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

export default function Manifesto() {
  return (
    <article className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[760px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Manifesto
        </span>
        <h1
          className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-[-0.02em]"
          style={{ color: "var(--cream)" }}
        >
          The Marketing-Industrial Complex is Lying to Your Business.
        </h1>
        <p
          className="mt-4 font-[var(--font-display)] text-xs font-500 tracking-[0.2em] uppercase"
          style={{ color: "var(--muted)" }}
        >
          Shawn Beekman &middot; April 2026
        </p>

        {/* ═══ § I — The Lie ═══ */}
        <SectionEyebrow numeral="I" title="The Lie" />

        <p className={bodyClass} style={bodyStyle}>
          There is an entire industry whose business model depends on you not
          understanding what is happening inside your own company.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          It has a thousand names. Lead generation. Digital marketing. Funnel
          optimization. Growth hacking. The labels change every three years,
          but the structure never does. You pay someone a retainer. They send
          you a report. The numbers on the report go up. The money in your
          bank account does not. When you ask why, you are told the market is
          soft, the algorithm changed, the competition is aggressive, the
          creative needs refreshing. You pay for the refresh. The cycle
          continues.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Peter Drucker &mdash; who had the unfashionable habit of telling
          executives the truth &mdash; wrote a sentence that the industry
          has spent decades trying to help its clients forget.
        </p>

        <div className="my-10 py-4 text-center">
          <blockquote
            className="font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed"
            style={{ color: "#f0ebe3", opacity: 0.55 }}
          >
            &ldquo;The purpose of a business is to create a customer.&rdquo;
          </blockquote>
          <cite
            className="block mt-6 font-[var(--font-display)] not-italic text-xs font-500 tracking-[0.2em] uppercase"
            style={{ color: "#6b6560" }}
          >
            &mdash; Peter Drucker
          </cite>
        </div>

        <p className={bodyClass} style={bodyStyle}>
          Notice what he did not say. He did not say the purpose of a business
          is to generate leads. He did not say the purpose of a business is to
          optimize a funnel. He said{" "}
          <em className="italic" style={{ color: "var(--cream)" }}>
            create a customer.
          </em>{" "}
          One human being who chose you, paid you, came back, and told a
          friend. Everything a business does either produces that outcome or
          it does not.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          The Marketing-Industrial Complex has spent twenty years training its
          clients to forget that distinction.
        </p>

        {/* ═══ § II — What the Lie Costs ═══ */}
        <SectionEyebrow numeral="II" title="What the Lie Costs" />

        <p className={bodyClass} style={bodyStyle}>
          Here is what the forgetting looks like in practice. A home-service
          company in Phoenix &mdash; plumbing, roofing, HVAC, it doesn&rsquo;t
          matter &mdash; signs a contract with an agency. The agency runs ads.
          The ads drive traffic to a website the company does not own, built
          on a platform the company does not control, feeding a CRM the
          company rents by the seat. Leads come in. Leads get routed to a
          call center. The call center has its own dashboard. Appointments
          get booked. Appointments get canceled. Some appointments turn into
          revenue. The monthly report arrives, beautifully designed. The
          revenue number at the top is the only number anyone reads. And
          when the contract renews, the agency raises the rate, because
          costs have gone up.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          If you asked the owner of that business to draw, on a piece of
          paper, the system that produces their revenue &mdash; they
          couldn&rsquo;t. Not because they are not smart. Because they are
          not allowed to see it. The agency controls the ads. The platform
          controls the site. The CRM vendor controls the data. The call
          center controls the conversation. The owner controls the
          checkbook. That is the only piece of the system they are permitted
          to operate.
        </p>

        <Pullquote>
          This is not an accident. This is the product.
        </Pullquote>

        <p className={bodyClass} style={bodyStyle}>
          The Marketing-Industrial Complex sells opacity as a service. Every
          &ldquo;custom quote,&rdquo; every &ldquo;strategy call,&rdquo;
          every &ldquo;performance optimization&rdquo; is a lock on a door
          the client paid to install. The longer the opacity holds, the
          longer the contract renews. Transparency &mdash; real prices, real
          code ownership, real architecture &mdash; is the one thing the
          industry cannot afford to offer, because transparency is how
          clients leave.
        </p>

        {/* ═══ § III — The Alternative ═══ */}
        <SectionEyebrow numeral="III" title="The Alternative" />

        <p className={bodyClass} style={bodyStyle}>
          We built Next Consulting to be the thing the complex cannot sell.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          A website you own. Code you can read. A database that belongs to
          your company, not to a vendor&rsquo;s procurement department. A
          brand system documented in files on your hard drive. Automations
          that run on infrastructure with your name on the invoice. Price
          tags published on the site, not hidden behind an intake call. A
          phased plan with a clear exit at every phase. The promise is not
          complicated. The promise is that when you pay us, you get a
          system. Not a service. Not a retainer. Not a report. A system.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          The system has three phases, and it is important that you
          understand the order. If you want the long-form explanation of
          what that system actually is, layer by layer, it lives on its
          own page:{" "}
          <Link
            href="/revenue-systems-architecture"
            className="underline decoration-[rgba(196,131,90,0.4)] decoration-1 underline-offset-4 transition-colors hover:decoration-[var(--copper)]"
            style={{ color: "var(--copper)" }}
          >
            Revenue Systems Architecture
          </Link>
          .
        </p>

        <p className={`mt-10 ${bodyClass}`} style={bodyStyle}>
          <strong className={phaseNameClass} style={phaseNameStyle}>
            Foundation
          </strong>{" "}
          is the website and the brand that runs on top of it. It is the
          first thing that touches a stranger. It is the first forty-eight
          hours after someone has heard your name. If the site loads in four
          seconds, they do not come back. If the brand reads like a
          trade-show kiosk, they do not trust you. Foundation is not
          decoration. Foundation is credibility, compressed into
          milliseconds, and it has to be real before anything else can be
          built on top of it.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          <strong className={phaseNameClass} style={phaseNameStyle}>
            Automation
          </strong>{" "}
          is what happens once Foundation is credible. Lead capture to CRM
          to follow-up to quote to paid invoice, with humans in the loop
          only where humans add value. Automation is not a chatbot and it is
          not a zap between SaaS tools. Automation is the systematic
          elimination of every manual step that was invented to compensate
          for a missing system. When Automation is in place, your
          team&rsquo;s time goes where it actually belongs.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          <strong className={phaseNameClass} style={phaseNameStyle}>
            Scale
          </strong>{" "}
          is the layer that compounds once Foundation and Automation are
          live. It is the continuous iteration &mdash; new channels tested,
          new funnels pressure-tested, conversion ratios tightened &mdash;
          and it is the only phase we would describe as
          &ldquo;marketing.&rdquo; The Marketing-Industrial Complex sells
          Scale without Foundation and without Automation, which is why
          their clients never compound. Scale on a broken Foundation is not
          growth. It is expensive noise.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Phases are bought in order. You do not skip Foundation because it
          is slower than launching an ad campaign, the same way you do not
          skip the footings on a building because the drywall is more fun.
          You stop at any phase. You own the work from the moment it is
          delivered. You do not pay us to keep a seat warm.
        </p>

        {/* ═══ § IV — The Stakes ═══ */}
        <SectionEyebrow numeral="IV" title="The Stakes" />

        <p className={bodyClass} style={bodyStyle}>
          The question every owner asks, correctly, is:{" "}
          <em className="italic" style={{ color: "var(--cream)" }}>
            how do I know you are different.
          </em>{" "}
          The answer is that we put a price on the site, we publish the code
          you&rsquo;ll get, and we built{" "}
          <Link
            href="/arena"
            className="underline decoration-[rgba(196,131,90,0.4)] decoration-1 underline-offset-4 transition-colors hover:decoration-[var(--copper)]"
            style={{ color: "var(--copper)" }}
          >
            an arena
          </Link>{" "}
          where builders fight in public for your business if you don&rsquo;t
          want to take our word for it. Nothing about our model survives the
          introduction of transparency, and that is the point.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          There is a window open right now in which the category we are
          describing can still be named, claimed, and owned. Contractors
          have been abused by marketing vendors for long enough that a
          credible alternative is ready to be heard. Whether the alternative
          is built by us, or by a better-capitalized agency that copies our
          language, or by a platform vendor that bolts a website module
          onto an already-crowded product, is a question that gets answered
          in the next eighteen months.
        </p>

        <Pullquote>
          Revenue without architecture is funded chaos. Marketing without
          architecture is a more expensive version of the same thing.
        </Pullquote>

        <p className={bodyClass} style={bodyStyle}>
          If your business is running on the first, we can show you what the
          second looks like. If your business is already running on the
          second, we can show you what it costs to stop.
        </p>
        <p
          className="mt-12 font-[var(--font-display)] font-700 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.01em]"
          style={{ color: "var(--cream)" }}
        >
          The question was never whether something needs to change. It is
          whether you will be the one who changes it.
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
