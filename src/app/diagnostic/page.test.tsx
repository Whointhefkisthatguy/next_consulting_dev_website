import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Diagnostic from "./page";

describe("Diagnostic page", () => {
  it("renders the headline and both inputs", () => {
    render(<Diagnostic />);
    expect(
      screen.getByRole("heading", { level: 1, name: /system score/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/your website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
  it("has a submit button", () => {
    render(<Diagnostic />);
    expect(
      screen.getByRole("button", { name: /request the diagnostic/i })
    ).toBeInTheDocument();
  });
});
