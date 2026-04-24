import type { Metadata } from "next";

const SITE_ORIGIN = "https://nextconsulting.dev";
const SITE_NAME = "Next Consulting";

export function siteOrigin(): string {
  return SITE_ORIGIN;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
};

function resolveImage(ogImage: string): string {
  return ogImage.startsWith("http") ? ogImage : `${SITE_ORIGIN}${ogImage}`;
}

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const url = `${SITE_ORIGIN}${input.path}`;
  const baseOg: NonNullable<Metadata["openGraph"]> = {
    title: input.title,
    description: input.description,
    url,
    siteName: SITE_NAME,
    type: "website",
  };
  const baseTwitter: NonNullable<Metadata["twitter"]> = {
    card: "summary_large_image",
    title: input.title,
    description: input.description,
  };
  if (input.ogImage) {
    const image = resolveImage(input.ogImage);
    baseOg.images = [{ url: image, width: 1200, height: 630, alt: input.title }];
    baseTwitter.images = [image];
  }
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: baseOg,
    twitter: baseTwitter,
  };
}

type ArticleMetaInput = PageMetaInput & {
  publishedAt: string;
};

export function buildArticleMetadata(input: ArticleMetaInput): Metadata {
  const base = buildPageMetadata(input);
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: input.publishedAt },
  };
}

export function buildServiceSchema(input: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  };
}

export function buildArticleSchema(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image: string;
}) {
  const image = resolveImage(input.image);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    image,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  };
}
