import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArenaInvite from "./ArenaInvite";

describe("ArenaInvite", () => {
  it("renders the 'not sold on us' eyebrow", () => {
    render(<ArenaInvite />);
    expect(screen.getByText(/not sold on us/i)).toBeInTheDocument();
  });
  it("renders the arena headline as an h2", () => {
    render(<ArenaInvite />);
    expect(
      screen.getByRole("heading", { level: 2, name: /arena/i })
    ).toBeInTheDocument();
  });
  it("describes the tournament mechanic", () => {
    render(<ArenaInvite />);
    expect(screen.getByText(/fight tournament-style/i)).toBeInTheDocument();
  });
  it("exposes an Arena CTA link pointing at /arena", () => {
    render(<ArenaInvite />);
    const link = screen.getByRole("link", {
      name: /see how arena works|enter the arena|get early access/i,
    });
    expect(link).toHaveAttribute("href", "/arena");
  });
});
