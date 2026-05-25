import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryClaim from "./CategoryClaim";

describe("CategoryClaim", () => {
  it("renders the claim lead and tail", () => {
    render(<CategoryClaim />);
    expect(screen.getByText(/We don't sell software/)).toBeInTheDocument();
    expect(
      screen.getByText(/we install the operating system one module at a time/)
    ).toBeInTheDocument();
  });
});
