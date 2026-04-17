import { describe, expect, test } from "vitest";
import { loadCaseStudies, loadCaseStudyBySlug } from "./case-studies";

describe("loadCaseStudies", () => {
  test("returns at least one case study sorted by publishedAt desc", async () => {
    const all = await loadCaseStudies();
    expect(all.length).toBeGreaterThan(0);
    if (all.length > 1) {
      expect(all[0].publishedAt >= all[1].publishedAt).toBe(true);
    }
  });
});

describe("loadCaseStudyBySlug", () => {
  test("returns null for unknown slug", async () => {
    const cs = await loadCaseStudyBySlug("nonexistent-slug-xyz");
    expect(cs).toBeNull();
  });
});
