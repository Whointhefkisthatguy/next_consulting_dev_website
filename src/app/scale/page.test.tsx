import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Scale from "./page";

describe("Scale page", () => {
  it("renders the Phase 3 hero", () => {
    render(<Scale />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /compounds once foundation and automation are live/i,
      })
    ).toBeInTheDocument();
  });
  it("names the four Scale areas", () => {
    render(<Scale />);
    expect(screen.getByText(/conversion iteration/i)).toBeInTheDocument();
    expect(screen.getByText(/new channels/i)).toBeInTheDocument();
    expect(
      screen.getByText(/architecture review/i)
    ).toBeInTheDocument();
  });
  it("has a back-to-home CTA", () => {
    render(<Scale />);
    expect(
      screen.getByRole("link", { name: /return home/i })
    ).toHaveAttribute("href", "/");
  });
});
