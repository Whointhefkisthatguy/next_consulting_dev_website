import { notFound } from "next/navigation";
import { loadEssays, loadEssayBySlug } from "@/lib/essays";
import { buildArticleMetadata, buildArticleSchema } from "@/lib/metadata";
import EssayArticle from "@/components/squeeze/EssayArticle";
import SecondaryCTA from "@/components/squeeze/SecondaryCTA";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await loadEssays();
  return all.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = await loadEssayBySlug(slug);
  if (!e) return {};
  return buildArticleMetadata({
    title: `${e.title} · Next Consulting`,
    description: e.description,
    path: `/writing/${e.slug}`,
    publishedAt: e.publishedAt,
  });
}

export default async function EssayDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const e = await loadEssayBySlug(slug);
  if (!e) notFound();

  const url = `https://nextconsulting.dev/writing/${e.slug}`;
  const schema = buildArticleSchema({
    headline: e.title,
    description: e.description,
    url,
    datePublished: e.publishedAt,
    image: `/writing/${e.slug}/opengraph-image`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <EssayArticle essay={e} />
      <SecondaryCTA />
    </>
  );
}
