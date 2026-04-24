import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Websites from "./page";

describe("Websites page", () => {
  it("renders the websites hero headline", () => {
    render(<Websites />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /websites built as revenue instruments/i,
      })
    ).toBeInTheDocument();
  });
});
