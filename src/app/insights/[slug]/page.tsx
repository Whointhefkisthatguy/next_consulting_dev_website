import { notFound } from "next/navigation";
import { loadInsights, loadInsightBySlug } from "@/lib/insights";
import { buildArticleMetadata, buildArticleSchema } from "@/lib/metadata";
import InsightArticle from "@/components/squeeze/InsightArticle";
import SecondaryCTA from "@/components/squeeze/SecondaryCTA";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await loadInsights();
  return all.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = await loadInsightBySlug(slug);
  if (!i) return {};
  const seriesPrefix = i.series ? `${i.series.name} ${i.series.volume} · ` : "";
  return buildArticleMetadata({
    title: `${seriesPrefix}${i.title} · Next Consulting`,
    description: i.description,
    path: `/insights/${i.slug}`,
    publishedAt: i.publishedAt,
  });
}

export default async function InsightDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const i = await loadInsightBySlug(slug);
  if (!i) notFound();

  const url = `https://nextconsulting.dev/insights/${i.slug}`;
  const schema = buildArticleSchema({
    headline: i.title,
    description: i.description,
    url,
    datePublished: i.publishedAt,
    image: `/insights/${i.slug}/opengraph-image`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <InsightArticle insight={i} />
      <SecondaryCTA />
    </>
  );
}
