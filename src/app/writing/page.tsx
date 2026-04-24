import Link from "next/link";
import { loadEssays } from "@/lib/essays";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Writing · Next Consulting",
  description:
    "Long-form thinking on operating systems, marketing accountability, and the categories the consensus refuses to challenge.",
  path: "/writing",
  ogImage: "/og-image.png",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function WritingPage() {
  const essays = await loadEssays();

  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--copper)] mb-6">
            Long Form
          </div>
          <h1
            className="font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
            style={{ color: "var(--cream)" }}
          >
            Writing
          </h1>
          <p
            className="mt-6 font-[var(--font-body)] text-base max-w-xl"
            style={{ color: "rgba(240,235,227,0.65)" }}
          >
            Critique, thesis, and the questions the industry consensus would
            rather not answer.
          </p>
        </div>
      </section>

      <section
        className="py-16 px-6 sm:px-14"
        style={{ borderTop: "1px solid var(--divider)" }}
      >
        <div className="max-w-[900px] mx-auto">
          {essays.length === 0 ? (
            <p
              className="font-[var(--font-body)] text-sm"
              style={{ color: "var(--muted)" }}
            >
              The first pieces are in production. Back shortly.
            </p>
          ) : (
            <ul className="space-y-12">
              {essays.map((e) => (
                <li
                  key={e.slug}
                  className="pb-12 border-b border-[var(--divider)] last:border-b-0 last:pb-0"
                >
                  <Link href={`/writing/${e.slug}`} className="group block">
                    <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.25em] uppercase">
                      <span className="text-[var(--copper)]">{e.category}</span>
                      <span aria-hidden="true" className="text-[rgba(240,235,227,0.3)]">·</span>
                      <span className="text-[rgba(240,235,227,0.5)]">{formatDate(e.publishedAt)}</span>
                    </div>
                    <h2
                      className="mt-4 font-[var(--font-display)] font-700 text-3xl md:text-[34px] leading-[1.15] tracking-[-0.015em] group-hover:text-[var(--copper)] transition-colors duration-300"
                      style={{ color: "var(--cream)" }}
                    >
                      {e.title}
                    </h2>
                    <p
                      className="mt-4 font-[var(--font-body)] text-[16px] leading-[1.65] max-w-[640px]"
                      style={{ color: "rgba(240,235,227,0.75)" }}
                    >
                      {e.description}
                    </p>
                    <div className="mt-6 flex items-center gap-3 font-[var(--font-body)] text-sm">
                      <span style={{ color: "var(--cream)" }}>{e.author}</span>
                      <span aria-hidden="true" className="text-[rgba(240,235,227,0.35)]">·</span>
                      <span style={{ color: "rgba(240,235,227,0.55)" }}>{e.authorTitle}</span>
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
