import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import IndustriesGrid from "./IndustriesGrid";

describe("IndustriesGrid", () => {
  it("renders the section heading", () => {
    render(<IndustriesGrid />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /contractors\. trades\. home services\./i,
      })
    ).toBeInTheDocument();
  });

  it("renders all six trades as h3 headings", () => {
    render(<IndustriesGrid />);
    for (const name of [
      "HVAC",
      "Plumbing",
      "Electrical",
      "Roofing",
      "Remodeling",
      "Landscaping",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name })
      ).toBeInTheDocument();
    }
  });
});
