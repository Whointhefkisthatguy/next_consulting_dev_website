import { notFound } from "next/navigation";
import { loadCaseStudies, loadCaseStudyBySlug } from "@/lib/case-studies";
import { buildArticleMetadata, buildArticleSchema } from "@/lib/metadata";
import CaseStudyArticle from "@/components/squeeze/CaseStudyArticle";
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
    title: `${cs.title} · Case Study · Next Consulting`,
    description: cs.description,
    path: `/case-studies/${cs.slug}`,
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
    description: cs.description,
    url,
    datePublished: cs.publishedAt,
    image: `/case-studies/${cs.slug}/opengraph-image`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CaseStudyArticle study={cs} />
      <SecondaryCTA />
    </>
  );
}
