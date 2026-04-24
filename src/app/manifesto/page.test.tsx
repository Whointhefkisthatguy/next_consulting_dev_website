import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Manifesto from "./page";

describe("Manifesto page", () => {
  it("renders the Marketing-Industrial Complex headline", () => {
    render(<Manifesto />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /marketing-industrial complex/i,
      })
    ).toBeInTheDocument();
  });
  it("anchors on the Drucker create-a-customer frame", () => {
    render(<Manifesto />);
    expect(
      screen.getByText(/purpose of a business is to create a customer/i)
    ).toBeInTheDocument();
  });
  it("names the three phases", () => {
    render(<Manifesto />);
    expect(screen.getAllByText(/^Foundation$/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^Automation$/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/^Scale$/).length).toBeGreaterThan(0);
  });
  it("has a back-to-home CTA", () => {
    render(<Manifesto />);
    expect(
      screen.getByRole("link", { name: /return home/i })
    ).toHaveAttribute("href", "/");
  });
});
