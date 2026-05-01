import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Pricing from "./page";

describe("Pricing page", () => {
  it("renders the 'you stop whenever' headline", () => {
    render(<Pricing />);
    expect(
      screen.getByRole("heading", { level: 1, name: /stop whenever/i })
    ).toBeInTheDocument();
  });
  it("displays the Foundation range", () => {
    render(<Pricing />);
    expect(screen.getAllByText(/\$5,000/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/\$15,000/).length).toBeGreaterThan(0);
  });
  it("lists at least six FAQ questions", () => {
    render(<Pricing />);
    const h3s = screen.getAllByRole("heading", { level: 3 });
    expect(h3s.length).toBeGreaterThanOrEqual(6);
  });
});
