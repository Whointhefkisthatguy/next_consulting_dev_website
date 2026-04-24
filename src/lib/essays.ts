import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { EssayFrontmatter } from "@/content/squeeze/types";

export type EssayRecord = EssayFrontmatter & { body: string };

const DIR = path.join(process.cwd(), "src/content/writing");

async function listMdx(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DIR);
    return entries.filter((e) => e.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function loadEssays(): Promise<EssayRecord[]> {
  const files = await listMdx();
  const records = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as EssayFrontmatter;
      return { ...fm, body: parsed.content };
    }),
  );
  return records
    .filter((r) => !r.draft)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function loadEssayBySlug(slug: string): Promise<EssayRecord | null> {
  const all = await loadEssays();
  return all.find((r) => r.slug === slug) ?? null;
}
