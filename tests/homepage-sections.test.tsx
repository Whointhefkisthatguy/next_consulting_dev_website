import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("homepage RBMS composition", () => {
  it("renders the full 10-beat arc: hero, category claim, problem, contrast, OS, rules, tiers, honesty, industries, qualification, final CTA", () => {
    render(<Home />);
    // § 1 hero — contractor-voice pain hook
    expect(
      screen.getByText(/You can.{0,3}t outwork/i)
    ).toBeInTheDocument();
    // § 1 hero eyebrow
    expect(
      screen.getByText(/the operating system for contractors/i)
    ).toBeInTheDocument();
    // § 2 category claim
    expect(
      screen.getByText(/we don't sell software/i)
    ).toBeInTheDocument();
    // § 3 problem
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /growing a contracting business has never been harder/i,
      })
    ).toBeInTheDocument();
    // § 4 BuilderTrend contrast
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /buildertrend hands you a platform/i,
      })
    ).toBeInTheDocument();
    // § 5 operating system / module sequence
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /five modules\. bought in order\. stop whenever/i,
      })
    ).toBeInTheDocument();
    // § 6 three rules
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /the three rules that govern every module/i,
      })
    ).toBeInTheDocument();
    // § 7 entry tiers
    expect(
      screen.getByRole("heading", { level: 2, name: /you pick the door/i })
    ).toBeInTheDocument();
    // § 8 standalone honesty
    expect(
      screen.getByText(/the standalone honesty constraint/i)
    ).toBeInTheDocument();
    // § 9 industries
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /contractors\. trades\. home services\./i,
      })
    ).toBeInTheDocument();
    // § 10 qualification gate
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /next isn't for everyone/i,
      })
    ).toBeInTheDocument();
    // § 11 final CTA
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /pick the door\. or run the diagnostic/i,
      })
    ).toBeInTheDocument();
    // closing stakes line
    expect(screen.getByText(/funded chaos/i)).toBeInTheDocument();
  });

  it("hero primary CTA routes to the NLE intake form and secondary to the in-page tiers anchor", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("https://pay.nextconsulting.dev/intake");
    expect(hrefs).toContain("#entry-tiers");
  });

  it("hero 'Find your worst leak' CTA opens the intake in a new tab", () => {
    const { container } = render(<Home />);
    const hero = container.querySelector(
      'a[href="https://pay.nextconsulting.dev/intake"]'
    );
    expect(hero).not.toBeNull();
    expect(hero?.getAttribute("target")).toBe("_blank");
    expect(hero?.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("module chip strip links to the operating-system anchor", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("#operating-system");
  });

  it("entry tiers link to /contact with a tier query param", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("/contact?tier=find-the-leak");
    expect(hrefs).toContain("/contact?tier=run-the-work");
    expect(hrefs).toContain("/contact?tier=full-os");
  });

  it("module sequence links to the INSIGHT 01 full architecture read", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain(
      "/insights/01-recursive-business-management-system"
    );
  });

  it("final CTA offers both Start a project and System Score doors", () => {
    const { container } = render(<Home />);
    const hrefs = Array.from(container.querySelectorAll("a")).map(
      (a) => a.getAttribute("href") ?? ""
    );
    expect(hrefs).toContain("/contact");
    expect(hrefs).toContain("/diagnostic");
  });
});
