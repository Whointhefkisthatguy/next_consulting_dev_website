import Link from "next/link";
import { loadInsights } from "@/lib/insights";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Insights · Next Consulting",
  description:
    "Category-defining research papers and industry intelligence from Next Consulting's Revenue Systems Architecture Division.",
  path: "/insights",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

export default async function InsightsPage() {
  const insights = await loadInsights();
  const series = insights.filter((i) => i.series);
  const reports = insights.filter((i) => !i.series);

  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <div className="font-mono text-[11px] tracking-[0.35em] uppercase text-[var(--copper)] mb-6">
            Research · Theory · Industry Intelligence
          </div>
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "var(--cream)" }}
          >
            Insights
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] text-base max-w-xl"
            style={{ color: "rgba(240,235,227,0.65)" }}
          >
            Long-form research from the Revenue Systems Architecture Division.
            Category-defining theory, industry intelligence, and the rigorous
            case for how operator-owned infrastructure replaces enterprise
            software.
          </p>
        </div>
      </section>

      {series.length > 0 && (
        <section
          className="py-16 px-6 sm:px-14"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          <div className="max-w-[1100px] mx-auto">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--copper)] mb-10">
              § Volume Series
            </div>
            <ul className="space-y-12">
              {series.map((i) => (
                <li
                  key={i.slug}
                  className="pb-12 border-b border-[var(--divider)] last:border-b-0 last:pb-0"
                >
                  <Link href={`/insights/${i.slug}`} className="group block">
                    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 md:gap-12">
                      <div>
                        <div
                          className="font-[var(--font-display)] font-800 text-[80px] leading-none tracking-[-0.03em]"
                          style={{ color: "var(--copper)" }}
                        >
                          {i.series!.volume}
                        </div>
                        <div className="mt-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[rgba(240,235,227,0.5)]">
                          {i.series!.name}
                        </div>
                      </div>
                      <div>
                        <h2
                          className="font-[var(--font-display)] font-700 text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.01em] group-hover:text-[var(--copper)] transition-colors duration-300"
                          style={{ color: "var(--cream)" }}
                        >
                          {i.title}
                        </h2>
                        {i.subtitle && (
                          <p
                            className="mt-3 font-[var(--font-display)] italic text-[15px] leading-[1.5]"
                            style={{ color: "rgba(240,235,227,0.7)" }}
                          >
                            {i.subtitle}
                          </p>
                        )}
                        <p
                          className="mt-5 font-[var(--font-body)] text-[15px] leading-[1.65] max-w-[640px]"
                          style={{ color: "rgba(240,235,227,0.75)" }}
                        >
                          {i.description}
                        </p>
                        <div className="mt-6 flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
                          <span style={{ color: "rgba(240,235,227,0.5)" }}>
                            {formatDate(i.publishedAt)}
                          </span>
                          <span style={{ color: "rgba(240,235,227,0.3)" }}>·</span>
                          <span style={{ color: "rgba(240,235,227,0.5)" }}>
                            {i.classification}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {reports.length > 0 && (
        <section
          className="py-16 px-6 sm:px-14"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          <div className="max-w-[1100px] mx-auto">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--copper)] mb-10">
              § Industry Intelligence
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {reports.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/insights/${i.slug}`}
                    className="group block h-full p-8 bg-[var(--surface)] border border-[var(--divider)] transition-colors duration-300 hover:border-[var(--copper)]"
                  >
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--copper)]">
                      {i.classification}
                    </div>
                    <h2
                      className="mt-5 font-[var(--font-display)] font-700 text-[22px] leading-[1.2] tracking-[-0.01em] group-hover:text-[var(--copper)] transition-colors duration-300"
                      style={{ color: "var(--cream)" }}
                    >
                      {i.title}
                    </h2>
                    {i.subtitle && (
                      <p
                        className="mt-3 font-[var(--font-display)] italic text-[14px] leading-[1.5]"
                        style={{ color: "rgba(240,235,227,0.6)" }}
                      >
                        {i.subtitle}
                      </p>
                    )}
                    <p
                      className="mt-5 font-[var(--font-body)] text-[14px] leading-[1.6]"
                      style={{ color: "rgba(240,235,227,0.75)" }}
                    >
                      {i.description}
                    </p>
                    <div className="mt-6 font-mono text-[10px] tracking-[0.25em] uppercase text-[rgba(240,235,227,0.5)]">
                      {formatDate(i.publishedAt)}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
