import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import CTABlock from "@/components/CTABlock";

export const metadata = { title: "About — Next Consulting" };

export default function AboutPage() {
  return (
    <>
      <section className="relative pt-40 pb-24 px-6 sm:px-14 overflow-hidden">
        <ParallaxImage
          src="/images/bg-team.jpg"
          aspect="ultrawide"
          className="top-[10%] right-[-10%]"
          opacity={0.15}
        />

        <div className="relative z-10 max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              About
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;The best way to predict the future is to create it.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; Peter Drucker
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[680px]">
          <ScrollReveal>
            <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] mb-8">
              Next Consulting exists because we got tired of watching businesses invest in growth while ignoring the systems that growth depends on. Revenue without architecture is just funded chaos.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] mb-8">
              We work at the intersection of design, technology, and operations. Every engagement starts with a diagnostic &mdash; not a pitch. We audit before we build, we frame every deliverable through client experience and revenue impact, and we don&rsquo;t disappear after launch.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <blockquote className="reveal my-16 pl-6 border-l-2 border-[var(--copper)]">
              <p className="font-[var(--font-display)] italic text-xl text-[var(--cream)] leading-relaxed">
                We don&rsquo;t fill portfolios. We move needles.
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal>
            <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8]">
              Whether it&rsquo;s a website that converts, a brand that communicates authority, or automation that removes the manual from your operation &mdash; we build systems that compound. Not campaigns that expire.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
