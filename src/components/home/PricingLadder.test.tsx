import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingLadder from "./PricingLadder";

describe("PricingLadder", () => {
  it("renders all three tier labels", () => {
    render(<PricingLadder />);
    expect(screen.getByText(/Phase 1 — Foundation/)).toBeInTheDocument();
    expect(screen.getByText(/Phase 2 — Automation/)).toBeInTheDocument();
    expect(screen.getByText(/Phase 3 — Scale/)).toBeInTheDocument();
  });
  it("surfaces the 'you own everything' promise in the heading", () => {
    render(<PricingLadder />);
    expect(
      screen.getByRole("heading", { level: 2, name: /stop whenever/i })
    ).toBeInTheDocument();
  });
  it("shows the locked Foundation price range", () => {
    render(<PricingLadder />);
    expect(screen.getByText(/\$3,000 – \$5,500/)).toBeInTheDocument();
  });
});
