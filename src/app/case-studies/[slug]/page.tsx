import { notFound } from "next/navigation";
import Link from "next/link";
import { loadCaseStudies, loadCaseStudyBySlug } from "@/lib/case-studies";
import { buildArticleMetadata, buildArticleSchema } from "@/lib/metadata";
import ShareRow from "@/components/squeeze/ShareRow";
import SecondaryCTA from "@/components/squeeze/SecondaryCTA";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await loadCaseStudies();
  return all.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = await loadCaseStudyBySlug(slug);
  if (!cs) return {};
  return buildArticleMetadata({
    title: cs.title,
    description: cs.problem,
    path: `/case-studies/${cs.slug}`,
    ogImage: cs.ogImage ?? "/og-image.png",
    publishedAt: cs.publishedAt,
  });
}

export default async function CaseStudyDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = await loadCaseStudyBySlug(slug);
  if (!cs) notFound();
  const url = `https://nextconsulting.dev/case-studies/${cs.slug}`;
  const schema = buildArticleSchema({
    headline: cs.title,
    description: cs.problem,
    url,
    datePublished: cs.publishedAt,
    image: cs.ogImage ?? "/og-image.png",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="px-6 sm:px-14 pt-40 pb-24 max-w-[820px] mx-auto">
        <div className="font-mono text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-6">
          Case study · {new Date(cs.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </div>
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-[#f0ebe3]">
          {cs.title}
        </h1>
        <div className="mt-8">
          <ShareRow url={url} title={cs.title} />
        </div>
        <div
          className="mt-14 font-[var(--font-body)] text-[16px] leading-[1.75] text-[#f0ebe3]/85 prose-headings:font-[var(--font-display)] prose-headings:text-[#f0ebe3] prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-a:text-[#c4835a] prose-a:underline-offset-4 prose-strong:text-[#f0ebe3]"
          dangerouslySetInnerHTML={{ __html: await renderMdx(cs.body) }}
        />
        <hr className="my-16" style={{ borderColor: "var(--divider)" }} />
        <div className="flex items-center justify-between">
          <Link href="/automation" className="text-sm tracking-[0.12em] uppercase text-[#c4835a] hover:text-[#d4935a]">
            ← Back to Automation
          </Link>
          <ShareRow url={url} title={cs.title} />
        </div>
      </article>
      <SecondaryCTA />
    </>
  );
}

async function renderMdx(source: string): Promise<string> {
  const { unified } = await import("unified");
  const remarkParse = (await import("remark-parse")).default;
  const remarkGfm = (await import("remark-gfm")).default;
  const remarkRehype = (await import("remark-rehype")).default;
  const rehypeStringify = (await import("rehype-stringify")).default;
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(source);
  return String(file);
}
