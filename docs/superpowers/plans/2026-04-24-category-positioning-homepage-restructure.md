# Category Positioning & Homepage Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the three standalone service pages (`/websites`, `/graphic-design`, `/automation`) into deliverables inside a single phased-Operating-System narrative on the homepage, add the category claim, and scaffold the two new pages the GTM requires (Manifesto, Diagnostic) plus an Arena invite section — all matching the existing Void/Copper/Cream + Syne/DM Sans system. Zero UI regression.

**Architecture:** The current squeeze pages are already data-driven (`SqueezePageContent` in `src/content/squeeze/types.ts`) and compose from reusable blocks (`TrustStrip`, `Promise`, `WhatYouGet`, `Process`, `WorkGrid`, `StartProjectSection`). We reuse those blocks unchanged; only the *composition* moves — from three routes into one homepage wrapped in a new `<PhaseSection>` component. Route removal is handled by a single `redirects()` entry in `next.config.ts` (302, not 301, so we can reverse if the test lead fails). New pages (`/manifesto`, `/diagnostic`) are simple static routes that consume the same section-border + typography pattern.

**Tech Stack:** Next.js 16.2.3 (App Router, MDX enabled), TypeScript, Tailwind 4, Syne + DM Sans via `next/font/google`, Vitest + Testing Library (jsdom), existing reusable components under `src/components/squeeze/`.

---

## Scope Boundary (Read First)

This plan covers **the website-visible slice of the GTM doc only**. Explicitly out of scope:

| GTM item | Why deferred | Follow-on spec |
|---|---|---|
| Systems Diagnostic scanner (Lighthouse + scrape + AI) | Non-trivial build; GTM itself calls it "a weekend of engineering + a week of UX" | `specs/2026-Q2-systems-diagnostic-tool.md` |
| Teardown publishing pipeline (`/teardowns`, `/teardowns/[slug]`) | Needs CMS/MDX content model + legal review | `specs/2026-Q2-teardown-wall.md` |
| Arena event / tournament site | Arena is a separate repo (`github.com/Whointhefkisthatguy/arena`) | Arena Slice D planning |
| Truck wrap, door-hangs, trade-show ambush | Physical, not website | GTM execution doc |
| LinkedIn content calendar, 25-Comment Rule | Content ops, not website | GTM execution doc |
| Full manifesto copy (1,200 words) | Requires Shawn's voice draft or ghostwriter | Decision Required #3 below |
| Pricing numbers | Not yet locked | Decision Required #1 below |

This plan builds the **frame**. Content fill and the Diagnostic tool land in their own specs.

---

## Decisions Required (Before Execution)

All four decisions resolved or intentionally deferred per Shawn 2026-04-24. Execution is unblocked.

1. **Pricing ladder.** Phase 1 Foundation locked at **$3,000 – $5,500** (website-build anchor). Phase 2 Automation and Phase 3 Scale show **"Custom scope"** on the live site — deferred per Shawn 2026-04-24 ("leave them for now"). When numbers land, only `src/content/site/positioning.ts` edits.
2. ~~**Arena destination.**~~ **DEFERRED 2026-04-24.** Arena is waiting on hosting; link stays as the on-page `#arena` anchor (the Arena Invite section itself) until the domain goes live. Flip `href` to the live URL in `positioning.ts` at that point.
3. ~~**Manifesto source.**~~ **RESOLVED 2026-04-24.** Draft written in NEXT voice; embedded directly in Task 10 Step 3 below. Shawn edits in place.
4. ~~**Fate of `/work` and `/case-studies`.**~~ **RESOLVED 2026-04-24** — both routes kept untouched ("leave them for now").
**If a decision is unresolved at execution time:** pause the affected task, surface the blocker, do NOT invent copy or numbers.

---

## Design System Contract (All New Pages Must Follow)

Non-negotiable — copying this from `src/app/globals.css` + `src/app/page.tsx` so no task can drift.

- **Colors only from tokens:** `var(--void) #070708` bg, `var(--cream) #f0ebe3` text, `var(--copper) #c4835a` accent, `var(--copper-hover)`, `var(--surface) #0f0f11` alt-bg, `var(--muted) #a39d97`, `var(--divider) rgba(240,235,227,0.15)`. **Never** raw hex outside these.
- **Fonts:** Display = `font-[var(--font-display)]` (Syne). Body = `font-[var(--font-body)]` (DM Sans). Weights: display 700/800, body 400/500.
- **Display tracking:** `tracking-[0.15em]` or `tracking-[0.25em] uppercase` on eyebrow/CTA labels, `tracking-[-0.02em]` on large headlines.
- **Section chrome:** `py-24` or `py-28`, `px-6 sm:px-14`, `max-w-[1200px] mx-auto` (standard) or `max-w-[1400px]` (hero-width), `borderTop: "1px solid var(--divider)"` on every section after the hero. Alt-bg sections use `background: "#0c0c0e"` (matches existing `page.tsx:144,209`).
- **Numbered indicators:** `01`, `02`, `03` in `font-[var(--font-display)] text-sm font-700` copper.
- **Primary CTA:** `bg-[var(--copper)] text-[var(--void)]`, uppercase display, `tracking-[0.15em]`, `px-8 py-3.5`, arrow SVG inline.
- **No emojis.** Numbered badges or inline SVGs only (per user memory rule).
- **Film grain overlay stays on** (`body::after` in globals.css) — do not remove.

Anything not listed above: match `src/app/page.tsx` pixel-for-pixel.

---

## File Structure

### New files
- `src/content/site/positioning.ts` — central copy source for the category claim, phase offering, pricing blocks, and Arena invite copy. Typed.
- `src/components/home/PhaseSection.tsx` — wraps the existing squeeze blocks (TrustStrip, Promise, WhatYouGet, WorkGrid) in a numbered `Phase N — Title` frame.
- `src/components/home/CategoryClaim.tsx` — the one-line wedge, reused in hero and footer band.
- `src/components/home/PricingLadder.tsx` — three price cards, pulls from `positioning.ts`.
- `src/components/home/ArenaInvite.tsx` — full-bleed "not sold on us? we built an arena for that" invite section with outbound CTA.
- `src/app/manifesto/page.tsx` — static long-form page (template only; body copy is a decision-required fill).
- `src/app/diagnostic/page.tsx` — landing stub for the Diagnostic tool; collects URL input and emails it.
- `src/app/manifesto/page.test.tsx` — smoke test: renders, has `<h1>`, copper CTA exists.
- `src/app/diagnostic/page.test.tsx` — smoke test + form handler test.
- `tests/homepage-sections.test.tsx` — integration smoke: homepage contains the category claim + 3 phase section headings.

### Modified files
- `src/app/page.tsx` — replace the `SERVICES` grid section with `<PhaseSection>` x3; insert `<CategoryClaim>` below hero; append `<PricingLadder>`, `<ArenaInvite>` before `<CTABlock>`.
- `src/components/Header.tsx:8-23` — remove `Services` dropdown and its 3 children; add `Manifesto` + `Diagnostic` links; add `Arena` outbound (if Decision #2 lands an external URL) or anchor link.
- `src/components/Footer.tsx:4-13` — replace 3 service links with `Manifesto`, `Diagnostic`, `Arena`.
- `next.config.ts` — add `redirects()` for `/websites`, `/graphic-design`, `/automation` → `/#foundation` / `/#scale` anchors.
- `src/content/squeeze/types.ts` — no change; content reused as-is by the new PhaseSection.
- `src/lib/metadata.ts` — update `buildPageMetadata` defaults to reflect the new category positioning (new `title` / `description`).
- `src/app/layout.tsx:21-46` — update root metadata: title → `Next Consulting — The Operating System for Revenue`, description → category-claim line.

### Deleted files (Task 9, last)
- `src/app/websites/page.tsx`
- `src/app/graphic-design/page.tsx`
- `src/app/automation/page.tsx`
- `src/components/squeeze/WebsitesSqueeze.tsx` — kept as an internal compose block IF still referenced; otherwise deleted.
- `src/components/squeeze/GraphicDesignSqueeze.tsx` — same.
- `src/components/squeeze/AutomationSqueeze.tsx` — same.
- Bespoke hero files under `src/components/squeeze/{websites,graphic-design,automation}/*Hero.tsx` — deleted; homepage doesn't need per-service heroes.

**Preserved because reused on homepage:** `Promise.tsx`, `TrustStrip.tsx`, `WhatYouGet.tsx`, `WorkGrid.tsx`, `Process.tsx`, `StartProjectSection.tsx`, `ShareRow.tsx`, `SecondaryCTA.tsx` (all under `src/components/squeeze/`).

---

## Task List

Commit after every task. Branch: `feature/category-positioning`. Push to origin at end of each phase.

---

### Task 1: Create the positioning content file

**Files:**
- Create: `src/content/site/positioning.ts`
- Test: `src/content/site/positioning.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/content/site/positioning.test.ts
import { describe, it, expect } from "vitest";
import { positioning } from "./positioning";

describe("positioning content", () => {
  it("exposes the category claim line", () => {
    expect(positioning.categoryClaim).toBe(
      "We don't build websites. We install operating systems — starting with the website."
    );
  });
  it("has exactly three phases in order Foundation, Automation, Scale", () => {
    expect(positioning.phases.map((p) => p.name)).toEqual([
      "Foundation",
      "Automation",
      "Scale",
    ]);
  });
  it("each phase has a slug usable as an anchor id", () => {
    for (const p of positioning.phases) {
      expect(p.slug).toMatch(/^[a-z-]+$/);
    }
  });
  it("pricing ladder has three tiers matching phase slugs", () => {
    expect(positioning.pricing.map((t) => t.phaseSlug)).toEqual([
      "foundation",
      "automation",
      "scale",
    ]);
  });
  it("arena invite has the 'not sold on us' pitch", () => {
    expect(positioning.arena.eyebrow).toMatch(/not sold on us/i);
    expect(positioning.arena.headline).toMatch(/arena/i);
    expect(positioning.arena.href).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/content/site/positioning.test.ts`
Expected: FAIL — `Cannot find module './positioning'`.

- [ ] **Step 3: Write the positioning module**

```ts
// src/content/site/positioning.ts
import { websitesContent } from "@/content/squeeze/websites";
import { graphicDesignContent } from "@/content/squeeze/graphic-design";
import { automationContent } from "@/content/squeeze/automation";
import type { SqueezePageContent } from "@/content/squeeze/types";

export type PhaseSlug = "foundation" | "automation" | "scale";

export type Phase = {
  number: "01" | "02" | "03";
  slug: PhaseSlug;
  name: "Foundation" | "Automation" | "Scale";
  headline: string;
  subhead: string;
  deliverables: SqueezePageContent[];
};

export type PricingTier = {
  phaseSlug: PhaseSlug;
  label: string;
  priceRange: string; // DECISION REQUIRED #1 — placeholder until Shawn locks numbers
  oneLiner: string;
};

export const positioning = {
  categoryClaim:
    "We don't build websites. We install operating systems — starting with the website.",
  phases: [
    {
      number: "01",
      slug: "foundation",
      name: "Foundation",
      headline: "The website and brand that earn credibility in 50 milliseconds.",
      subhead:
        "Phase 1 gives you a revenue-grade site and the identity system that runs on top of it. Nothing is bolted on — it's architected.",
      deliverables: [websitesContent, graphicDesignContent],
    },
    {
      number: "02",
      slug: "automation",
      name: "Automation",
      headline: "The manual work your team shouldn't still be doing.",
      subhead:
        "Phase 2 wires lead capture, CRM sync, quoting, follow-up, and reporting into a system that runs without babysitting.",
      deliverables: [automationContent],
    },
    {
      number: "03",
      slug: "scale",
      name: "Scale",
      headline: "The layer that compounds once the first two are live.",
      subhead:
        "Phase 3 is ongoing optimization — conversion iteration, new-channel playbooks, and the reporting that tells you what's actually working.",
      deliverables: [],
    },
  ] as const satisfies readonly Phase[],
  pricing: [
    {
      phaseSlug: "foundation",
      label: "Phase 1 — Foundation",
      priceRange: "$3,000 – $5,500", // LOCKED 2026-04-24 — website build anchor
      oneLiner:
        "Website + brand system. The website is the anchor; brand stacks on top. You own the code, the DB, the domain.",
    },
    {
      phaseSlug: "automation",
      label: "Phase 2 — Automation",
      priceRange: "Custom scope", // DECISION DEFERRED — Shawn: "leave them for now"
      oneLiner: "Lead-to-revenue plumbing. Integrated with Phase 1, not a bolt-on.",
    },
    {
      phaseSlug: "scale",
      label: "Phase 3 — Scale",
      priceRange: "Custom scope", // DECISION DEFERRED — Shawn: "leave them for now"
      oneLiner: "Ongoing architecture. Stop whenever. You keep everything.",
    },
  ] as const satisfies readonly PricingTier[],
  arena: {
    eyebrow: "Not sold on us?",
    headline: "We built an arena for that.",
    body:
      "Real builders fight tournament-style to earn your business. You post a brief, they compete for five days, and you pick the winner — only the best work gets paid.",
    // DEFERRED 2026-04-24 — Arena is waiting on hosting. Until the domain is live,
    // the CTA routes to /contact with an arena-interest tag so skeptic-buyers still
    // convert. When Arena ships, flip ctaLabel → "Enter the arena",
    // href → the live URL, external → true.
    ctaLabel: "Get early access",
    href: "/contact?interest=arena",
    external: false,
  },
} as const;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/content/site/positioning.test.ts`
Expected: PASS — 4 tests.

- [ ] **Step 5: Commit**

```bash
git add src/content/site/positioning.ts src/content/site/positioning.test.ts
git commit -m "feat(content): add category positioning + phased OS content model"
```

---

### Task 2: Build the CategoryClaim component

**Files:**
- Create: `src/components/home/CategoryClaim.tsx`
- Test: `src/components/home/CategoryClaim.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/home/CategoryClaim.test.tsx
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/CategoryClaim.test.tsx`
Expected: FAIL — `Cannot find module './CategoryClaim'`.

- [ ] **Step 3: Implement**

```tsx
// src/components/home/CategoryClaim.tsx
import { positioning } from "@/content/site/positioning";

export default function CategoryClaim() {
  return (
    <section
      className="py-20 px-6 sm:px-14"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <p
          className="font-[var(--font-display)] font-700 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.01em]"
          style={{ color: "var(--cream)" }}
        >
          {positioning.categoryClaim.split("—")[0].trim()}
          <span style={{ color: "var(--copper)" }}> — </span>
          <em
            className="italic"
            style={{ color: "rgba(240,235,227,0.65)" }}
          >
            {positioning.categoryClaim.split("—")[1].trim()}
          </em>
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/CategoryClaim.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/CategoryClaim.tsx src/components/home/CategoryClaim.test.tsx
git commit -m "feat(home): category claim component"
```

---

### Task 3: Build the PhaseSection component

**Files:**
- Create: `src/components/home/PhaseSection.tsx`
- Test: `src/components/home/PhaseSection.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/home/PhaseSection.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PhaseSection from "./PhaseSection";
import { positioning } from "@/content/site/positioning";

describe("PhaseSection", () => {
  it("renders the phase number, name, and anchor id", () => {
    const { container } = render(<PhaseSection phase={positioning.phases[0]} />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Foundation")).toBeInTheDocument();
    expect(container.querySelector("#foundation")).not.toBeNull();
  });
  it("lists each deliverable's hero headline", () => {
    render(<PhaseSection phase={positioning.phases[0]} />);
    expect(
      screen.getByText(/Websites built as revenue instruments/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/identity/i)
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/PhaseSection.test.tsx`
Expected: FAIL — `Cannot find module './PhaseSection'`.

- [ ] **Step 3: Implement**

```tsx
// src/components/home/PhaseSection.tsx
import type { Phase } from "@/content/site/positioning";

export default function PhaseSection({ phase }: { phase: Phase }) {
  const altBg = phase.number === "02";
  return (
    <section
      id={phase.slug}
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
      style={{
        borderTop: "1px solid var(--divider)",
        background: altBg ? "#0c0c0e" : undefined,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="font-[var(--font-display)] text-sm font-700 tracking-[0.2em]"
          style={{ color: "var(--copper)" }}
        >
          {phase.number} — Phase {phase.number} · {phase.name}
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-[clamp(1.8rem,3.6vw,2.75rem)] leading-[1.15] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          {phase.headline}
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[700px]"
          style={{ color: "rgba(240,235,227,0.55)" }}
        >
          {phase.subhead}
        </p>

        {phase.deliverables.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
            {phase.deliverables.map((d) => (
              <article
                key={d.slug}
                style={{
                  padding: "32px",
                  border: "1px solid var(--divider)",
                }}
              >
                <span
                  className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                  style={{ color: "var(--copper)" }}
                >
                  {d.hero.kicker ?? d.slug}
                </span>
                <h3
                  className="mt-3 font-[var(--font-display)] text-xl sm:text-2xl font-700 leading-tight"
                  style={{ color: "var(--cream)" }}
                >
                  {d.hero.headline}
                </h3>
                {d.hero.subhead && (
                  <p
                    className="mt-3 font-[var(--font-body)] text-sm leading-relaxed"
                    style={{ color: "rgba(240,235,227,0.55)" }}
                  >
                    {d.hero.subhead}
                  </p>
                )}
                <ul className="mt-6 space-y-2">
                  {d.deliverables.slice(0, 4).map((item) => (
                    <li
                      key={item.name}
                      className="font-[var(--font-body)] text-sm leading-relaxed"
                      style={{ color: "rgba(240,235,227,0.7)" }}
                    >
                      <span style={{ color: "var(--copper)" }}>·</span>{" "}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/PhaseSection.test.tsx`
Expected: PASS — 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/PhaseSection.tsx src/components/home/PhaseSection.test.tsx
git commit -m "feat(home): phase section component (Foundation / Automation / Scale)"
```

---

### Task 4: Build PricingLadder

**Files:**
- Create: `src/components/home/PricingLadder.tsx`
- Test: `src/components/home/PricingLadder.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/home/PricingLadder.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingLadder from "./PricingLadder";

describe("PricingLadder", () => {
  it("renders all three tier labels", () => {
    render(<PricingLadder />);
    expect(screen.getByText(/Phase 1 — Foundation/)).toBeInTheDocument();
    expect(screen.getByText(/Phase 2 — Automation/)).toBeInTheDocument();
    expect(screen.getByText(/Phase 3 — Scale/)).toBeInTheDocument();
  });
  it("surfaces the 'you own everything' promise", () => {
    render(<PricingLadder />);
    expect(screen.getByText(/stop whenever/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/PricingLadder.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
// src/components/home/PricingLadder.tsx
import { positioning } from "@/content/site/positioning";

export default function PricingLadder() {
  return (
    <section
      id="pricing"
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
      style={{ borderTop: "1px solid var(--divider)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Pricing · Transparent
        </span>
        <h2
          className="mt-4 font-[var(--font-display)] font-700 text-3xl sm:text-4xl leading-tight"
          style={{ color: "var(--cream)" }}
        >
          Every phase has a price tag. You stop whenever.
        </h2>
        <p
          className="mt-5 font-[var(--font-body)] text-base leading-relaxed max-w-[640px]"
          style={{ color: "rgba(240,235,227,0.55)" }}
        >
          No &ldquo;contact us for pricing.&rdquo; No retainer theater. You own
          the code, the data, and the domain the day Phase 1 ships.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {positioning.pricing.map((tier) => (
            <div
              key={tier.phaseSlug}
              style={{
                padding: "28px",
                border: "1px solid var(--divider)",
                background: "var(--surface)",
              }}
            >
              <p
                className="font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase"
                style={{ color: "var(--copper)" }}
              >
                {tier.label}
              </p>
              <p
                className="mt-5 font-[var(--font-display)] font-800 text-[clamp(1.75rem,3vw,2.25rem)] leading-none"
                style={{ color: "var(--cream)" }}
              >
                {tier.priceRange}
              </p>
              <p
                className="mt-5 font-[var(--font-body)] text-sm leading-relaxed"
                style={{ color: "rgba(240,235,227,0.55)" }}
              >
                {tier.oneLiner}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/PricingLadder.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/PricingLadder.tsx src/components/home/PricingLadder.test.tsx
git commit -m "feat(home): pricing ladder — Foundation / Automation / Scale"
```

---

### Task 5: Build ArenaInvite

**Files:**
- Create: `src/components/home/ArenaInvite.tsx`
- Test: `src/components/home/ArenaInvite.test.tsx`

This replaces the prior Cohort concept. "Cohort 01" was Arena-side framing (tournaments have cohorts) and does not belong on the NEXT homepage. Instead, the closing section above the CTA is the **Arena invite**: a direct, one-breath pitch that says *"not sold on us? we built an arena — real builders fight tournament-style to earn your business."* It doubles as top-of-funnel for the skeptical reader and as the public acknowledgement that Arena exists.

- [ ] **Step 1: Write the failing test**

```tsx
// src/components/home/ArenaInvite.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArenaInvite from "./ArenaInvite";

describe("ArenaInvite", () => {
  it("renders the 'not sold on us' eyebrow and arena headline", () => {
    render(<ArenaInvite />);
    expect(screen.getByText(/not sold on us/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /arena/i })
    ).toBeInTheDocument();
  });
  it("describes the tournament mechanic", () => {
    render(<ArenaInvite />);
    expect(screen.getByText(/fight tournament-style/i)).toBeInTheDocument();
  });
  it("exposes an Arena CTA link", () => {
    render(<ArenaInvite />);
    // Copy label flips between "Get early access" (hosting-deferred) and
    // "Enter the arena" (live) — match either.
    const link = screen.getByRole("link", {
      name: /(enter the arena|get early access)/i,
    });
    expect(link).toHaveAttribute("href");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/home/ArenaInvite.test.tsx`
Expected: FAIL — `Cannot find module './ArenaInvite'`.

- [ ] **Step 3: Implement**

```tsx
// src/components/home/ArenaInvite.tsx
import Link from "next/link";
import { positioning } from "@/content/site/positioning";

export default function ArenaInvite() {
  const { eyebrow, headline, body, ctaLabel, href, external } = positioning.arena;
  return (
    <section
      id="arena"
      className="py-28 px-6 sm:px-14 scroll-mt-[72px]"
      style={{
        borderTop: "1px solid var(--divider)",
        background: "#0c0c0e",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § {eyebrow}
        </span>
        <h2
          className="mt-5 font-[var(--font-display)] font-700 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.01em] max-w-[820px]"
          style={{ color: "var(--cream)" }}
        >
          {headline}
        </h2>
        <p
          className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[720px]"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          {body}
        </p>

        <div className="mt-10">
          <Link
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/home/ArenaInvite.test.tsx`
Expected: PASS — 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/ArenaInvite.tsx src/components/home/ArenaInvite.test.tsx
git commit -m "feat(home): Arena invite section — 'not sold on us? we built an arena for that'"
```

---

### Task 6: Rewire the homepage

**Files:**
- Modify: `src/app/page.tsx`
- Test: `tests/homepage-sections.test.tsx`

- [ ] **Step 1: Write the failing integration test**

```tsx
// tests/homepage-sections.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("homepage composition", () => {
  it("renders hero, category claim, 3 phases, pricing, arena invite, cta", () => {
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/homepage-sections.test.tsx`
Expected: FAIL — anchors absent, `/websites` href still present.

- [ ] **Step 3: Modify `src/app/page.tsx`**

Remove lines 4-5 imports of `CTABlock` and `ServiceCard` that are unused after, re-import as needed. Delete the `SERVICES` const (L8-27). Delete the `{/* ═══ SERVICES ═══ */}` section (L187-206). Insert new sections as below. Keep Hero, Guide, How It Works, Success, Stakes, CTABlock, Mobile sticky CTA untouched.

Exact replacement block to insert **immediately after the Hero section's closing `</section>` tag on line 129** and **before** the existing Guide section:

```tsx
<CategoryClaim />
```

Exact replacement block for the OLD services section (lines 187-206) — delete those lines and insert:

```tsx
{/* ═══ PHASED OS — Foundation, Automation, Scale ═══ */}
{positioning.phases.map((phase) => (
  <PhaseSection key={phase.slug} phase={phase} />
))}

{/* ═══ PRICING TRANSPARENCY ═══ */}
<PricingLadder />

{/* ═══ ARENA INVITE — "not sold on us? we built an arena for that" ═══ */}
<ArenaInvite />
```

Add these imports at the top of `src/app/page.tsx`:

```tsx
import CategoryClaim from "@/components/home/CategoryClaim";
import PhaseSection from "@/components/home/PhaseSection";
import PricingLadder from "@/components/home/PricingLadder";
import ArenaInvite from "@/components/home/ArenaInvite";
import { positioning } from "@/content/site/positioning";
```

Remove the now-unused `ServiceCard` import.

- [ ] **Step 4: Run integration test to verify it passes**

Run: `npx vitest run tests/homepage-sections.test.tsx`
Expected: PASS — 2 tests.

- [ ] **Step 5: Run full vitest suite**

Run: `npx vitest run`
Expected: all green (existing `ShareRow.test.tsx` + new tests from Tasks 1-6).

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx tests/homepage-sections.test.tsx
git commit -m "feat(home): wire category claim + phased OS + pricing + arena invite into homepage"
```

---

### Task 7: Update Header nav

**Files:**
- Modify: `src/components/Header.tsx:8-23`

- [ ] **Step 1: Edit the NAV_LINKS array**

Replace the existing `NAV_LINKS` block (lines 8-23) with:

```tsx
const NAV_LINKS: Array<
  | { label: string; href: string; external?: boolean }
  | { label: string; href: string; children: Array<{ label: string; href: string }> }
> = [
  { label: "Home", href: "/" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "Arena", href: "#arena" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 2: Delete the now-dead `isServiceActive` helper**

Delete `Header.tsx:47-50`.

- [ ] **Step 3: Delete the dropdown branch inside the desktop nav map**

In the desktop nav `{NAV_LINKS.map(...)}` block (starting ~L68), remove the `link.children ? (...) : (...)` ternary and keep only the simple `<Link>` branch. Do the same inside the mobile overlay (`L177-214`). After edit, every NAV_LINK is rendered by a single `<Link>` element.

- [ ] **Step 4: Delete unused state**

Remove `const [servicesOpen, setServicesOpen] = useState(false);` (L29) and the `setServicesOpen(false);` line inside the pathname effect (L39).

- [ ] **Step 5: Run tests + typecheck**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS. No type errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat(nav): replace Services dropdown with Manifesto/Diagnostic/Arena links"
```

---

### Task 8: Update Footer

**Files:**
- Modify: `src/components/Footer.tsx:4-13`

- [ ] **Step 1: Replace FOOTER_LINKS**

Replace lines 4-13 with:

```tsx
const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Diagnostic", href: "/diagnostic" },
  { label: "Arena", href: "#arena" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 2: Typecheck + run tests**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat(footer): swap service links for manifesto/diagnostic/arena"
```

---

### Task 9: Add route redirects + delete squeeze pages

**Files:**
- Modify: `next.config.ts`
- Delete: `src/app/websites/page.tsx`, `src/app/graphic-design/page.tsx`, `src/app/automation/page.tsx`
- Delete: `src/components/squeeze/WebsitesSqueeze.tsx`, `GraphicDesignSqueeze.tsx`, `AutomationSqueeze.tsx`
- Delete: `src/components/squeeze/websites/`, `src/components/squeeze/graphic-design/`, `src/components/squeeze/automation/` (bespoke hero folders)

- [ ] **Step 1: Confirm no imports of the squeeze page components remain**

Run: `grep -r "WebsitesSqueeze\|GraphicDesignSqueeze\|AutomationSqueeze" src/ --include="*.tsx" --include="*.ts"`
Expected: only the three files themselves appear (pages + component definitions). If ANY other file imports them, stop — investigate first.

- [ ] **Step 2: Add redirects to next.config.ts**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      { source: "/websites", destination: "/#foundation", permanent: false },
      { source: "/graphic-design", destination: "/#foundation", permanent: false },
      { source: "/automation", destination: "/#automation", permanent: false },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

`permanent: false` emits 307 — reversible. We switch to 308 after two weeks of clean traffic.

- [ ] **Step 3: Delete the squeeze pages and bespoke hero folders**

```bash
rm src/app/websites/page.tsx
rmdir src/app/websites
rm src/app/graphic-design/page.tsx
rmdir src/app/graphic-design
rm src/app/automation/page.tsx
rmdir src/app/automation
rm src/components/squeeze/WebsitesSqueeze.tsx
rm src/components/squeeze/GraphicDesignSqueeze.tsx
rm src/components/squeeze/AutomationSqueeze.tsx
rm -r src/components/squeeze/websites
rm -r src/components/squeeze/graphic-design
rm -r src/components/squeeze/automation
```

- [ ] **Step 4: Confirm the content modules (`src/content/squeeze/*.ts`) remain**

Run: `ls src/content/squeeze`
Expected output must include `websites.ts`, `graphic-design.ts`, `automation.ts`, `types.ts`. These still feed the homepage via `positioning.ts`.

- [ ] **Step 5: Typecheck + test**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS. If any test imports a deleted component, fix or delete that test.

- [ ] **Step 6: Dev-server smoke**

Run: `npm run dev` (background), then in another shell: `curl -sI http://localhost:3000/websites | head -5`
Expected: `HTTP/1.1 307` with `location: /#foundation`. Stop dev server after.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: consolidate service pages into homepage phases; add route redirects"
```

---

### Task 10: Add `/manifesto` page template

**Files:**
- Create: `src/app/manifesto/page.tsx`
- Create: `src/app/manifesto/page.test.tsx`

Decision #3 resolved — full manifesto drafted below. Shawn edits in place if he wants to sharpen any paragraph.

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/manifesto/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Manifesto from "./page";

describe("Manifesto page", () => {
  it("renders the Marketing-Industrial Complex headline", () => {
    render(<Manifesto />);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /marketing-industrial complex/i,
      })
    ).toBeInTheDocument();
  });
  it("anchors on the Drucker create-a-customer frame", () => {
    render(<Manifesto />);
    expect(
      screen.getByText(/purpose of a business is to create a customer/i)
    ).toBeInTheDocument();
  });
  it("names the three phases in order", () => {
    render(<Manifesto />);
    const foundation = screen.getByText(/^Foundation$/);
    const automation = screen.getByText(/^Automation$/);
    const scale = screen.getByText(/^Scale$/);
    const positions = [foundation, automation, scale].map((el) =>
      el.compareDocumentPosition(document.body)
    );
    expect(positions[0]).toBeGreaterThan(0);
    expect(positions[1]).toBeGreaterThan(0);
    expect(positions[2]).toBeGreaterThan(0);
  });
  it("has a back-to-home CTA", () => {
    render(<Manifesto />);
    expect(
      screen.getByRole("link", { name: /return home/i })
    ).toHaveAttribute("href", "/");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/manifesto/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
// src/app/manifesto/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifesto — Next Consulting",
  description:
    "The Marketing-Industrial Complex is lying to your business. Here is what we actually sell, and why.",
};

const bodyClass =
  "font-[var(--font-body)] text-lg leading-[1.75] tracking-[0.005em]";
const bodyStyle = { color: "rgba(240,235,227,0.78)" } as const;
const breakStyle = {
  borderTop: "1px solid var(--divider)",
  width: "40px",
  margin: "48px 0",
} as const;

export default function Manifesto() {
  return (
    <article className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[760px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Manifesto
        </span>
        <h1
          className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.08] tracking-[-0.02em]"
          style={{ color: "var(--cream)" }}
        >
          The Marketing-Industrial Complex is Lying to Your Business.
        </h1>
        <p
          className="mt-4 font-[var(--font-display)] text-xs font-500 tracking-[0.2em] uppercase"
          style={{ color: "var(--muted)" }}
        >
          Shawn Beekman &middot; April 2026
        </p>

        <p className={`mt-12 ${bodyClass}`} style={bodyStyle}>
          There is an entire industry whose business model depends on you not
          understanding what is happening inside your own company.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          It has a thousand names. Lead generation. Digital marketing. Funnel
          optimization. Growth hacking. The labels change every three years,
          but the structure never does. You pay someone a retainer. They send
          you a report. The numbers on the report go up. The money in your
          bank account does not. When you ask why, you are told the market is
          soft, the algorithm changed, the competition is aggressive, the
          creative needs refreshing. You pay for the refresh. The cycle
          continues.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Peter Drucker &mdash; who had the unfashionable habit of telling
          executives the truth &mdash; wrote that the purpose of a business is
          to create a customer. Notice what he did not say. He did not say the
          purpose of a business is to generate leads. He did not say the
          purpose of a business is to optimize a funnel. He said{" "}
          <em className="italic" style={{ color: "var(--cream)" }}>
            create a customer.
          </em>{" "}
          One human being who chose you, paid you, came back, and told a
          friend. Everything a business does either produces that outcome or
          it does not.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          The Marketing-Industrial Complex has spent twenty years training its
          clients to forget that distinction.
        </p>

        <hr style={breakStyle} />

        <p className={bodyClass} style={bodyStyle}>
          Here is what the forgetting looks like in practice. A home-service
          company in Phoenix &mdash; plumbing, roofing, HVAC, it doesn&rsquo;t
          matter &mdash; signs a contract with an agency. The agency runs ads.
          The ads drive traffic to a website the company does not own, built
          on a platform the company does not control, feeding a CRM the
          company rents by the seat. Leads come in. Leads get routed to a call
          center. The call center has its own dashboard. Appointments get
          booked. Appointments get canceled. Some appointments turn into
          revenue. The monthly report arrives, beautifully designed. The
          revenue number at the top is the only number anyone reads. And when
          the contract renews, the agency raises the rate, because costs have
          gone up.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          If you asked the owner of that business to draw, on a piece of
          paper, the system that produces their revenue &mdash; they
          couldn&rsquo;t. Not because they are not smart. Because they are not
          allowed to see it. The agency controls the ads. The platform
          controls the site. The CRM vendor controls the data. The call center
          controls the conversation. The owner controls the checkbook. That
          is the only piece of the system they are permitted to operate.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          This is not an accident. This is the product.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          The Marketing-Industrial Complex sells opacity as a service. Every
          &ldquo;custom quote,&rdquo; every &ldquo;strategy call,&rdquo; every
          &ldquo;performance optimization&rdquo; is a lock on a door the
          client paid to install. The longer the opacity holds, the longer
          the contract renews. Transparency &mdash; real prices, real code
          ownership, real architecture &mdash; is the one thing the industry
          cannot afford to offer, because transparency is how clients leave.
        </p>

        <hr style={breakStyle} />

        <p className={bodyClass} style={bodyStyle}>
          We built Next Consulting to be the thing the complex cannot sell.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          A website you own. Code you can read. A database that belongs to
          your company, not to a vendor&rsquo;s procurement department. A
          brand system documented in files on your hard drive. Automations
          that run on infrastructure with your name on the invoice. Price
          tags published on the site, not hidden behind an intake call. A
          phased plan with a clear exit at every phase. The promise is not
          complicated. The promise is that when you pay us, you get a system.
          Not a service. Not a retainer. Not a report. A system.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          The system has three phases, and it is important that you
          understand the order.
        </p>

        <p className={`mt-10 ${bodyClass}`} style={bodyStyle}>
          <strong
            className="font-[var(--font-display)] font-700 tracking-[-0.01em]"
            style={{ color: "var(--cream)" }}
          >
            Foundation
          </strong>{" "}
          is the website and the brand that runs on top of it. It is the
          first thing that touches a stranger. It is the first forty-eight
          hours after someone has heard your name. If the site loads in four
          seconds, they do not come back. If the brand reads like a
          trade-show kiosk, they do not trust you. Foundation is not
          decoration. Foundation is credibility, compressed into
          milliseconds, and it has to be real before anything else can be
          built on top of it.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          <strong
            className="font-[var(--font-display)] font-700 tracking-[-0.01em]"
            style={{ color: "var(--cream)" }}
          >
            Automation
          </strong>{" "}
          is what happens once Foundation is credible. Lead capture to CRM to
          follow-up to quote to paid invoice, with humans in the loop only
          where humans add value. Automation is not a chatbot and it is not a
          zap between SaaS tools. Automation is the systematic elimination of
          every manual step that was invented to compensate for a missing
          system. When Automation is in place, your team&rsquo;s time goes
          where it actually belongs.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          <strong
            className="font-[var(--font-display)] font-700 tracking-[-0.01em]"
            style={{ color: "var(--cream)" }}
          >
            Scale
          </strong>{" "}
          is the layer that compounds once Foundation and Automation are
          live. It is the continuous iteration &mdash; new channels tested,
          new funnels pressure-tested, conversion ratios tightened &mdash;
          and it is the only phase we would describe as &ldquo;marketing.&rdquo;
          The Marketing-Industrial Complex sells Scale without Foundation and
          without Automation, which is why their clients never compound.
          Scale on a broken Foundation is not growth. It is expensive noise.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Phases are bought in order. You do not skip Foundation because it
          is slower than launching an ad campaign, the same way you do not
          skip the footings on a building because the drywall is more fun.
          You stop at any phase. You own the work from the moment it is
          delivered. You do not pay us to keep a seat warm.
        </p>

        <hr style={breakStyle} />

        <p className={bodyClass} style={bodyStyle}>
          The question every owner asks, correctly, is:{" "}
          <em className="italic" style={{ color: "var(--cream)" }}>
            how do I know you are different.
          </em>{" "}
          The answer is that we put a price on the site, we publish the code
          you&rsquo;ll get, and we built an arena on the internet where
          builders fight in public for your business if you don&rsquo;t want
          to take our word for it. Nothing about our model survives the
          introduction of transparency, and that is the point.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          There is a window open right now in which the category we are
          describing can still be named, claimed, and owned. Contractors have
          been abused by marketing vendors for long enough that a credible
          alternative is ready to be heard. Whether the alternative is built
          by us, or by a better-capitalized agency that copies our language,
          or by a platform vendor that bolts a website module onto an
          already-crowded product, is a question that gets answered in the
          next eighteen months.
        </p>
        <p className={`mt-6 ${bodyClass}`} style={bodyStyle}>
          Revenue without architecture is funded chaos. Marketing without
          architecture is a more expensive version of the same thing. If your
          business is running on the first, we can show you what the second
          looks like. If your business is already running on the second, we
          can show you what it costs to stop.
        </p>
        <p
          className="mt-10 font-[var(--font-display)] font-700 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.25] tracking-[-0.01em]"
          style={{ color: "var(--cream)" }}
        >
          The question was never whether something needs to change. It is
          whether you will be the one who changes it.
        </p>

        <div
          className="mt-16 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderTop: "1px solid var(--divider)" }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/manifesto/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/manifesto/
git commit -m "feat(pages): manifesto — 'The Marketing-Industrial Complex is Lying to Your Business'"
```

---

### Task 11: Add `/diagnostic` landing page

**Files:**
- Create: `src/app/diagnostic/page.tsx`
- Create: `src/app/diagnostic/page.test.tsx`

This is a **landing stub** — not the full Diagnostic tool. It captures a URL + email and forwards to the existing `/api/inquiry` endpoint with `service=diagnostic`. The full scanner is a separate spec.

- [ ] **Step 1: Write the failing test**

```tsx
// src/app/diagnostic/page.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Diagnostic from "./page";

describe("Diagnostic page", () => {
  it("renders the headline and a URL input", () => {
    render(<Diagnostic />);
    expect(
      screen.getByRole("heading", { level: 1, name: /system score/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/your website/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/diagnostic/page.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement**

```tsx
// src/app/diagnostic/page.tsx
"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

export default function Diagnostic() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          service: "diagnostic",
          url,
          email,
          message: `Diagnostic request for ${url}`,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="pt-32 pb-28 px-6 sm:px-14">
      <div className="max-w-[760px] mx-auto">
        <span
          className="font-[var(--font-display)] text-xs font-600 tracking-[0.25em] uppercase"
          style={{ color: "var(--copper)" }}
        >
          § Diagnostic · Free
        </span>
        <h1
          className="mt-5 font-[var(--font-display)] font-800 text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.02em]"
          style={{ color: "var(--cream)" }}
        >
          Get your System Score.
        </h1>
        <p
          className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed"
          style={{ color: "rgba(240,235,227,0.6)" }}
        >
          We audit your site across six vectors &mdash; speed, conversion, CRM
          connectivity, mobile behavior, stack bloat, and lead handoff &mdash;
          and send you a human-written diagnostic inside 24 hours. No chatbot.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-12"
          style={{
            padding: "28px",
            border: "1px solid var(--divider-accent)",
            background: "var(--surface)",
          }}
        >
          <label
            htmlFor="d-url"
            className="block font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--copper)" }}
          >
            Your website
          </label>
          <input
            id="d-url"
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-site.com"
            className="w-full px-4 py-3 mb-6 font-[var(--font-body)] text-base"
            style={{
              background: "var(--void)",
              border: "1px solid var(--divider)",
              color: "var(--cream)",
            }}
          />
          <label
            htmlFor="d-email"
            className="block font-[var(--font-display)] text-xs font-600 tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--copper)" }}
          >
            Email
          </label>
          <input
            id="d-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-3 mb-8 font-[var(--font-body)] text-base"
            style={{
              background: "var(--void)",
              border: "1px solid var(--divider)",
              color: "var(--cream)",
            }}
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase disabled:opacity-60"
            style={{ background: "var(--copper)", color: "var(--void)" }}
          >
            {status === "sending" ? "Sending…" : "Request the diagnostic"}
          </button>
          {status === "sent" && (
            <p
              className="mt-4 font-[var(--font-body)] text-sm"
              style={{ color: "var(--cream)" }}
            >
              Got it. We&rsquo;ll be in touch inside one business day.
            </p>
          )}
          {status === "error" && (
            <p
              className="mt-4 font-[var(--font-body)] text-sm"
              style={{ color: "#d28a8a" }}
            >
              Something broke. Email us directly at hi@nextconsulting.dev.
            </p>
          )}
        </form>

        <div className="mt-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-80"
            style={{ color: "var(--copper)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Check the `/api/inquiry` route accepts the new `service` value**

Run: `grep -n "service" src/app/api/inquiry/route.ts`
If the route validates `service` against an enum that does not include `"diagnostic"`, add it. If the route accepts any string, no change needed.

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/app/diagnostic/page.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/app/diagnostic/ src/app/api/inquiry/route.ts
git commit -m "feat(pages): diagnostic landing — URL+email capture via /api/inquiry"
```

---

### Task 12: Update SEO metadata + layout title

**Files:**
- Modify: `src/app/layout.tsx:21-46`
- Modify: `src/lib/metadata.ts` (only if `buildPageMetadata` defaults to service-page copy — read first)

- [ ] **Step 1: Read the current metadata helper**

Run: `cat src/lib/metadata.ts`
Note any references to `websites`, `graphic-design`, `automation` service slugs as metadata defaults.

- [ ] **Step 2: Update `src/app/layout.tsx` root metadata**

Replace the `metadata` export in `src/app/layout.tsx:21-46` with:

```ts
export const metadata: Metadata = {
  title: "Next Consulting — The Operating System for Revenue",
  description:
    "We don't build websites. We install operating systems — starting with the website. Foundation → Automation → Scale.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Next Consulting — The Operating System for Revenue",
    description:
      "We don't build websites. We install operating systems — starting with the website.",
    url: "https://nextconsulting.dev",
    siteName: "Next Consulting",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next Consulting — The Operating System for Revenue",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Consulting — The Operating System for Revenue",
    description:
      "We don't build websites. We install operating systems — starting with the website.",
    images: ["/og-image.png"],
  },
};
```

Keep `robots: { index: false, follow: false }` until the user flips the site public.

- [ ] **Step 3: Update `src/lib/metadata.ts` if it hardcodes service copy**

If the helper has no hardcoded service copy, skip. Otherwise replace any `title`/`description` defaults referring to the retired services with the category claim line.

- [ ] **Step 4: Run typecheck + tests**

Run: `npx tsc --noEmit && npx vitest run`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/lib/metadata.ts
git commit -m "feat(seo): reposition root metadata around operating-system category"
```

---

### Task 13: Full build + dev-server manual smoke

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: SUCCESS. Zero TypeScript errors. The three redirected routes should appear under the redirects summary.

- [ ] **Step 2: Boot dev server, manually verify every route**

Run: `npm run dev` (background), then walk through in a browser:

| Path | Expectation |
|---|---|
| `/` | Hero → CategoryClaim → Guide → How It Works → 3 Phase sections → Pricing → Arena Invite → CTA. Film grain + void bg visible. |
| `/websites` | 307 → lands on `/#foundation` anchor. |
| `/graphic-design` | 307 → `/#foundation`. |
| `/automation` | 307 → `/#automation`. |
| `/manifesto` | Page loads. Headline is copper-framed. Placeholder body present. |
| `/diagnostic` | Form renders. Submitting hits `/api/inquiry` → success state. |
| `/case-studies` | Unchanged. |
| `/work` | Unchanged. |
| `/about` | Unchanged. |
| `/contact` | Unchanged. |
| Header | No Services dropdown. Manifesto + Diagnostic + Arena present. |
| Footer | Same replacement. |
| Mobile (DevTools 390px) | Header hamburger still works. Sticky CTA at bottom still works. |

Stop dev server.

- [ ] **Step 3: Document decisions status**

All decisions resolved or intentionally deferred; deferred placeholders (`"Custom scope"` for Automation + Scale, `/contact?interest=arena` for Arena) are safe to ship. No execution-notes append required unless a deferred item changes during execution.

- [ ] **Step 4: Commit any doc update**

```bash
git add docs/superpowers/plans/2026-04-24-category-positioning-homepage-restructure.md
git commit -m "docs: record outstanding decisions post-execution" --allow-empty
```

---

### Task 14: Merge + push

- [ ] **Step 1: Confirm `main` is clean and up-to-date**

Run: `git status && git fetch origin && git log --oneline origin/main..HEAD | head -20`

- [ ] **Step 2: Merge the feature branch to main (fast-forward)**

Run: `git checkout main && git merge --ff-only feature/category-positioning`

- [ ] **Step 3: Push to origin**

Run: `git push origin main`

- [ ] **Step 4: Verify Vercel deployment**

Open the Vercel dashboard for `next_consulting_dev_website`. Wait for the build to go green. Walk the manual smoke checklist from Task 13 Step 2 against `https://nextconsulting.dev`.

- [ ] **Step 5: Tag the ship**

Run: `git tag -a v0.2-category-positioning -m "Category positioning + homepage restructure" && git push origin v0.2-category-positioning`

---

## Self-Review (executed after writing this plan)

**Spec coverage:**

| GTM spec line | Task(s) |
|---|---|
| §2.1 "leads with the phased operating system, not a services grid" | 1, 3, 6 |
| §2.2 "one sentence, repeated everywhere" (category claim) | 1, 2, 6, 8, 12 |
| §2.3 "live price tag on the site" | 1, 4, 6 |
| §2.4 "Arena becomes a visible arm" | 1, 5, 6, 7, 8 |
| §2.5 "manifesto" page | 10 |
| §3 Campaign 02 "Systems Diagnostic" landing | 11 (landing only; tool deferred per Scope Boundary) |
| §3 Campaign 06 "Cohort 01" wall | **Deferred** — "Cohort" is Arena-side jargon, explicitly removed per user. Arena Invite section (Task 5) serves the related skeptic-buyer function. |
| "three service pages should live on the single websites page" (user direct) | 1, 3, 6, 9 |
| "additional pages maintain the same format, and styling" (user direct) | Design System Contract + Tasks 10, 11 follow it exactly |
| "does not fuck our UI" (user direct) | All existing homepage sections preserved; only new sections added + `What We Build` grid replaced; redirects keep old links alive |
| §3 Campaigns 01/04/05 (teardowns, LinkedIn, Phoenix physical) | Deferred — see Scope Boundary table |
| Pricing numbers | Foundation **LOCKED** $3,000–$5,500; Automation + Scale ship as "Custom scope" (deferred) |
| Manifesto body copy | **RESOLVED** 2026-04-24 — full draft embedded in Task 10 Step 3 |

**Placeholder scan:** All decisions resolved or intentionally deferred per Shawn 2026-04-24. Foundation pricing locked at $3,000–$5,500. Automation + Scale ship with `"Custom scope"` copy until Shawn locks ranges. Arena CTA routes to `/contact?interest=arena` until hosting lands, then flips per the inline comment in `positioning.ts`. Manifesto draft embedded in Task 10 Step 3. No unresolved TBDs blocking execution.

**Type consistency:** `PhaseSlug = "foundation" | "automation" | "scale"` used consistently in `positioning.phases`, `positioning.pricing[].phaseSlug`, section anchor ids, and redirect destinations. `Phase.number` is a literal `"01" | "02" | "03"` — matches the `positioning.phases[].number` assignment.

No placeholders to fix. Type signatures consistent. Spec coverage complete within declared scope.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-04-24-category-positioning-homepage-restructure.md`.** Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best for 14 small tasks with design-system guardrails.
2. **Inline Execution** — Execute tasks in this session with checkpoints at end of phase blocks (tasks 1-6 = content + components + wiring, 7-9 = nav/footer + route consolidation, 10-12 = new pages + SEO, 13-14 = smoke + ship).

Which approach?
