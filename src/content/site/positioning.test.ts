import { describe, it, expect } from "vitest";
import { positioning } from "./positioning";

describe("positioning content", () => {
  it("exposes the category claim line", () => {
    expect(positioning.categoryClaim).toBe(
      "We don't sell software, we install the operating system one module at a time."
    );
  });
  it("has exactly three legacy phases in order Foundation, Automation, Scale", () => {
    expect(positioning.phases.map((p) => p.name)).toEqual([
      "Foundation",
      "Automation",
      "Scale",
    ]);
  });
  it("each legacy phase has a slug usable as an anchor id", () => {
    for (const p of positioning.phases) {
      expect(p.slug).toMatch(/^[a-z-]+$/);
    }
  });
  it("legacy pricing ladder has three tiers matching phase slugs", () => {
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

  describe("RBMS modules", () => {
    it("exposes exactly five modules in sequence", () => {
      expect(positioning.modules.map((m) => m.slug)).toEqual([
        "acquisition",
        "intake",
        "scheduling",
        "execution",
        "close",
      ]);
    });
    it("module numbers are 01 through 05 in order", () => {
      expect(positioning.modules.map((m) => m.number)).toEqual([
        "01",
        "02",
        "03",
        "04",
        "05",
      ]);
    });
    it("each module has a lens, soldAs, and builtAs string", () => {
      for (const m of positioning.modules) {
        expect(m.lens.length).toBeGreaterThan(0);
        expect(m.soldAs.length).toBeGreaterThan(0);
        expect(m.builtAs.length).toBeGreaterThan(0);
      }
    });
    it("each module except Close hands off to the next module", () => {
      const handoffs = positioning.modules.map((m) => m.handsOffTo);
      expect(handoffs).toEqual([
        "intake",
        "scheduling",
        "execution",
        "close",
        null,
      ]);
    });
  });

  describe("entry tiers", () => {
    it("exposes exactly three tiers in order", () => {
      expect(positioning.entryTiers.map((t) => t.slug)).toEqual([
        "find-the-leak",
        "run-the-work",
        "full-os",
      ]);
    });
    it("each tier has positive build and monthly figures", () => {
      for (const t of positioning.entryTiers) {
        expect(t.buildFrom).toBeGreaterThan(0);
        expect(t.monthly).toBeGreaterThan(0);
      }
    });
    it("each tier contact href encodes the tier slug", () => {
      for (const t of positioning.entryTiers) {
        expect(t.contactHref).toBe(`/contact?tier=${t.slug}`);
      }
    });
    it("build fees ascend across the three tiers", () => {
      const [a, b, c] = positioning.entryTiers;
      expect(a.buildFrom).toBeLessThan(b.buildFrom);
      expect(b.buildFrom).toBeLessThan(c.buildFrom);
    });
    it("monthly fees ascend across the three tiers", () => {
      const [a, b, c] = positioning.entryTiers;
      expect(a.monthly).toBeLessThan(b.monthly);
      expect(b.monthly).toBeLessThan(c.monthly);
    });
  });

  describe("three rules", () => {
    it("exposes exactly three rules", () => {
      expect(positioning.rules.length).toBe(3);
    });
    it("each rule has a name and body", () => {
      for (const r of positioning.rules) {
        expect(r.name.length).toBeGreaterThan(0);
        expect(r.body.length).toBeGreaterThan(0);
      }
    });
  });

  describe("industries", () => {
    it("exposes six trades", () => {
      expect(positioning.industries.length).toBe(6);
    });
    it("each trade has a name and one-line description", () => {
      for (const i of positioning.industries) {
        expect(i.name.length).toBeGreaterThan(0);
        expect(i.oneLine.length).toBeGreaterThan(0);
      }
    });
    it("includes HVAC, Plumbing, Electrical, Roofing, Remodeling, Landscaping", () => {
      const names = positioning.industries.map((i) => i.name);
      expect(names).toEqual([
        "HVAC",
        "Plumbing",
        "Electrical",
        "Roofing",
        "Remodeling",
        "Landscaping",
      ]);
    });
  });
});
