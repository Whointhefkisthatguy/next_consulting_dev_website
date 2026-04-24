import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Next Consulting",
  description:
    "Plain-English terms covering how you engage with Next Consulting, what you own, and what we promise.",
};

const bodyClass =
  "font-[var(--font-body)] text-base leading-[1.75] tracking-[0.005em]";
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
      className="mt-16 mb-8 pt-10 flex items-baseline gap-4"
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

export default function Terms() {
  return (
    <article className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[760px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Legal
        </span>
        <h1
          className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-[-0.02em]"
          style={{ color: "var(--cream)" }}
        >
          Terms of Service.
        </h1>
        <p
          className="mt-4 font-[var(--font-display)] text-xs font-500 tracking-[0.2em] uppercase"
          style={{ color: "var(--muted)" }}
        >
          Last updated &middot; April 2026
        </p>

        {/* ═══ PLACEHOLDER BANNER ═══ */}
        <div
          className="mt-10 p-6"
          style={{
            border: "1px solid var(--divider-accent)",
            background: "var(--surface)",
          }}
        >
          <p
            className="font-[var(--font-display)] text-xs font-700 tracking-[0.2em] uppercase"
            style={{ color: "var(--copper)" }}
          >
            Placeholder &middot; Pending counsel review
          </p>
          <p
            className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
            style={{ color: "rgba(240,235,227,0.7)" }}
          >
            This document is a plain-English draft of the terms we intend to
            publish. It has not yet been reviewed by counsel. Until it is,
            the controlling terms for any active engagement are whatever is
            written into that engagement&rsquo;s signed proposal or contract.
            Questions in the meantime go to{" "}
            <Link
              href="/contact"
              className="underline decoration-[rgba(196,131,90,0.4)] decoration-1 underline-offset-4 hover:decoration-[var(--copper)]"
              style={{ color: "var(--copper)" }}
            >
              the contact page
            </Link>
            .
          </p>
        </div>

        {/* ═══ § I — Who we are ═══ */}
        <SectionEyebrow numeral="I" title="Who we are" />
        <p className={bodyClass} style={bodyStyle}>
          Next Consulting Corp. (&ldquo;Next Consulting,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;) is a consulting and design firm that installs
          websites, brand systems, automations, and related infrastructure for
          businesses that hire us. Our principal place of business is Phoenix,
          Arizona.
        </p>
        <p className={`mt-4 ${bodyClass}`} style={bodyStyle}>
          These terms cover (a) your use of nextconsulting.dev and (b) any
          paid engagement you enter into with us unless your signed proposal
          or contract says otherwise.
        </p>

        {/* ═══ § II — What you agree to by using the site ═══ */}
        <SectionEyebrow numeral="II" title="What you agree to by using the site" />
        <p className={bodyClass} style={bodyStyle}>
          By visiting nextconsulting.dev you agree to use it for lawful
          purposes, not to scrape or hammer our servers, not to impersonate
          anyone, and not to try to reverse-engineer anything that is clearly
          private. We reserve the right to block traffic that violates these.
        </p>
        <p className={`mt-4 ${bodyClass}`} style={bodyStyle}>
          Content on the site &mdash; articles, the manifesto, copy,
          diagrams, screenshots &mdash; is ours. You are welcome to quote
          short excerpts with attribution. You are not welcome to republish
          the whole thing.
        </p>

        {/* ═══ § III — What you own when we build for you ═══ */}
        <SectionEyebrow numeral="III" title="What you own when we build for you" />
        <p className={bodyClass} style={bodyStyle}>
          The central promise of Next Consulting is that you own what we
          build. When an engagement is paid in full, the deliverables become
          yours outright:
        </p>
        <ul
          className="mt-5 space-y-3 pl-6"
          style={{ color: "rgba(240,235,227,0.78)" }}
        >
          <li
            className="font-[var(--font-body)] text-base leading-relaxed list-disc"
            style={{ color: "rgba(240,235,227,0.78)" }}
          >
            <strong style={{ color: "var(--cream)" }}>Source code.</strong>{" "}
            You get the repository. You can fork it, host it elsewhere, or
            hand it to another vendor.
          </li>
          <li
            className="font-[var(--font-body)] text-base leading-relaxed list-disc"
            style={{ color: "rgba(240,235,227,0.78)" }}
          >
            <strong style={{ color: "var(--cream)" }}>Design assets.</strong>{" "}
            Brand files, logo source, Figma boards &mdash; delivered in
            editable form.
          </li>
          <li
            className="font-[var(--font-body)] text-base leading-relaxed list-disc"
            style={{ color: "rgba(240,235,227,0.78)" }}
          >
            <strong style={{ color: "var(--cream)" }}>Data.</strong> Your
            database, your inquiries, your lead logs. Exportable on request.
          </li>
          <li
            className="font-[var(--font-body)] text-base leading-relaxed list-disc"
            style={{ color: "rgba(240,235,227,0.78)" }}
          >
            <strong style={{ color: "var(--cream)" }}>Domain.</strong> We
            point at domains you already own; we do not hold the registrar
            account.
          </li>
        </ul>
        <p className={`mt-5 ${bodyClass}`} style={bodyStyle}>
          We retain the right to list the engagement in our public case
          studies and portfolio unless you specifically ask us not to. We
          will never disclose confidential business details without your
          written permission.
        </p>

        {/* ═══ § IV — Third-party software and subscriptions ═══ */}
        <SectionEyebrow
          numeral="IV"
          title="Third-party software and subscriptions"
        />
        <p className={bodyClass} style={bodyStyle}>
          We build on top of third-party platforms (hosting, analytics,
          email, CRM, payments). You pay for those subscriptions directly
          under your own account. Their terms of service apply to your use
          of them. We tell you up front which platforms an engagement will
          use before you sign.
        </p>

        {/* ═══ § V — Payment and scope ═══ */}
        <SectionEyebrow numeral="V" title="Payment and scope" />
        <p className={bodyClass} style={bodyStyle}>
          Payment, milestones, and scope are set in the signed proposal for
          your engagement. If something in this document conflicts with a
          signed proposal, the signed proposal wins.
        </p>
        <p className={`mt-4 ${bodyClass}`} style={bodyStyle}>
          You can stop a phased engagement at the end of any paid phase. You
          keep everything that has already been delivered and paid for.
          Refunds for in-progress work follow the cancellation schedule in
          the signed proposal.
        </p>

        {/* ═══ § VI — Warranties and limits ═══ */}
        <SectionEyebrow numeral="VI" title="Warranties and limits" />
        <p className={bodyClass} style={bodyStyle}>
          We stand behind the quality of our work. If something we built
          breaks because we built it wrong, we fix it at no charge.
        </p>
        <p className={`mt-4 ${bodyClass}`} style={bodyStyle}>
          Beyond that, the site and the services are provided
          &ldquo;as is.&rdquo; We do not guarantee specific revenue,
          conversion, or ranking outcomes. Our aggregate liability for any
          engagement is capped at the amount you paid us for that
          engagement. This is a legally important limit and counsel will
          harden it in the final version of these terms.
        </p>

        {/* ═══ § VII — Changes and contact ═══ */}
        <SectionEyebrow numeral="VII" title="Changes and contact" />
        <p className={bodyClass} style={bodyStyle}>
          We may update these terms. When we do, the &ldquo;Last updated&rdquo;
          date at the top of the page changes. Material changes to active
          engagements will be communicated by email first.
        </p>
        <p className={`mt-4 ${bodyClass}`} style={bodyStyle}>
          Questions, disputes, or requests to exercise any right described
          above go to{" "}
          <Link
            href="/contact"
            className="underline decoration-[rgba(196,131,90,0.4)] decoration-1 underline-offset-4 hover:decoration-[var(--copper)]"
            style={{ color: "var(--copper)" }}
          >
            our contact page
          </Link>
          . Formal legal notices should be sent in writing to the address on
          the signed proposal.
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
            Ask a question
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
