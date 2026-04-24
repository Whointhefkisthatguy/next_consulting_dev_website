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
  it("renders the four numbered section eyebrows", () => {
    render(<Manifesto />);
    expect(screen.getByText("§ I")).toBeInTheDocument();
    expect(screen.getByText("§ II")).toBeInTheDocument();
    expect(screen.getByText("§ III")).toBeInTheDocument();
    expect(screen.getByText("§ IV")).toBeInTheDocument();
  });
  it("renders the Drucker quote as a blockquote with a cite", () => {
    const { container } = render(<Manifesto />);
    const block = container.querySelector("blockquote");
    expect(block?.textContent).toMatch(/purpose of a business is to create a customer/i);
    const cite = container.querySelector("cite");
    expect(cite?.textContent).toMatch(/peter drucker/i);
  });
  it("links to the Arena page inline", () => {
    render(<Manifesto />);
    const link = screen.getByRole("link", { name: /an arena/i });
    expect(link).toHaveAttribute("href", "/arena");
  });
});
