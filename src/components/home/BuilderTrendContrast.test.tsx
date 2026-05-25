import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BuilderTrendContrast from "./BuilderTrendContrast";

describe("BuilderTrendContrast", () => {
  it("renders the contrast headline", () => {
    render(<BuilderTrendContrast />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /buildertrend hands you a platform/i,
      })
    ).toBeInTheDocument();
  });

  it("shows both the trap and the install side", () => {
    render(<BuilderTrendContrast />);
    expect(screen.getByText(/the platform trap/i)).toBeInTheDocument();
    expect(screen.getByText(/the module install/i)).toBeInTheDocument();
  });

  it("calls out that the software won't let the crew skip a step", () => {
    render(<BuilderTrendContrast />);
    expect(
      screen.getByText(/won't let your crew skip a step/i)
    ).toBeInTheDocument();
  });
});
