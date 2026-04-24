import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("homepage composition", () => {
  it("renders hero, category claim, 3 phases, pricing, arena invite", () => {
    const { container } = render(<Home />);
    expect(screen.getByText(/Your revenue has a ceiling/)).toBeInTheDocument();
    expect(screen.getByText(/We don't build websites/)).toBeInTheDocument();
    expect(container.querySelector("#foundation")).not.toBeNull();
    expect(container.querySelector("#automation")).not.toBeNull();
    expect(container.querySelector("#scale")).not.toBeNull();
    expect(container.querySelector("#pricing")).not.toBeNull();
    expect(container.querySelector("#arena")).not.toBeNull();
    expect(screen.getByText(/not sold on us/i)).toBeInTheDocument();
  });
  it("no longer links to /websites /graphic-design /automation", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).not.toContain("/websites");
    expect(hrefs).not.toContain("/graphic-design");
    expect(hrefs).not.toContain("/automation");
  });
});
