import { describe, expect, test } from "vitest";
import { buildPageMetadata, buildArticleMetadata, buildServiceSchema, buildArticleSchema } from "./metadata";

describe("buildPageMetadata", () => {
  test("sets canonical to nextconsulting.dev + path", () => {
    const m = buildPageMetadata({
      title: "Websites",
      description: "desc",
      path: "/websites",
      ogImage: "/og/websites.png",
    });
    expect(m.alternates?.canonical).toBe("https://nextconsulting.dev/websites");
  });

  test("includes OG and Twitter cards", () => {
    const m = buildPageMetadata({
      title: "Websites",
      description: "desc",
      path: "/websites",
      ogImage: "/og/websites.png",
    });
    expect(m.openGraph?.images).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((m.twitter as any)?.card).toBe("summary_large_image");
  });
});

describe("buildServiceSchema", () => {
  test("returns JSON-LD Service schema", () => {
    const s = buildServiceSchema({
      name: "Websites",
      description: "desc",
      url: "https://nextconsulting.dev/websites",
    });
    expect(s["@context"]).toBe("https://schema.org");
    expect(s["@type"]).toBe("Service");
    expect(s.url).toBe("https://nextconsulting.dev/websites");
  });
});

describe("buildArticleSchema", () => {
  test("returns JSON-LD Article schema with publish date", () => {
    const s = buildArticleSchema({
      headline: "Case study title",
      description: "problem statement",
      url: "https://nextconsulting.dev/case-studies/foo",
      datePublished: "2026-04-20",
      image: "/og/foo.png",
    });
    expect(s["@type"]).toBe("Article");
    expect(s.datePublished).toBe("2026-04-20");
  });
});

describe("buildArticleMetadata", () => {
  test("sets og:type=article and publishedTime", () => {
    const m = buildArticleMetadata({
      title: "Case study",
      description: "desc",
      path: "/case-studies/foo",
      ogImage: "/og/foo.png",
      publishedAt: "2026-04-20",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((m.openGraph as any)?.type).toBe("article");
  });
});
