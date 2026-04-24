import CaseStudyCard from "@/components/CaseStudyCard";

export const metadata = { title: "Case Studies · Next Consulting" };

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
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "#f0ebe3" }}
          >
            Case Studies
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] italic text-base max-w-lg"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            &ldquo;In God we trust. All others must bring data.&rdquo;
            <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase" style={{ color: "#6b6560" }}>
             , W. Edwards Deming
            </span>
          </p>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} {...study} />
          ))}
        </div>
      </section>
    </>
  );
}
