import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EntryTiers from "./EntryTiers";

describe("EntryTiers", () => {
  it("renders the section heading about the three doors", () => {
    render(<EntryTiers />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /you pick the door/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all three tier names", () => {
    render(<EntryTiers />);
    expect(screen.getByText(/find the leak/i)).toBeInTheDocument();
    expect(screen.getByText(/run the work/i)).toBeInTheDocument();
    expect(screen.getByText(/the full os/i)).toBeInTheDocument();
  });

  it("renders the build and monthly figures for each tier", () => {
    render(<EntryTiers />);
    expect(screen.getByText(/\$5,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$750/)).toBeInTheDocument();
    expect(screen.getByText(/\$18,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$1,650/)).toBeInTheDocument();
    expect(screen.getByText(/\$45,000/)).toBeInTheDocument();
    expect(screen.getByText(/\$2,850/)).toBeInTheDocument();
  });

  it("each tier has a Start CTA linking to the tier-tagged contact page", () => {
    render(<EntryTiers />);
    const ctas = screen.getAllByRole("link", { name: /start with tier/i });
    expect(ctas).toHaveLength(3);
    expect(ctas[0]).toHaveAttribute("href", "/contact?tier=find-the-leak");
    expect(ctas[1]).toHaveAttribute("href", "/contact?tier=run-the-work");
    expect(ctas[2]).toHaveAttribute("href", "/contact?tier=full-os");
  });

  it("shows the build-fee scaling disclaimer", () => {
    render(<EntryTiers />);
    expect(
      screen.getByText(/build fees scale with the scope/i)
    ).toBeInTheDocument();
  });
});
