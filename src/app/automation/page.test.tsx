import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Automation from "./page";

describe("Automation page", () => {
  it("renders a level-1 hero headline", () => {
    render(<Automation />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
