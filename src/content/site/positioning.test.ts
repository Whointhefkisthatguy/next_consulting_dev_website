import { describe, it, expect } from "vitest";
import { positioning } from "./positioning";

describe("positioning content", () => {
  it("exposes the category claim line", () => {
    expect(positioning.categoryClaim).toBe(
      "We don't build websites. We install operating systems — starting with the website."
    );
  });
  it("has exactly three phases in order Foundation, Automation, Scale", () => {
    expect(positioning.phases.map((p) => p.name)).toEqual([
      "Foundation",
      "Automation",
      "Scale",
    ]);
  });
  it("each phase has a slug usable as an anchor id", () => {
    for (const p of positioning.phases) {
      expect(p.slug).toMatch(/^[a-z-]+$/);
    }
  });
  it("pricing ladder has three tiers matching phase slugs", () => {
    expect(positioning.pricing.map((t) => t.phaseSlug)).toEqual([
      "foundation",
      "automation",
      "scale",
    ]);
  });
  it("arena invite has the 'not sold on us' pitch", () => {
    expect(positioning.arena.eyebrow).toMatch(/not sold on us/i);
    expect(positioning.arena.headline).toMatch(/arena/i);
    expect(positioning.arena.href).toBeTruthy();
  });
});
