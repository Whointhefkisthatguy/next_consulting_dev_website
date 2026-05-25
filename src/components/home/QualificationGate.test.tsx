import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QualificationGate from "./QualificationGate";

describe("QualificationGate", () => {
  it("renders the not-for-everyone headline", () => {
    render(<QualificationGate />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /next isn't for everyone/i,
      })
    ).toBeInTheDocument();
  });

  it("renders three qualifier rows", () => {
    render(<QualificationGate />);
    expect(
      screen.getByText(/already running 7\+ figures/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/let your team actually use the system/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/one owned operating system/i)
    ).toBeInTheDocument();
  });

  it("shows the two-of-three closing line", () => {
    render(<QualificationGate />);
    expect(
      screen.getByText(/if two of three are true/i)
    ).toBeInTheDocument();
  });

  it("links to the NLE intake form in a new tab", () => {
    render(<QualificationGate />);
    const cta = screen.getByRole("link", { name: /run the diagnostic/i });
    expect(cta).toHaveAttribute(
      "href",
      "https://nle-inbound.athenavr2.cc/intake"
    );
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });
});
