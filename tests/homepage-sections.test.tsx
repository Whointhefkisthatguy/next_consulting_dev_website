import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("homepage SB7 composition", () => {
  it("renders the full 7-beat arc: hero, guide, problem, plan, pricing, cta+doors, success, stakes", () => {
    render(<Home />);
    // hero (character + problem)
    expect(screen.getByText(/Your revenue has a ceiling/)).toBeInTheDocument();
    // guide (category claim)
    expect(screen.getByText(/We don't build websites/)).toBeInTheDocument();
    // problem
    expect(
      screen.getByRole("heading", { level: 2, name: /leaks at the seams/i })
    ).toBeInTheDocument();
    // plan (three phases section)
    expect(
      screen.getByRole("heading", { level: 2, name: /three phases/i })
    ).toBeInTheDocument();
    // pricing ladder (the component renders "every phase has a price tag" in its h2)
    expect(
      screen.getByRole("heading", { level: 2, name: /every phase has a price tag/i })
    ).toBeInTheDocument();
    // cta + doors
    expect(
      screen.getByRole("heading", { level: 2, name: /start a project. or pick a door/i })
    ).toBeInTheDocument();
    // success
    expect(
      screen.getByRole("heading", { level: 2, name: /your website converts/i })
    ).toBeInTheDocument();
    // stakes
    expect(
      screen.getByText(/funded chaos/i)
    ).toBeInTheDocument();
  });

  it("hero routes primary CTA to /contact and secondary to /diagnostic", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("/contact");
    expect(hrefs).toContain("/diagnostic");
  });

  it("phase roadmap links to each phase's dedicated page", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("/websites");
    expect(hrefs).toContain("/automation");
    expect(hrefs).toContain("/scale");
  });

  it("three doors link to manifesto, diagnostic, arena", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("/manifesto");
    expect(hrefs).toContain("/diagnostic");
    expect(hrefs).toContain("/arena");
  });

  it("problem section links to /revenue-systems-architecture for the full thesis", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("/revenue-systems-architecture");
  });
});
