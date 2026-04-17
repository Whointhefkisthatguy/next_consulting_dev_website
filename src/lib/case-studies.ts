import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { CaseStudyFrontmatter } from "@/content/squeeze/types";

export type CaseStudyRecord = CaseStudyFrontmatter & { body: string };

const DIR = path.join(process.cwd(), "src/content/case-studies");

async function listMdx(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DIR);
    return entries.filter((e) => e.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function loadCaseStudies(): Promise<CaseStudyRecord[]> {
  const files = await listMdx();
  const records = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as CaseStudyFrontmatter;
      return { ...fm, body: parsed.content };
    }),
  );
  return records.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function loadCaseStudyBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const all = await loadCaseStudies();
  return all.find((r) => r.slug === slug) ?? null;
}
