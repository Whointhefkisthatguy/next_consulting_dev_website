import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PhaseSection from "./PhaseSection";
import { positioning } from "@/content/site/positioning";

describe("PhaseSection", () => {
  it("renders the phase number, name, and anchor id", () => {
    const { container } = render(<PhaseSection phase={positioning.phases[0]} />);
    expect(screen.getByText(/Phase 01 · Foundation/)).toBeInTheDocument();
    expect(container.querySelector("#foundation")).not.toBeNull();
  });
  it("renders the phase headline as an h2", () => {
    render(<PhaseSection phase={positioning.phases[0]} />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /earn credibility in 50 milliseconds/i,
      })
    ).toBeInTheDocument();
  });
  it("lists each deliverable's hero headline as an h3", () => {
    render(<PhaseSection phase={positioning.phases[0]} />);
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: /Websites built as revenue instruments/,
      })
    ).toBeInTheDocument();
  });
});
