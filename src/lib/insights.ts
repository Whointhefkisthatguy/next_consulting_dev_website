import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { InsightFrontmatter } from "@/content/squeeze/types";

export type InsightRecord = InsightFrontmatter & { body: string };

const DIR = path.join(process.cwd(), "src/content/insights");

async function listMdx(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DIR);
    return entries.filter((e) => e.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function loadInsights(): Promise<InsightRecord[]> {
  const files = await listMdx();
  const records = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as InsightFrontmatter;
      return { ...fm, body: parsed.content };
    }),
  );
  return records
    .filter((r) => !r.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function loadInsightBySlug(slug: string): Promise<InsightRecord | null> {
  const all = await loadInsights();
  return all.find((r) => r.slug === slug) ?? null;
}

export async function loadFeaturedInsight(): Promise<InsightRecord | null> {
  const all = await loadInsights();
  const featured = all.find((r) => r.featured);
  return featured ?? all[0] ?? null;
}
