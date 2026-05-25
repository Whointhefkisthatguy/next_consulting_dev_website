import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ThreeRules from "./ThreeRules";

describe("ThreeRules", () => {
  it("renders the section heading", () => {
    render(<ThreeRules />);
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /the three rules that govern every module/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all three rule names as h3 headings", () => {
    render(<ThreeRules />);
    expect(
      screen.getByRole("heading", { level: 3, name: /fixed build\. flexible frame/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /bounded promise\. doubled delivery/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: /every module hands off/i })
    ).toBeInTheDocument();
  });

  it("renders the rule numbers 01, 02, 03", () => {
    render(<ThreeRules />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
  });
});
