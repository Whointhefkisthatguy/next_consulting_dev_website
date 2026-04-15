import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard";

export const metadata = { title: "Case Studies — Next Consulting" };

const CASE_STUDIES = [
  {
    slug: "example-project",
    title: "Example Project",
    service: "Websites",
    result: "Case study details coming soon.",
    image: "/images/bg-metal.jpg",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              Case Studies
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;In God we trust. All others must bring data.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; W. Edwards Deming
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <ScrollReveal key={study.slug}>
              <div className="reveal">
                <CaseStudyCard {...study} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
