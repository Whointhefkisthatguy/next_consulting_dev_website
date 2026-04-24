import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Terms from "./page";

describe("Terms page", () => {
  it("renders the Terms of Service headline", () => {
    render(<Terms />);
    expect(
      screen.getByRole("heading", { level: 1, name: /terms of service/i })
    ).toBeInTheDocument();
  });
  it("flags the document as a placeholder pending counsel review", () => {
    render(<Terms />);
    expect(screen.getByText(/placeholder/i)).toBeInTheDocument();
    expect(screen.getAllByText(/counsel/i).length).toBeGreaterThan(0);
  });
  it("has a back-to-home CTA", () => {
    render(<Terms />);
    expect(
      screen.getByRole("link", { name: /return home/i })
    ).toHaveAttribute("href", "/");
  });
});
