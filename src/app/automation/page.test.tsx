import { describe, it, expect } from "vitest";
import Automation, { metadata } from "./page";

// /automation is an async Server Component (AutomationSqueeze loads case studies
// via the filesystem). We don't render it in jsdom, build + dev smoke cover
// runtime behavior. Here we just verify the module exports are sound.
describe("Automation page module", () => {
  it("exports an async page component", () => {
    expect(typeof Automation).toBe("function");
  });
  it("exposes page metadata", () => {
    expect(metadata.title).toMatch(/automation/i);
    expect(metadata.description).toBeTruthy();
  });
});
