import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Arena from "./page";

describe("Arena page", () => {
  it("renders the three-line hero", () => {
    render(<Arena />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1.textContent).toMatch(/Don.t believe us\./);
    expect(h1.textContent).toMatch(/Pay the crowd\./);
    expect(h1.textContent).toMatch(/only here to see you win/i);
  });
  it("describes the tournament mechanic", () => {
    render(<Arena />);
    expect(screen.getAllByText(/five days/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/top builders get paid/i)
    ).toBeInTheDocument();
  });
  it("has a Get-early-access CTA routing to /contact?interest=arena", () => {
    render(<Arena />);
    const cta = screen.getByRole("link", { name: /get early access/i });
    expect(cta).toHaveAttribute("href", "/contact?interest=arena");
  });
  it("has a back-to-home CTA", () => {
    render(<Arena />);
    expect(
      screen.getByRole("link", { name: /return home/i })
    ).toHaveAttribute("href", "/");
  });
});
