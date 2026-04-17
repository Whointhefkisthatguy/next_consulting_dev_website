import { describe, expect, test } from "vitest";
import { buildShareUrls } from "./ShareRow";

describe("buildShareUrls", () => {
  test("encodes title and URL for X and LinkedIn", () => {
    const u = buildShareUrls({
      url: "https://nextconsulting.dev/case-studies/foo",
      title: "A case study: 41% lift",
    });
    expect(u.x).toContain(encodeURIComponent("A case study: 41% lift"));
    expect(u.x).toContain(encodeURIComponent("https://nextconsulting.dev/case-studies/foo"));
    expect(u.linkedin).toContain(encodeURIComponent("https://nextconsulting.dev/case-studies/foo"));
  });
});
