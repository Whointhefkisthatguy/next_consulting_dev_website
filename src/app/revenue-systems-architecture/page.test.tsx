import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RevenueSystemsArchitecture from "./page";

describe("Revenue Systems Architecture page", () => {
  it("renders the thesis hero", () => {
    render(<RevenueSystemsArchitecture />);
    expect(
      screen.getByRole("heading", { level: 1 })
    ).toBeInTheDocument();
  });
  it("opens with the seam-leak thesis", () => {
    render(<RevenueSystemsArchitecture />);
    expect(
      screen.getByText(/seams between vendors/i)
    ).toBeInTheDocument();
  });
  it("names the five architectural layers", () => {
    render(<RevenueSystemsArchitecture />);
    expect(screen.getAllByText(/Layer 00/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Layer 01/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Layer 02/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Layer 03/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Layer 04/i).length).toBeGreaterThan(0);
  });
  it("links out to each entry door (manifesto, diagnostic, arena)", () => {
    render(<RevenueSystemsArchitecture />);
    expect(
      screen.getByRole("link", { name: /read the manifesto/i })
    ).toHaveAttribute("href", "/manifesto");
    expect(
      screen.getByRole("link", { name: /score.*diagnostic|run.*diagnostic|get.*score/i })
    ).toHaveAttribute("href", "/diagnostic");
    expect(
      screen.getByRole("link", { name: /pay the crowd|enter arena|arena/i })
    ).toHaveAttribute("href", "/arena");
  });
  it("has a back-to-home CTA", () => {
    render(<RevenueSystemsArchitecture />);
    expect(
      screen.getByRole("link", { name: /return home/i })
    ).toHaveAttribute("href", "/");
  });
});
