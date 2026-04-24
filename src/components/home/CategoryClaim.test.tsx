import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CategoryClaim from "./CategoryClaim";

describe("CategoryClaim", () => {
  it("renders the claim line verbatim", () => {
    render(<CategoryClaim />);
    expect(
      screen.getByText(
        /We don't build websites\. We install operating systems/
      )
    ).toBeInTheDocument();
  });
});
