import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GraphicDesign from "./page";

describe("Graphic Design page", () => {
  it("renders a level-1 hero headline", () => {
    render(<GraphicDesign />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
