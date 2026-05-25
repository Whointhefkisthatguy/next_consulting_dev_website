import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ModuleSequence from "./ModuleSequence";

describe("ModuleSequence", () => {
  it("renders the section heading", () => {
    render(<ModuleSequence />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /five modules\. bought in order\. stop whenever\./i,
      })
    ).toBeInTheDocument();
  });

  it("renders all five module names as h3 headings", () => {
    render(<ModuleSequence />);
    for (const name of [
      "Acquisition",
      "Intake",
      "Scheduling",
      "Execution",
      "Close",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name })
      ).toBeInTheDocument();
    }
  });

  it("shows the Sold as and Built as labels for every module", () => {
    render(<ModuleSequence />);
    expect(screen.getAllByText(/sold as/i).length).toBeGreaterThanOrEqual(5);
    expect(screen.getAllByText(/built as/i).length).toBeGreaterThanOrEqual(5);
  });

  it("shows hands-off labels for the first four modules", () => {
    render(<ModuleSequence />);
    expect(screen.getAllByText(/hands off to/i).length).toBe(4);
  });

  it("shows a closes-the-loop label on the final module", () => {
    render(<ModuleSequence />);
    expect(screen.getByText(/closes the loop/i)).toBeInTheDocument();
  });

  it("links to the full architecture insight", () => {
    render(<ModuleSequence />);
    const link = screen.getByRole("link", {
      name: /read the full architecture/i,
    });
    expect(link).toHaveAttribute(
      "href",
      "/insights/01-recursive-business-management-system"
    );
  });
});
