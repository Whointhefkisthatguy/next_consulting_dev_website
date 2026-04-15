import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import Link from "next/link";

const CASE_STUDIES: Record<
  string,
  {
    title: string;
    service: string;
    timeline: string;
    image: string;
    challenge: string;
    approach: string;
    outcome: string;
    metrics?: { label: string; value: string }[];
  }
> = {
  "example-project": {
    title: "Example Project",
    service: "Websites",
    timeline: "Q1 2026",
    image: "/images/bg-metal.jpg",
    challenge: "Case study content coming soon.",
    approach: "Case study content coming soon.",
    outcome: "Case study content coming soon.",
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) {
    return (
      <section className="pt-40 pb-24 px-6 sm:px-14 text-center">
        <h1 className="font-[var(--font-display)] font-700 text-3xl text-[var(--cream)]">
          Case study not found
        </h1>
        <Link
          href="/case-studies"
          className="mt-6 inline-block text-[var(--copper)] font-[var(--font-body)] text-sm"
        >
          &larr; Back to Case Studies
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="relative pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <ScrollReveal>
            <div className="reveal">
              <Link
                href="/case-studies"
                className="font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.1em] uppercase mb-6 inline-block"
              >
                &larr; Case Studies
              </Link>
              <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-[var(--cream)]">
                {study.title}
              </h1>
              <div className="mt-4 flex gap-4 text-xs text-[var(--muted)] font-[var(--font-body)] tracking-[0.1em] uppercase">
                <span>{study.service}</span>
                <span>&middot;</span>
                <span>{study.timeline}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 sm:px-14 pb-16">
        <div className="max-w-[1200px] mx-auto h-[40vh] min-h-[300px] overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover grayscale-[30%]"
          />
        </div>
      </section>

      <section className="py-16 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[680px] space-y-16">
          {[
            { label: "Challenge", text: study.challenge },
            { label: "Approach", text: study.approach },
            { label: "Outcome", text: study.outcome },
          ].map((section) => (
            <ScrollReveal key={section.label}>
              <div className="reveal">
                <h2 className="font-[var(--font-display)] font-600 text-lg text-[var(--copper)] mb-4">
                  {section.label}
                </h2>
                <p className="font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8]">
                  {section.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {study.metrics && study.metrics.length > 0 && (
        <section className="py-16 px-6 sm:px-14 border-t border-[var(--divider)]">
          <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {study.metrics.map((m) => (
              <ScrollReveal key={m.label}>
                <div className="reveal text-center">
                  <p className="font-[var(--font-display)] font-700 text-3xl text-[var(--copper)]">
                    {m.value}
                  </p>
                  <p className="mt-2 font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase">
                    {m.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <CTABlock />
    </>
  );
}
