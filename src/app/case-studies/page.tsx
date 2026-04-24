import Link from "next/link";
import { loadCaseStudies } from "@/lib/case-studies";
import { buildPageMetadata } from "@/lib/metadata";
import TierPill from "@/components/squeeze/TierPill";

export const metadata = buildPageMetadata({
  title: "Case Studies · Next Consulting",
  description:
    "Real engagements, real numbers. Operating systems installed across services, infrastructure, and energy-transition markets.",
  path: "/case-studies",
  ogImage: "/og-image.png",
});

export default async function CaseStudiesPage() {
  const studies = await loadCaseStudies();

  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--copper)] mb-6">
            Plates
          </div>
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "var(--cream)" }}
          >
            Case Studies
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] italic text-base max-w-lg"
            style={{ color: "rgba(240,235,227,0.55)" }}
          >
            &ldquo;In God we trust. All others must bring data.&rdquo;
            <span
              className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase"
              style={{ color: "#6b6560" }}
            >
              W. Edwards Deming
            </span>
          </p>
        </div>
      </section>

      <section
        className="py-16 px-6 sm:px-14"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          {studies.length === 0 ? (
            <p
              className="font-[var(--font-body)] text-sm"
              style={{ color: "var(--muted)" }}
            >
              The plates go up as engagements close. Check back shortly.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {studies.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/case-studies/${s.slug}`}
                    className="group block h-full p-8 bg-[var(--surface)] border border-[var(--divider)] transition-colors duration-300 hover:border-[var(--copper)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--copper)]">
                        Plate {s.plate}
                      </div>
                      <TierPill tier={s.tier} label={s.tierLabel} />
                    </div>
                    <h2
                      className="mt-6 font-[var(--font-display)] font-700 text-2xl md:text-[26px] leading-[1.2] tracking-[-0.01em] group-hover:text-[var(--copper)] transition-colors duration-300"
                      style={{ color: "var(--cream)" }}
                    >
                      {s.title}
                    </h2>
                    <p
                      className="mt-3 font-[var(--font-body)] text-[13px] tracking-wide"
                      style={{ color: "rgba(240,235,227,0.55)" }}
                    >
                      {s.industry} · {s.engagement}
                    </p>
                    <p
                      className="mt-6 font-[var(--font-body)] text-[15px] leading-[1.65]"
                      style={{ color: "rgba(240,235,227,0.85)" }}
                    >
                      {s.description}
                    </p>
                    <div className="mt-8 inline-flex items-center gap-2 font-[var(--font-display)] text-[11px] tracking-[0.2em] uppercase text-[var(--copper)]">
                      Read the full study
                      <span aria-hidden="true">→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
