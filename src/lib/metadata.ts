import type { Metadata } from "next";

const SITE_ORIGIN = "https://nextconsulting.dev";
const SITE_NAME = "Next Consulting";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage: string;
};

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const url = `${SITE_ORIGIN}${input.path}`;
  const image = input.ogImage.startsWith("http") ? input.ogImage : `${SITE_ORIGIN}${input.ogImage}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
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
  const image = input.image.startsWith("http") ? input.image : `${SITE_ORIGIN}${input.image}`;
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
