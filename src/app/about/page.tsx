import CTABlock from "@/components/CTABlock";

export const metadata = { title: "About — Next Consulting" };

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "#f0ebe3" }}
          >
            About
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] italic text-base max-w-lg"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            &ldquo;The best way to predict the future is to create it.&rdquo;
            <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase" style={{ color: "#6b6560" }}>
              &mdash; Peter Drucker
            </span>
          </p>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[680px]">
          <p className="font-[var(--font-body)] text-[15px] leading-[1.8] mb-8" style={{ color: "rgba(240,235,227,0.75)" }}>
            Next Consulting exists because we got tired of watching businesses invest in growth while ignoring the systems that growth depends on. Revenue without architecture is just funded chaos.
          </p>
          <p className="font-[var(--font-body)] text-[15px] leading-[1.8] mb-8" style={{ color: "rgba(240,235,227,0.75)" }}>
            We work at the intersection of design, technology, and operations. Every engagement starts with a diagnostic &mdash; not a pitch. We audit before we build, we frame every deliverable through client experience and revenue impact, and we don&rsquo;t disappear after launch.
          </p>

          <blockquote className="my-16 pl-6" style={{ borderLeft: "2px solid #c4835a" }}>
            <p className="font-[var(--font-display)] italic text-xl leading-relaxed" style={{ color: "#f0ebe3" }}>
              We don&rsquo;t fill portfolios. We move needles.
            </p>
          </blockquote>

          <p className="font-[var(--font-body)] text-[15px] leading-[1.8]" style={{ color: "rgba(240,235,227,0.75)" }}>
            Whether it&rsquo;s a website that converts, a brand that communicates authority, or automation that removes the manual from your operation &mdash; we build systems that compound. Not campaigns that expire.
          </p>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
