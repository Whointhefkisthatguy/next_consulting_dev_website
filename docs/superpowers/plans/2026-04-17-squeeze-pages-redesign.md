# Squeeze Pages Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/websites`, `/graphic-design`, and `/automation` as three visually distinct standalone squeeze pages with content-file architecture, sourced trust-strip stats, service-specific Calendly CTAs, and MDX case studies prepared for future syndication.

**Architecture:** Thin route files import one `*Squeeze` component per service. Squeeze components compose shared primitives (TrustStrip, WorkGrid/CaseStudyList, ServiceOfferCTA, SecondaryCTA) and per-service hero/motif components. All copy, stats, work samples, and offer data live in typed content files (`src/content/squeeze/*.ts`). Automation case studies are MDX files rendered at `/case-studies/[slug]`. Per-page metadata (OG, Twitter, canonical, JSON-LD) generated via `generateMetadata()`.

**Tech Stack:** Next.js 16.2.3 App Router, React 19, Tailwind CSS 4, TypeScript, `@next/mdx`, `gray-matter`, Playwright (visual verification).

**Reference spec:** `docs/superpowers/specs/2026-04-17-squeeze-pages-redesign-design.md`

**AGENTS.md reminder:** This is Next.js 16 — read `node_modules/next/dist/docs/01-app/` for any API you touch. Verify `generateMetadata`, file conventions, and MDX config against the installed version, not training-data defaults.

**Testing philosophy:** TDD for logic (content loaders, metadata generators, MDX frontmatter parsing, share URL formatting). Visual components are verified by (a) TypeScript compile, (b) dev-server preview via Playwright screenshots, (c) manual checkpoints. Skipping unit tests for pure layout JSX is intentional — they add no signal and are expensive to maintain.

**Commit cadence:** Commit after each task. Commit messages follow existing repo style (`feat:`, `fix:`, `refactor:`, `docs:`).

---

## Phase A — Foundations

### Task A1: Fix ghost-border design token

**Files:**
- Modify: `src/app/globals.css:21`

- [ ] **Step 1: Update divider token**

Replace line 21 in `src/app/globals.css`:

```css
  --divider: rgba(240, 235, 227, 0.15);
  --divider-strong: rgba(240, 235, 227, 0.22);
  --divider-accent: rgba(196, 131, 90, 0.35);
```

- [ ] **Step 2: Verify no regressions on existing pages**

Run: `npm run dev` and visit `/`, `/about`, `/contact`, `/work`. Dividers should be visible but not harsh.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "fix: raise divider opacity from 0.06 to 0.15, add strong/accent variants"
```

---

### Task A2: Install MDX dependencies

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Create: `mdx-components.tsx` (project root)

- [ ] **Step 1: Read the MDX guide**

Run: `cat node_modules/next/dist/docs/01-app/02-guides/mdx.md` and `cat node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/mdx-components.md`. Confirm the current-version conventions before writing config.

- [ ] **Step 2: Install packages**

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx gray-matter
```

- [ ] **Step 3: Update `next.config.ts`**

Read current file first (it's 4–5 lines). Replace contents:

```ts
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
```

- [ ] **Step 4: Create `mdx-components.tsx` at project root**

```tsx
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
```

- [ ] **Step 5: Verify build still works**

Run: `npm run build`. Expected: clean build, no errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json next.config.ts mdx-components.tsx
git commit -m "feat: enable MDX support for case studies"
```

---

### Task A3: Content type definitions

**Files:**
- Create: `src/content/squeeze/types.ts`

- [ ] **Step 1: Create types file**

```ts
export type TrustStat = {
  value: string;
  label: string;
  source: { label: string; url: string };
};

export type WorkSample = {
  title: string;
  client: string;
  tags: string[];
  image: string;
  href?: string;
  status: "placeholder" | "live";
};

export type Deliverable = {
  name: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type ServiceOffer = {
  name: string;
  durationMinutes: number;
  bullets: string[];
  calendlyUrl: string;
  buttonLabel: string;
};

export type SqueezePageContent = {
  slug: "websites" | "graphic-design" | "automation";
  route: `/${string}`;
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  hero: {
    kicker?: string;
    headline: string;
    subhead?: string;
    attribution?: string;
  };
  trustStats: [TrustStat, TrustStat, TrustStat];
  promise: string;
  deliverables: Deliverable[];
  workSamples?: WorkSample[];
  process: ProcessStep[];
  offer: ServiceOffer;
};

export type CaseStudyFrontmatter = {
  slug: string;
  title: string;
  problem: string;
  hypothesis: string;
  results: Array<{ metric: string; value: string; context: string }>;
  sources: Array<{ label: string; url: string }>;
  ogImage?: string;
  publishedAt: string;
};
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/squeeze/types.ts
git commit -m "feat: content type definitions for squeeze pages"
```

---

### Task A4: Calendly URL constants + fallback

**Files:**
- Create: `src/content/calendly.ts`

- [ ] **Step 1: Create file**

```ts
const DEFAULT_CALENDLY = "https://calendly.com/nextconsulting/intro";

export const CALENDLY = {
  default: DEFAULT_CALENDLY,
  websiteAudit:
    process.env.NEXT_PUBLIC_CALENDLY_WEBSITE_AUDIT ?? DEFAULT_CALENDLY,
  brandCheck:
    process.env.NEXT_PUBLIC_CALENDLY_BRAND_CHECK ?? DEFAULT_CALENDLY,
  processDiscovery:
    process.env.NEXT_PUBLIC_CALENDLY_PROCESS_DISCOVERY ?? DEFAULT_CALENDLY,
} as const;
```

Event-specific URLs override via env var when created in Calendly admin; default protects against 404s pre-launch.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/calendly.ts
git commit -m "feat: Calendly URL constants with env-var overrides and default fallback"
```

---

### Task A5: Metadata helper (OG / Twitter / canonical / JSON-LD)

**Files:**
- Create: `src/lib/metadata.ts`
- Create: `src/lib/metadata.test.ts`

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, test } from "vitest";
import { buildPageMetadata, buildArticleMetadata, buildServiceSchema, buildArticleSchema } from "./metadata";

describe("buildPageMetadata", () => {
  test("sets canonical to nextconsulting.dev + path", () => {
    const m = buildPageMetadata({
      title: "Websites",
      description: "desc",
      path: "/websites",
      ogImage: "/og/websites.png",
    });
    expect(m.alternates?.canonical).toBe("https://nextconsulting.dev/websites");
  });

  test("includes OG and Twitter cards", () => {
    const m = buildPageMetadata({
      title: "Websites",
      description: "desc",
      path: "/websites",
      ogImage: "/og/websites.png",
    });
    expect(m.openGraph?.images).toBeDefined();
    expect(m.twitter?.card).toBe("summary_large_image");
  });
});

describe("buildServiceSchema", () => {
  test("returns JSON-LD Service schema", () => {
    const s = buildServiceSchema({
      name: "Websites",
      description: "desc",
      url: "https://nextconsulting.dev/websites",
    });
    expect(s["@context"]).toBe("https://schema.org");
    expect(s["@type"]).toBe("Service");
    expect(s.url).toBe("https://nextconsulting.dev/websites");
  });
});

describe("buildArticleSchema", () => {
  test("returns JSON-LD Article schema with publish date", () => {
    const s = buildArticleSchema({
      headline: "Case study title",
      description: "problem statement",
      url: "https://nextconsulting.dev/case-studies/foo",
      datePublished: "2026-04-20",
      image: "/og/foo.png",
    });
    expect(s["@type"]).toBe("Article");
    expect(s.datePublished).toBe("2026-04-20");
  });
});
```

- [ ] **Step 2: Install vitest**

```bash
npm install -D vitest @vitejs/plugin-react jsdom
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: false,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- metadata`. Expected: FAIL with module-not-found for `./metadata`.

- [ ] **Step 4: Implement `src/lib/metadata.ts`**

```ts
import type { Metadata } from "next";

const SITE_ORIGIN = "https://nextconsulting.dev";
const SITE_NAME = "Next Consulting";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage: string;
};

export function buildPageMetadata(input: PageMetaInput): Metadata {
  const url = `${SITE_ORIGIN}${input.path}`;
  const image = input.ogImage.startsWith("http") ? input.ogImage : `${SITE_ORIGIN}${input.ogImage}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

type ArticleMetaInput = PageMetaInput & {
  publishedAt: string;
};

export function buildArticleMetadata(input: ArticleMetaInput): Metadata {
  const base = buildPageMetadata(input);
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: input.publishedAt },
  };
}

export function buildServiceSchema(input: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  };
}

export function buildArticleSchema(input: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  image: string;
}) {
  const image = input.image.startsWith("http") ? input.image : `${SITE_ORIGIN}${input.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    url: input.url,
    datePublished: input.datePublished,
    image,
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_ORIGIN },
  };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- metadata`. Expected: PASS all 4 tests.

- [ ] **Step 6: Commit**

```bash
git add src/lib/metadata.ts src/lib/metadata.test.ts package.json package-lock.json vitest.config.ts
git commit -m "feat: metadata helpers for OG/Twitter/canonical and JSON-LD schemas"
```

---

### Task A6: Trust Strip primitive

**Files:**
- Create: `src/components/squeeze/TrustStrip.tsx`

- [ ] **Step 1: Implement component**

```tsx
import type { TrustStat } from "@/content/squeeze/types";
import Link from "next/link";

type Props = {
  stats: [TrustStat, TrustStat, TrustStat];
  accent?: "copper" | "mono";
  ctaLabel?: string;
  ctaHref?: string;
};

export default function TrustStrip({ stats, accent = "copper", ctaLabel, ctaHref }: Props) {
  const valueColor = accent === "copper" ? "text-[#c4835a]" : "text-[#f0ebe3]";
  return (
    <section
      aria-label="Trust indicators"
      className="px-6 sm:px-14 py-20"
      style={{ borderTop: "1px solid var(--divider-strong)", borderBottom: "1px solid var(--divider-strong)" }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className={`font-[var(--font-display)] text-5xl md:text-6xl font-800 tracking-tight ${valueColor}`}>
              {s.value}
            </div>
            <div className="text-[15px] leading-[1.55] text-[#f0ebe3]/90 font-[var(--font-body)]">
              {s.label}
            </div>
            <a
              href={s.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.1em] uppercase text-[#8a8480] hover:text-[#c4835a] transition-colors w-fit"
            >
              &mdash; {s.source.label} &nearr;
            </a>
          </div>
        ))}
      </div>
      {ctaLabel && ctaHref && (
        <div className="max-w-[1200px] mx-auto mt-14">
          <Link
            href={ctaHref}
            className="inline-block text-[#c4835a] hover:text-[#d4935a] font-[var(--font-body)] text-sm tracking-[0.12em] uppercase border-b border-[#c4835a] hover:border-[#d4935a] pb-0.5"
          >
            {ctaLabel} →
          </Link>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/squeeze/TrustStrip.tsx
git commit -m "feat: shared TrustStrip primitive with sourced citations"
```

---

### Task A7: Promise primitive

**Files:**
- Create: `src/components/squeeze/Promise.tsx`

- [ ] **Step 1: Implement**

```tsx
type Props = { text: string; kicker?: string };

export default function Promise({ text, kicker }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-[900px]">
        {kicker && (
          <div className="text-xs tracking-[0.2em] uppercase text-[#8a8480] mb-6 font-[var(--font-body)]">
            {kicker}
          </div>
        )}
        <p className="font-[var(--font-display)] text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.2] tracking-[-0.01em] text-[#f0ebe3]">
          {text}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/squeeze/Promise.tsx
git commit -m "feat: Promise primitive for squeeze-page transition section"
```

---

### Task A8: ServiceOfferCTA primitive

**Files:**
- Create: `src/components/squeeze/ServiceOfferCTA.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { ServiceOffer } from "@/content/squeeze/types";

type Props = { offer: ServiceOffer };

export default function ServiceOfferCTA({ offer }: Props) {
  return (
    <section id="offer" className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div
        className="max-w-[900px] mx-auto p-10 md:p-14"
        style={{
          border: "1px solid var(--divider-accent)",
          background: "linear-gradient(180deg, rgba(196,131,90,0.03), rgba(196,131,90,0.00) 70%)",
        }}
      >
        <div className="text-xs tracking-[0.2em] uppercase text-[#c4835a] font-[var(--font-body)]">
          {offer.name}
        </div>
        <p className="mt-5 font-[var(--font-display)] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.25] text-[#f0ebe3]">
          {offer.durationMinutes}-minute call. I&rsquo;ll walk through your situation against the same checklist I use for clients.
        </p>
        <div className="mt-8 text-sm tracking-[0.08em] uppercase text-[#8a8480] font-[var(--font-body)]">
          You&rsquo;ll leave with
        </div>
        <ul className="mt-4 space-y-3">
          {offer.bullets.map((b, i) => (
            <li key={i} className="flex gap-4 text-[15px] leading-[1.6] text-[#f0ebe3]/90 font-[var(--font-body)]">
              <span className="text-[#c4835a] shrink-0">→</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <a
          href={offer.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block px-8 py-4 bg-[#c4835a] hover:bg-[#d4935a] text-[#070708] font-[var(--font-body)] text-sm tracking-[0.15em] uppercase transition-colors"
        >
          {offer.buttonLabel}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + commit**

Run: `npx tsc --noEmit`. Then:

```bash
git add src/components/squeeze/ServiceOfferCTA.tsx
git commit -m "feat: ServiceOfferCTA primitive — bordered offer block with Calendly button"
```

---

### Task A9: SecondaryCTA primitive

**Files:**
- Create: `src/components/squeeze/SecondaryCTA.tsx`

- [ ] **Step 1: Implement**

```tsx
export default function SecondaryCTA() {
  return (
    <section className="px-6 sm:px-14 py-16 text-center" style={{ borderTop: "1px solid var(--divider)" }}>
      <p className="font-[var(--font-body)] italic text-sm text-[#8a8480]">
        Not ready to book?{" "}
        <a
          href="mailto:nextconsulting.ai@gmail.com"
          className="text-[#c4835a] hover:text-[#d4935a] not-italic tracking-wide"
        >
          Email me a question directly →
        </a>
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/SecondaryCTA.tsx
git commit -m "feat: SecondaryCTA — quiet email fallback for non-bookers"
```

---

### Task A10: WorkGrid primitive

**Files:**
- Create: `src/components/squeeze/WorkGrid.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { WorkSample } from "@/content/squeeze/types";
import Image from "next/image";

type Props = { samples: WorkSample[]; heading: string };

export default function WorkGrid({ samples, heading }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-[1300px] mx-auto">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-700 text-[#f0ebe3] mb-16">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {samples.map((s, i) => (
            <figure key={i} className="group relative overflow-hidden">
              <div className="relative aspect-[4/3] bg-[#0f0f11]" style={{ border: "1px solid var(--divider-strong)" }}>
                <Image
                  src={s.image}
                  alt={s.status === "placeholder" ? `Mock: ${s.client} ${s.title}` : `${s.client} — ${s.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {s.status === "placeholder" && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-[#070708]/80 border border-[#c4835a]/40 text-[10px] tracking-[0.15em] uppercase text-[#c4835a]">
                    Preview
                  </div>
                )}
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <div>
                  <div className="font-[var(--font-display)] text-sm text-[#f0ebe3]">{s.title}</div>
                  <div className="font-[var(--font-body)] text-xs text-[#8a8480] mt-1">{s.client}</div>
                </div>
                <div className="text-[10px] tracking-[0.1em] uppercase text-[#6b6560]">
                  {s.tags.join(" · ")}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Type-check + commit**

Run: `npx tsc --noEmit`. Then:

```bash
git add src/components/squeeze/WorkGrid.tsx
git commit -m "feat: WorkGrid primitive with placeholder ribbon and swappable images"
```

---

### Task A11: Shared Deliverables section

**Files:**
- Create: `src/components/squeeze/WhatYouGet.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { Deliverable } from "@/content/squeeze/types";

type Props = { deliverables: Deliverable[]; heading?: string };

export default function WhatYouGet({ deliverables, heading = "What you get" }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)", background: "#0c0c0e" }}>
      <div className="max-w-[900px]">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-700 text-[#f0ebe3] mb-16">
          {heading}
        </h2>
        <div className="space-y-12">
          {deliverables.map((d, i) => (
            <div key={i} className="flex items-start gap-6">
              <span className="shrink-0 font-[var(--font-display)] text-sm font-700 mt-1 text-[#c4835a]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-600 text-[#f0ebe3]">{d.name}</h3>
                <p className="mt-2 font-[var(--font-body)] text-sm leading-[1.7] text-[#8a8480]">
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/WhatYouGet.tsx
git commit -m "feat: WhatYouGet deliverables section primitive"
```

---

### Task A12: Shared Process section

**Files:**
- Create: `src/components/squeeze/Process.tsx`

- [ ] **Step 1: Implement**

```tsx
import type { ProcessStep } from "@/content/squeeze/types";

type Props = { steps: ProcessStep[]; heading?: string };

export default function Process({ steps, heading = "Process" }: Props) {
  return (
    <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
      <div className="max-w-[1100px] mx-auto">
        <h2 className="font-[var(--font-display)] text-2xl md:text-3xl font-700 text-[#f0ebe3] mb-16">
          {heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <div key={i}>
              <span className="font-[var(--font-display)] text-sm font-700 text-[#c4835a]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[var(--font-display)] text-base font-600 text-[#f0ebe3]">{step.title}</h3>
              <p className="mt-2 font-[var(--font-body)] text-sm leading-[1.7] text-[#8a8480]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/Process.tsx
git commit -m "feat: Process section primitive"
```

---

## Phase B — Websites Squeeze Page

### Task B1: Source stats for Websites trust strip

**Files:**
- Create: `docs/superpowers/plans/research-notes/websites-stats.md`

- [ ] **Step 1: Research 3 stats**

Find 3 credible sourced stats in these directions. Each must have: a specific number, a named source, a verifiable URL. Log every source below.

1. **Page speed → conversion** — target source: Google / Deloitte "Milliseconds Make Millions" report (2020) OR Google Think with Google mobile benchmarks.
2. **Mobile UX expectations** — target source: Baymard Institute mobile commerce benchmarks OR Google "53% of mobile users abandon sites that take longer than 3 seconds" (Think with Google, 2016).
3. **First-impression judgment speed** — target source: Lindgaard et al., "Attention web designers: You have 50 milliseconds to make a good first impression!" (Behaviour & Information Technology, 2006).

- [ ] **Step 2: Write research notes**

Record each stat as: `value | label | source label | source URL`. Discard any stat where you cannot verify the URL.

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/plans/research-notes/websites-stats.md
git commit -m "docs: research notes for Websites trust-strip stats"
```

---

### Task B2: Websites content file

**Files:**
- Create: `src/content/squeeze/websites.ts`

- [ ] **Step 1: Create content file**

Fill `trustStats` with the 3 verified stats from Task B1. Use placeholder images from `/public/images/` already in the repo (`bg-code.jpg` etc.) for work samples — real images swap in later.

```ts
import type { SqueezePageContent } from "./types";
import { CALENDLY } from "../calendly";

export const websitesContent: SqueezePageContent = {
  slug: "websites",
  route: "/websites",
  meta: {
    title: "Websites — Next Consulting",
    description: "Custom websites engineered for conversion. Free Website Conversion Audit available.",
    ogImage: "/og/websites.png",
  },
  hero: {
    kicker: "§ 01 · Websites",
    headline: "Websites built as revenue instruments, not brochures.",
    subhead:
      "Every pixel, load time, and form field engineered against one question: does it convert?",
  },
  trustStats: [
    // Fill from Task B1 research notes. Example shape:
    // { value: "0.1s", label: "faster load → +8% conversion on retail sites.", source: { label: "Deloitte, Milliseconds Make Millions, 2020", url: "https://..." } },
    { value: "REPLACE", label: "REPLACE", source: { label: "REPLACE", url: "REPLACE" } },
    { value: "REPLACE", label: "REPLACE", source: { label: "REPLACE", url: "REPLACE" } },
    { value: "REPLACE", label: "REPLACE", source: { label: "REPLACE", url: "REPLACE" } },
  ],
  promise:
    "You walk away with a site that loads fast, reads clear, and turns strangers into customers — not a style trophy.",
  deliverables: [
    { name: "Custom UI/UX design", description: "Wireframes through high-fidelity, informed by your actual customer journey." },
    { name: "Full-stack development", description: "Frontend, backend, database, deployment — one team, one standard." },
    { name: "Backend integration", description: "Auth, payments, CRM hooks, and third-party APIs wired in from day one." },
    { name: "SEO & performance", description: "Structured for search, optimized for speed. Foundations, not afterthoughts." },
    { name: "Ongoing support", description: "Iteration, monitoring, and optimization after launch. We don't disappear." },
  ],
  workSamples: [
    { title: "Meisterwerk Motoren redesign", client: "Meisterwerk Motoren", tags: ["Redesign", "Dealer"], image: "/images/bg-code.jpg", status: "placeholder" },
    { title: "Parker & Sons redesign", client: "Parker & Sons", tags: ["Redesign", "Service"], image: "/images/bg-circuit.jpg", status: "placeholder" },
    { title: "Volt Electric Co redesign", client: "Volt Electric Co", tags: ["Redesign", "Brand"], image: "/images/bg-ink.jpg", status: "placeholder" },
    { title: "Valley Luxury Transport", client: "Valley Luxury Transport", tags: ["Site", "Service"], image: "/images/bg-paper.jpg", status: "placeholder" },
    { title: "Driveonix", client: "Driveonix", tags: ["Platform"], image: "/images/bg-code.jpg", status: "placeholder" },
    { title: "Sam Boswell brand site", client: "Sam Boswell", tags: ["Single-page", "Brand"], image: "/images/bg-ink.jpg", status: "placeholder" },
  ],
  process: [
    { title: "Discovery", description: "We audit your current experience, map your customer journey, and define what success looks like." },
    { title: "Architecture", description: "Information architecture, stack decisions, and wireframes before a pixel is placed." },
    { title: "Build", description: "Design and development in parallel, with checkpoints at every milestone." },
    { title: "Launch & iterate", description: "Deployment, monitoring, and continuous improvement on real data." },
  ],
  offer: {
    name: "Free Website Conversion Audit",
    durationMinutes: 30,
    bullets: [
      "A conversion-rate diagnostic of your current site",
      "Top 3 friction points, prioritized by revenue impact",
      "A written recommendation you can act on immediately",
    ],
    calendlyUrl: CALENDLY.websiteAudit,
    buttonLabel: "Book the audit — no pitch",
  },
};
```

- [ ] **Step 2: Replace REPLACE placeholders with Task B1 findings**

Do not commit until all 3 stats reference real verifiable URLs.

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`. Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/squeeze/websites.ts
git commit -m "feat: Websites squeeze page content with sourced trust stats"
```

---

### Task B3: Websites hero — Digital Storefront

**Files:**
- Create: `src/components/squeeze/websites/WebsitesHero.tsx`

- [ ] **Step 1: Implement hero with device frames and breakpoint labels**

```tsx
"use client";

type Props = { kicker?: string; headline: string; subhead?: string };

export default function WebsitesHero({ kicker, headline, subhead }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(240,235,227,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(240,235,227,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* breakpoint labels */}
      <div aria-hidden className="absolute top-40 right-6 sm:right-14 font-mono text-[10px] tracking-[0.2em] uppercase text-[#6b6560] space-y-1 text-right">
        <div>1440 · DESKTOP</div>
        <div>1024 · LAPTOP</div>
        <div>768 · TABLET</div>
        <div>390 · MOBILE</div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
        <div>
          {kicker && (
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-6">
              {kicker}
            </div>
          )}
          <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.02em] text-[#f0ebe3]">
            {headline}
            <span className="inline-block w-[0.08em] h-[0.85em] bg-[#c4835a] ml-2 align-middle animate-[blink_1s_step-end_infinite]" aria-hidden />
          </h1>
          {subhead && (
            <p className="mt-8 font-[var(--font-body)] text-lg leading-[1.55] text-[#f0ebe3]/70 max-w-[600px]">
              {subhead}
            </p>
          )}
        </div>

        {/* device frames */}
        <div className="hidden lg:flex gap-4 items-end justify-end">
          <div className="w-[280px] aspect-[3/2] border border-[#f0ebe3]/20 bg-[#0f0f11] flex items-center justify-center">
            <span className="font-[var(--font-display)] font-800 text-2xl tracking-[-0.02em] text-[#f0ebe3]">N&gt;</span>
          </div>
          <div className="w-[100px] aspect-[9/16] border border-[#f0ebe3]/20 bg-[#0f0f11] flex items-center justify-center">
            <span className="font-[var(--font-display)] font-800 text-lg tracking-[-0.02em] text-[#f0ebe3]">N&gt;</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
```

- [ ] **Step 2: Respect prefers-reduced-motion**

Wrap the blink keyframe so it pauses under reduced-motion. Update the `<style jsx>` block:

```tsx
<style jsx>{`
  @keyframes blink { 50% { opacity: 0; } }
  @media (prefers-reduced-motion: reduce) {
    :global(.animate-\\[blink_1s_step-end_infinite\\]) { animation: none !important; }
  }
`}</style>
```

- [ ] **Step 3: Type-check + commit**

Run: `npx tsc --noEmit`.

```bash
git add src/components/squeeze/websites/WebsitesHero.tsx
git commit -m "feat: Websites hero with device frames and breakpoint labels"
```

---

### Task B4: Websites section micro-header

**Files:**
- Create: `src/components/squeeze/websites/SectionLabel.tsx`

- [ ] **Step 1: Implement spec-style micro-header**

```tsx
type Props = { number: string; label: string };

export default function SectionLabel({ number, label }: Props) {
  return (
    <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-10">
      § {number} · {label}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/websites/SectionLabel.tsx
git commit -m "feat: Websites SectionLabel — spec-style micro-header"
```

---

### Task B5: Assemble WebsitesSqueeze

**Files:**
- Create: `src/components/squeeze/WebsitesSqueeze.tsx`
- Modify: `src/app/websites/page.tsx`

- [ ] **Step 1: Assemble component**

```tsx
import { websitesContent as c } from "@/content/squeeze/websites";
import WebsitesHero from "./websites/WebsitesHero";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import WorkGrid from "./WorkGrid";
import Process from "./Process";
import ServiceOfferCTA from "./ServiceOfferCTA";
import SecondaryCTA from "./SecondaryCTA";

export default function WebsitesSqueeze() {
  return (
    <>
      <WebsitesHero kicker={c.hero.kicker} headline={c.hero.headline} subhead={c.hero.subhead} />
      <TrustStrip stats={c.trustStats} ctaLabel="Book the conversion audit" ctaHref="#offer" />
      <Promise text={c.promise} kicker="§ 03 · Promise" />
      <WhatYouGet deliverables={c.deliverables} heading="§ 04 · What you get" />
      {c.workSamples && <WorkGrid samples={c.workSamples} heading="§ 05 · Recent work" />}
      <Process steps={c.process} heading="§ 06 · Process" />
      <ServiceOfferCTA offer={c.offer} />
      <SecondaryCTA />
    </>
  );
}
```

- [ ] **Step 2: Replace route file `src/app/websites/page.tsx`**

```tsx
import WebsitesSqueeze from "@/components/squeeze/WebsitesSqueeze";
import { websitesContent as c } from "@/content/squeeze/websites";
import { buildPageMetadata, buildServiceSchema } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: c.route,
  ogImage: c.meta.ogImage,
});

export default function WebsitesPage() {
  const schema = buildServiceSchema({
    name: "Websites",
    description: c.meta.description,
    url: `https://nextconsulting.dev${c.route}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <WebsitesSqueeze />
    </>
  );
}
```

- [ ] **Step 3: Run dev server and verify page**

Run: `npm run dev`. Visit `http://localhost:3000/websites`. Check:
- Hero renders with device frames and breakpoint labels
- Trust Strip shows real stats (no REPLACE placeholders)
- All section micro-headers visible
- CTA button links to Calendly URL
- `Ctrl+U` → confirm OG/Twitter meta tags + JSON-LD script present

- [ ] **Step 4: Screenshot via Playwright**

```bash
npx playwright screenshot --viewport-size=1440,900 --full-page http://localhost:3000/websites /tmp/websites-desktop.png
npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:3000/websites /tmp/websites-mobile.png
```

- [ ] **Step 5: Commit**

```bash
git add src/components/squeeze/WebsitesSqueeze.tsx src/app/websites/page.tsx
git commit -m "feat: Websites squeeze page — Digital Storefront identity"
```

---

### Task B6: Websites OG image

**Files:**
- Create: `public/og/websites.png`

- [ ] **Step 1: Generate placeholder OG image**

Use the repo's existing brand assets. Quickest path: duplicate `public/og-image.png`, overlay service name. If no image editor is available, commit a copy of `public/og-image.png` as `public/og/websites.png` and log a TODO in research notes to replace with a service-specific OG when design time allows. Size must be 1200×630.

- [ ] **Step 2: Verify file exists at 1200×630**

Run: `file public/og/websites.png`. Expected: PNG image data, 1200 x 630.

- [ ] **Step 3: Commit**

```bash
git add public/og/websites.png
git commit -m "feat: Websites OG image placeholder"
```

---

## Phase C — Graphic Design Squeeze Page

### Task C1: Source stats for Graphic Design trust strip

**Files:**
- Create: `docs/superpowers/plans/research-notes/graphic-design-stats.md`

- [ ] **Step 1: Research 3 stats**

Target sources:
1. Consistent brand presentation → revenue — Lucidpress/Marq "State of Brand Consistency" report.
2. Signature color → recognition — Reboot / University of Loyola Maryland study (often cited as "~80% increase in brand recognition").
3. Brand trust → purchase — Edelman Trust Barometer (latest available year).

- [ ] **Step 2: Record each stat with verifiable URL. Commit.**

```bash
git add docs/superpowers/plans/research-notes/graphic-design-stats.md
git commit -m "docs: research notes for Graphic Design trust-strip stats"
```

---

### Task C2: Graphic Design content file

**Files:**
- Create: `src/content/squeeze/graphic-design.ts`

- [ ] **Step 1: Create file**

Follow the shape of `src/content/squeeze/websites.ts`. Key content:

- `hero.headline`: "A brand is a system. We design the whole system."
- `hero.subhead`: "Identity, guidelines, specimens, and the kit of parts that makes every future touchpoint feel inevitable."
- `promise`: "You walk away with a brand system that holds up across every medium — not a logo in a vacuum."
- `deliverables`: Identity design, Brand guidelines, Type system, Color system, Collateral & specimens.
- `workSamples`: Sam Boswell brand system, Red Hawks identity, Jurassic Park brand exploration, Trade-Up identity, Valley Luxury Transport brand, Driveonix identity. Use existing `/public/images/` backgrounds as placeholders, `status: "placeholder"`.
- `process`: Audit, Strategy, Design, Systematize.
- `offer`: name "Free Brand Consistency Check", 30 min, calendlyUrl `CALENDLY.brandCheck`, buttonLabel "Book the brand check — no pitch", bullets: ["A brand consistency diagnostic", "Top 3 identity gaps across your touchpoints", "A written recommendation with priorities"].
- `meta.ogImage`: `/og/graphic-design.png`.

Use the 3 verified stats from Task C1.

- [ ] **Step 2: Type-check + commit**

```bash
git add src/content/squeeze/graphic-design.ts
git commit -m "feat: Graphic Design squeeze page content with sourced trust stats"
```

---

### Task C3: Graphic Design hero — oversized letterform

**Files:**
- Create: `src/components/squeeze/graphic-design/GraphicDesignHero.tsx`

- [ ] **Step 1: Implement hero**

```tsx
type Props = { kicker?: string; headline: string; subhead?: string };

export default function GraphicDesignHero({ kicker, headline, subhead }: Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center px-6 sm:px-14 pt-40 pb-24 overflow-hidden">
      {/* paper grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: "url('/images/bg-paper.jpg')",
          backgroundSize: "cover",
        }}
      />
      {/* oversized ampersand */}
      <div
        aria-hidden
        className="absolute -right-[8vw] top-1/2 -translate-y-1/2 font-[var(--font-display)] font-800 text-[60vw] leading-[0.8] text-[#f0ebe3]/[0.06] select-none pointer-events-none"
      >
        &amp;
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto w-full">
        {kicker && (
          <div className="font-[var(--font-body)] text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-6">
            {kicker}
          </div>
        )}
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.02] tracking-[-0.02em] text-[#f0ebe3] max-w-[820px]">
          {headline}
        </h1>
        {subhead && (
          <p className="mt-8 font-[var(--font-body)] text-lg leading-[1.55] text-[#f0ebe3]/70 max-w-[600px]">
            {subhead}
          </p>
        )}
        {/* color chips */}
        <div aria-hidden className="mt-14 flex gap-0">
          {["#f0ebe3", "#c4835a", "#070708", "#6b6560", "#0f0f11"].map((c, i) => (
            <div key={i} className="w-14 h-3" style={{ background: c, border: "1px solid rgba(240,235,227,0.1)" }} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/graphic-design/GraphicDesignHero.tsx
git commit -m "feat: Graphic Design hero — oversized letterform + paper grain + color chips"
```

---

### Task C4: Typographic specimen signature section

**Files:**
- Create: `src/components/squeeze/graphic-design/SpecimenRow.tsx`

- [ ] **Step 1: Implement**

```tsx
const WEIGHTS = [400, 500, 600, 700, 800];

export default function SpecimenRow({ word = "next" }: { word?: string }) {
  return (
    <section className="px-6 sm:px-14 py-24" style={{ borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}>
      <div className="max-w-[1300px] mx-auto">
        <div className="font-[var(--font-body)] text-xs tracking-[0.25em] uppercase text-[#8a8480] mb-10">
          Specimen · Syne display · 400 → 800
        </div>
        <div className="space-y-2">
          {WEIGHTS.map((w) => (
            <div
              key={w}
              className="flex items-baseline gap-6 border-b pb-3"
              style={{ borderColor: "var(--divider)" }}
            >
              <span className="font-mono text-xs text-[#6b6560] w-12 shrink-0">{w}</span>
              <span
                className="font-[var(--font-display)] text-[clamp(3rem,8vw,6rem)] leading-none tracking-[-0.02em] text-[#f0ebe3]"
                style={{ fontWeight: w }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/graphic-design/SpecimenRow.tsx
git commit -m "feat: Graphic Design SpecimenRow — type-weight editorial opener"
```

---

### Task C5: Assemble GraphicDesignSqueeze

**Files:**
- Create: `src/components/squeeze/GraphicDesignSqueeze.tsx`
- Modify: `src/app/graphic-design/page.tsx`

- [ ] **Step 1: Assemble**

```tsx
import { graphicDesignContent as c } from "@/content/squeeze/graphic-design";
import GraphicDesignHero from "./graphic-design/GraphicDesignHero";
import SpecimenRow from "./graphic-design/SpecimenRow";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import WorkGrid from "./WorkGrid";
import Process from "./Process";
import ServiceOfferCTA from "./ServiceOfferCTA";
import SecondaryCTA from "./SecondaryCTA";

export default function GraphicDesignSqueeze() {
  return (
    <>
      <GraphicDesignHero kicker={c.hero.kicker} headline={c.hero.headline} subhead={c.hero.subhead} />
      <TrustStrip stats={c.trustStats} ctaLabel="Book the brand check" ctaHref="#offer" />
      <SpecimenRow word="next" />
      <Promise text={c.promise} />
      <WhatYouGet deliverables={c.deliverables} />
      {c.workSamples && <WorkGrid samples={c.workSamples} heading="Selected brand work" />}
      <Process steps={c.process} />
      <ServiceOfferCTA offer={c.offer} />
      <SecondaryCTA />
    </>
  );
}
```

- [ ] **Step 2: Replace route file**

```tsx
import GraphicDesignSqueeze from "@/components/squeeze/GraphicDesignSqueeze";
import { graphicDesignContent as c } from "@/content/squeeze/graphic-design";
import { buildPageMetadata, buildServiceSchema } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: c.route,
  ogImage: c.meta.ogImage,
});

export default function GraphicDesignPage() {
  const schema = buildServiceSchema({
    name: "Graphic Design",
    description: c.meta.description,
    url: `https://nextconsulting.dev${c.route}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GraphicDesignSqueeze />
    </>
  );
}
```

- [ ] **Step 3: Dev-server verify + Playwright screenshot**

Run: `npm run dev`. Visit `/graphic-design`. Then:

```bash
npx playwright screenshot --viewport-size=1440,900 --full-page http://localhost:3000/graphic-design /tmp/gd-desktop.png
npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:3000/graphic-design /tmp/gd-mobile.png
```

Verify: hero ampersand visible but not overwhelming, specimen row stacks cleanly, trust stats cite real sources.

- [ ] **Step 4: Commit**

```bash
git add src/components/squeeze/GraphicDesignSqueeze.tsx src/app/graphic-design/page.tsx
git commit -m "feat: Graphic Design squeeze page — Typographic Specimen identity"
```

---

### Task C6: Graphic Design OG image

- [ ] **Step 1: Create `public/og/graphic-design.png`** (follow Task B6 pattern)

- [ ] **Step 2: Commit**

```bash
git add public/og/graphic-design.png
git commit -m "feat: Graphic Design OG image placeholder"
```

---

## Phase D — Automation Squeeze Page + Case Studies

### Task D1: Source stats for Automation trust strip and counter-claim

**Files:**
- Create: `docs/superpowers/plans/research-notes/automation-stats.md`

- [ ] **Step 1: Research 3 stats + 1 hero counter-claim**

Targets:
1. Lead response time → contact rate — Harvard Business Review "The Short Life of Online Sales Leads" (Oldroyd, McElheran, Elkington, 2011) or MIT / InsideSales studies.
2. Automation ROI gap for mid-market — McKinsey or Forrester report on SMB automation adoption vs enterprise.
3. Industry-specific (auto retail) speed-to-lead or lead-response gap — Cox Automotive, DrivingSales, or similar. If no credible source found, substitute a general sales-velocity stat from Salesforce Research.
4. **Counter-claim headline** — one bold, sourceable statement that's contrarian but defensible. Example targets: "X% of [segment] lose the lead before they answer" / "The [N]-hour industry-average response time costs [metric]". The claim must trace to a real study; the headline phrasing can be yours.

- [ ] **Step 2: Record each with URL, commit.**

```bash
git add docs/superpowers/plans/research-notes/automation-stats.md
git commit -m "docs: research notes for Automation trust stats and counter-claim"
```

---

### Task D2: Automation content file

**Files:**
- Create: `src/content/squeeze/automation.ts`

- [ ] **Step 1: Create file**

Key differences from Websites/Graphic Design:
- `hero.headline` IS the counter-claim from D1 (heavy, declarative).
- `hero.subhead` is the source citation.
- `workSamples` is `undefined` (Automation uses case-study list instead).
- `offer.name` = "Process Discovery Call", durationMinutes 45, calendlyUrl `CALENDLY.processDiscovery`.
- `promise`: "You walk away with a map of which processes to automate, in what order, and where the leverage actually compounds."
- `deliverables`: Process audit, Automation architecture, Build, Handoff & documentation.
- `process`: I. Audit, II. Design, III. Build, IV. Handoff.
- `meta.ogImage`: `/og/automation.png`.

Use the 3 verified stats from Task D1.

- [ ] **Step 2: Type-check + commit**

```bash
git add src/content/squeeze/automation.ts
git commit -m "feat: Automation squeeze page content with sourced counter-claim and stats"
```

---

### Task D3: Automation hero — thesis counter-claim

**Files:**
- Create: `src/components/squeeze/automation/AutomationHero.tsx`

- [ ] **Step 1: Implement**

```tsx
type Props = { kicker?: string; headline: string; subhead?: string };

export default function AutomationHero({ kicker, headline, subhead }: Props) {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between px-6 sm:px-14 pt-40 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-[1100px]">
        {kicker && (
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] mb-8">
            {kicker}
          </div>
        )}
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-[#f0ebe3]">
          {headline}
        </h1>
        {subhead && (
          <p className="mt-10 font-mono text-xs sm:text-sm leading-[1.6] text-[#8a8480] max-w-[600px]">
            <sup className="text-[#c4835a] mr-1">1</sup>
            {subhead}
          </p>
        )}
      </div>
      <div aria-hidden className="relative z-10 font-mono text-[10px] tracking-[0.25em] uppercase text-[#6b6560] flex items-center gap-3">
        <span>Continue</span>
        <span className="h-px w-10 bg-[#6b6560]" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/automation/AutomationHero.tsx
git commit -m "feat: Automation hero — text-only counter-claim with footnote citation"
```

---

### Task D4: Academic section markers

**Files:**
- Create: `src/components/squeeze/automation/RomanSection.tsx`

- [ ] **Step 1: Implement**

```tsx
type Props = { numeral: string; label: string };

export default function RomanSection({ numeral, label }: Props) {
  return (
    <div className="font-mono text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-12">
      <span className="mr-3 text-[#f0ebe3]">{numeral}.</span>
      {label}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/squeeze/automation/RomanSection.tsx
git commit -m "feat: Automation RomanSection — academic-paper section marker"
```

---

### Task D5: CaseStudyList + loader (TDD)

**Files:**
- Create: `src/lib/case-studies.ts`
- Create: `src/lib/case-studies.test.ts`
- Create: `src/components/squeeze/automation/CaseStudyList.tsx`

- [ ] **Step 1: Write failing test for loader**

```ts
import { describe, expect, test } from "vitest";
import { loadCaseStudies, loadCaseStudyBySlug } from "./case-studies";

describe("loadCaseStudies", () => {
  test("returns at least one case study sorted by publishedAt desc", async () => {
    const all = await loadCaseStudies();
    expect(all.length).toBeGreaterThan(0);
    if (all.length > 1) {
      expect(all[0].publishedAt >= all[1].publishedAt).toBe(true);
    }
  });
});

describe("loadCaseStudyBySlug", () => {
  test("returns null for unknown slug", async () => {
    const cs = await loadCaseStudyBySlug("nonexistent-slug-xyz");
    expect(cs).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests — expect FAIL (module not found)**

Run: `npm test -- case-studies`. Expected: FAIL.

- [ ] **Step 3: Implement loader**

```ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { CaseStudyFrontmatter } from "@/content/squeeze/types";

export type CaseStudyRecord = CaseStudyFrontmatter & { body: string };

const DIR = path.join(process.cwd(), "src/content/case-studies");

async function listMdx(): Promise<string[]> {
  try {
    const entries = await fs.readdir(DIR);
    return entries.filter((e) => e.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export async function loadCaseStudies(): Promise<CaseStudyRecord[]> {
  const files = await listMdx();
  const records = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const parsed = matter(raw);
      const fm = parsed.data as CaseStudyFrontmatter;
      return { ...fm, body: parsed.content };
    }),
  );
  return records.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export async function loadCaseStudyBySlug(slug: string): Promise<CaseStudyRecord | null> {
  const all = await loadCaseStudies();
  return all.find((r) => r.slug === slug) ?? null;
}
```

- [ ] **Step 4: Seed a case study (so `loadCaseStudies` returns ≥1)**

Create `src/content/case-studies/dealer-lead-response-time.mdx`:

```mdx
---
slug: "dealer-lead-response-time"
title: "Dropping first-touch response time from 18 hours to 4 minutes"
problem: "A six-store auto group was losing late-evening leads to competitors who answered first. Internal BDC hours ended at 7pm; 41% of inbound leads arrived after close."
hypothesis: "Automating first-touch acknowledgement + structured handoff to a human in the morning would recover the majority of lost lead velocity without adding BDC headcount."
results:
  - { metric: "Median first-touch time", value: "4 min", context: "Previously 18 hours, nights-and-weekends leads" }
  - { metric: "Lead-to-appointment", value: "+41%", context: "90-day window post-deployment" }
  - { metric: "BDC headcount added", value: "0", context: "Automation absorbed after-hours volume" }
sources:
  - { label: "HBR, The Short Life of Online Sales Leads (Oldroyd et al.)", url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads" }
publishedAt: "2026-04-18"
ogImage: "/og/case-studies/dealer-lead-response-time.png"
---

## The Problem

After-hours lead volume was being lost to faster-responding competitors. The group's CRM showed 41% of inbound leads arriving between 7pm and 8am, with first-touch times averaging 18 hours when the BDC reopened.

## The Approach

We audited the inbound lead pathway across all six stores, mapped the current CRM and messaging stack, and designed a three-stage automation:

1. Instant acknowledgement with a named sender and ETA for human follow-up.
2. Pre-qualification questions routed to enrichment, scored, and staged for the next-morning BDC queue.
3. A BDC handoff dashboard that pre-loads context so the first human touch is substantive, not remedial.

## Results

Median first-touch time dropped from 18 hours to 4 minutes. Lead-to-appointment rose 41% over the 90-day post-deployment window, with zero BDC headcount added.

[Book a process discovery call](#offer) to see whether your stores have the same pattern.
```

- [ ] **Step 5: Run tests — expect PASS**

Run: `npm test -- case-studies`. Expected: both tests PASS.

- [ ] **Step 6: Implement CaseStudyList component**

```tsx
import type { CaseStudyRecord } from "@/lib/case-studies";
import Link from "next/link";

type Props = { studies: CaseStudyRecord[] };

export default function CaseStudyList({ studies }: Props) {
  return (
    <div className="space-y-20">
      {studies.map((s, i) => (
        <article key={s.slug} className="max-w-[900px]">
          <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#8a8480] mb-3">
            Case Study · {String(i + 1).padStart(2, "0")}
          </div>
          <h3 className="font-[var(--font-display)] font-700 text-2xl md:text-3xl leading-[1.2] text-[#f0ebe3]">
            {s.title}
          </h3>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-6 md:gap-x-10 font-[var(--font-body)] text-[15px] leading-[1.7]">
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Problem</div>
            <p className="text-[#f0ebe3]/85">{s.problem}</p>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Hypothesis</div>
            <p className="text-[#f0ebe3]/85">{s.hypothesis}</p>
            <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Results</div>
            <ul className="space-y-2">
              {s.results.map((r, ri) => (
                <li key={ri} className="flex gap-4">
                  <span className="font-[var(--font-display)] font-700 text-[#f0ebe3] w-20 shrink-0">{r.value}</span>
                  <span className="text-[#f0ebe3]/85">
                    {r.metric} — <span className="text-[#8a8480]">{r.context}</span>
                  </span>
                </li>
              ))}
            </ul>
            {s.sources.length > 0 && (
              <>
                <div className="font-mono text-xs tracking-[0.2em] uppercase text-[#c4835a] pt-1">Sources</div>
                <ul className="space-y-1">
                  {s.sources.map((src, si) => (
                    <li key={si}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#8a8480] hover:text-[#c4835a]"
                      >
                        — {src.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <Link
            href={`/case-studies/${s.slug}`}
            className="inline-block mt-8 text-sm tracking-[0.12em] uppercase text-[#c4835a] hover:text-[#d4935a] border-b border-[#c4835a] pb-0.5"
          >
            Read the full study →
          </Link>
        </article>
      ))}
    </div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/case-studies.ts src/lib/case-studies.test.ts src/components/squeeze/automation/CaseStudyList.tsx src/content/case-studies/
git commit -m "feat: case study MDX loader + CaseStudyList + seed dealer-lead-response study"
```

---

### Task D6: Assemble AutomationSqueeze

**Files:**
- Create: `src/components/squeeze/AutomationSqueeze.tsx`
- Modify: `src/app/automation/page.tsx`

- [ ] **Step 1: Assemble**

```tsx
import { automationContent as c } from "@/content/squeeze/automation";
import { loadCaseStudies } from "@/lib/case-studies";
import AutomationHero from "./automation/AutomationHero";
import RomanSection from "./automation/RomanSection";
import CaseStudyList from "./automation/CaseStudyList";
import TrustStrip from "./TrustStrip";
import Promise from "./Promise";
import WhatYouGet from "./WhatYouGet";
import Process from "./Process";
import ServiceOfferCTA from "./ServiceOfferCTA";
import SecondaryCTA from "./SecondaryCTA";

export default async function AutomationSqueeze() {
  const studies = await loadCaseStudies();
  return (
    <>
      <AutomationHero kicker={c.hero.kicker} headline={c.hero.headline} subhead={c.hero.subhead} />
      <TrustStrip stats={c.trustStats} accent="mono" ctaLabel="Book a discovery call" ctaHref="#offer" />
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
        <div className="max-w-[900px]">
          <RomanSection numeral="I" label="The thesis" />
          <Promise text={c.promise} />
        </div>
      </section>
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)", background: "#0c0c0e" }}>
        <div className="max-w-[1100px]">
          <RomanSection numeral="II" label="What you get" />
          <WhatYouGet deliverables={c.deliverables} heading="" />
        </div>
      </section>
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
        <div className="max-w-[1100px]">
          <RomanSection numeral="III" label="Evidence" />
          <CaseStudyList studies={studies} />
        </div>
      </section>
      <section className="px-6 sm:px-14 py-28" style={{ borderTop: "1px solid var(--divider)" }}>
        <div className="max-w-[1100px]">
          <RomanSection numeral="IV" label="Method" />
          <Process steps={c.process} heading="" />
        </div>
      </section>
      <ServiceOfferCTA offer={c.offer} />
      <SecondaryCTA />
    </>
  );
}
```

Note: `WhatYouGet` and `Process` both accept an empty `heading=""` — verify they render cleanly with no heading when empty (add a conditional in each to skip the heading element when empty if needed).

- [ ] **Step 2: Update `WhatYouGet.tsx` + `Process.tsx` to skip heading when empty**

In each, change `<h2 ...>{heading}</h2>` to `{heading && <h2 ...>{heading}</h2>}`.

- [ ] **Step 3: Replace route file**

```tsx
import AutomationSqueeze from "@/components/squeeze/AutomationSqueeze";
import { automationContent as c } from "@/content/squeeze/automation";
import { buildPageMetadata, buildServiceSchema } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: c.meta.title,
  description: c.meta.description,
  path: c.route,
  ogImage: c.meta.ogImage,
});

export default function AutomationPage() {
  const schema = buildServiceSchema({
    name: "Automation",
    description: c.meta.description,
    url: `https://nextconsulting.dev${c.route}`,
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {/* @ts-expect-error — async server component */}
      <AutomationSqueeze />
    </>
  );
}
```

- [ ] **Step 4: Dev-server verify**

Run: `npm run dev`. Visit `/automation`. Verify:
- Hero shows counter-claim + footnote citation
- Roman numeral section markers
- Case study list renders the seed study with problem/hypothesis/results columns
- No WhatYouGet/Process heading duplication

- [ ] **Step 5: Commit**

```bash
git add src/components/squeeze/AutomationSqueeze.tsx src/app/automation/page.tsx src/components/squeeze/WhatYouGet.tsx src/components/squeeze/Process.tsx
git commit -m "feat: Automation squeeze page — Thesis Paper identity"
```

---

### Task D7: Case study detail route + ShareRow

**Files:**
- Create: `src/app/case-studies/[slug]/page.tsx`
- Create: `src/components/squeeze/ShareRow.tsx`
- Create: `src/components/squeeze/ShareRow.test.tsx`

- [ ] **Step 1: Write failing test for ShareRow URL formatting**

```ts
import { describe, expect, test } from "vitest";
import { buildShareUrls } from "./ShareRow";

describe("buildShareUrls", () => {
  test("encodes title and URL for X and LinkedIn", () => {
    const u = buildShareUrls({
      url: "https://nextconsulting.dev/case-studies/foo",
      title: "A case study: 41% lift",
    });
    expect(u.x).toContain(encodeURIComponent("A case study: 41% lift"));
    expect(u.x).toContain(encodeURIComponent("https://nextconsulting.dev/case-studies/foo"));
    expect(u.linkedin).toContain(encodeURIComponent("https://nextconsulting.dev/case-studies/foo"));
  });
});
```

- [ ] **Step 2: Run — expect FAIL**

Run: `npm test -- ShareRow`. Expected: FAIL.

- [ ] **Step 3: Implement ShareRow**

```tsx
"use client";

import { useState } from "react";

export type ShareInput = { url: string; title: string };

export function buildShareUrls(i: ShareInput) {
  const u = encodeURIComponent(i.url);
  const t = encodeURIComponent(i.title);
  return {
    x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
}

export default function ShareRow({ url, title }: ShareInput) {
  const [copied, setCopied] = useState(false);
  const urls = buildShareUrls({ url, title });
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex gap-4 items-center font-[var(--font-body)] text-xs tracking-[0.12em] uppercase">
      <span className="text-[#6b6560]">Share</span>
      <a href={urls.x} target="_blank" rel="noopener noreferrer" className="text-[#8a8480] hover:text-[#c4835a]">X</a>
      <a href={urls.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#8a8480] hover:text-[#c4835a]">LinkedIn</a>
      <button onClick={copy} className="text-[#8a8480] hover:text-[#c4835a]">
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
```

- [ ] **Step 4: Run test — expect PASS**

Run: `npm test -- ShareRow`. Expected: PASS.

- [ ] **Step 5: Implement case study detail route**

Create `src/app/case-studies/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { loadCaseStudies, loadCaseStudyBySlug } from "@/lib/case-studies";
import { buildArticleMetadata, buildArticleSchema } from "@/lib/metadata";
import ShareRow from "@/components/squeeze/ShareRow";
import SecondaryCTA from "@/components/squeeze/SecondaryCTA";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await loadCaseStudies();
  return all.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = await loadCaseStudyBySlug(slug);
  if (!cs) return {};
  return buildArticleMetadata({
    title: cs.title,
    description: cs.problem,
    path: `/case-studies/${cs.slug}`,
    ogImage: cs.ogImage ?? "/og-image.png",
    publishedAt: cs.publishedAt,
  });
}

export default async function CaseStudyDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = await loadCaseStudyBySlug(slug);
  if (!cs) notFound();
  const url = `https://nextconsulting.dev/case-studies/${cs.slug}`;
  const schema = buildArticleSchema({
    headline: cs.title,
    description: cs.problem,
    url,
    datePublished: cs.publishedAt,
    image: cs.ogImage ?? "/og-image.png",
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="px-6 sm:px-14 pt-40 pb-24 max-w-[820px] mx-auto">
        <div className="font-mono text-xs tracking-[0.25em] uppercase text-[#c4835a] mb-6">
          Case study · {new Date(cs.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </div>
        <h1 className="font-[var(--font-display)] font-800 text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-[-0.02em] text-[#f0ebe3]">
          {cs.title}
        </h1>
        <div className="mt-8">
          <ShareRow url={url} title={cs.title} />
        </div>
        <div
          className="mt-14 font-[var(--font-body)] text-[16px] leading-[1.75] text-[#f0ebe3]/85 prose-headings:font-[var(--font-display)] prose-headings:text-[#f0ebe3] prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-5 prose-a:text-[#c4835a] prose-a:underline-offset-4 prose-strong:text-[#f0ebe3]"
          dangerouslySetInnerHTML={{ __html: await renderMdx(cs.body) }}
        />
        <hr className="my-16" style={{ borderColor: "var(--divider)" }} />
        <div className="flex items-center justify-between">
          <Link href="/automation" className="text-sm tracking-[0.12em] uppercase text-[#c4835a] hover:text-[#d4935a]">
            ← Back to Automation
          </Link>
          <ShareRow url={url} title={cs.title} />
        </div>
      </article>
      <SecondaryCTA />
    </>
  );
}

async function renderMdx(source: string): Promise<string> {
  const { compile } = await import("@mdx-js/mdx");
  const compiled = await compile(source, { outputFormat: "function-body" });
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { MDXProvider } = await import("@mdx-js/react");
  // Evaluate compiled function body.
  // eslint-disable-next-line no-new-func
  const mod = new Function("React", "_jsx_runtime", `${String(compiled)}; return MDXContent;`);
  const React = await import("react");
  const jsxRuntime = await import("react/jsx-runtime");
  const Content = mod(React, jsxRuntime);
  return renderToStaticMarkup(
    React.createElement(MDXProvider, {}, React.createElement(Content)),
  );
}
```

Note: The MDX rendering above uses `@mdx-js/mdx` compile + `react-dom/server`. Verify this matches what `@next/mdx` documents in the version installed. Alternate path: treat the body as markdown and use `remark` → HTML. If the function-body eval feels fragile, prefer the remark route:

```ts
async function renderMdx(source: string): Promise<string> {
  const { unified } = await import("unified");
  const remarkParse = (await import("remark-parse")).default;
  const remarkRehype = (await import("remark-rehype")).default;
  const rehypeStringify = (await import("rehype-stringify")).default;
  const file = await unified().use(remarkParse).use(remarkRehype).use(rehypeStringify).process(source);
  return String(file);
}
```

If using the remark fallback, install:

```bash
npm install unified remark-parse remark-rehype rehype-stringify
```

- [ ] **Step 6: Verify the route renders**

Run: `npm run dev`. Visit `/case-studies/dealer-lead-response-time`. Check body markdown renders, ShareRow works, link back to `/automation` works.

- [ ] **Step 7: Commit**

```bash
git add src/app/case-studies/ src/components/squeeze/ShareRow.tsx src/components/squeeze/ShareRow.test.tsx package.json package-lock.json
git commit -m "feat: case study detail route with MDX rendering + ShareRow"
```

---

### Task D8: Automation OG image

- [ ] **Step 1: Create `public/og/automation.png`** (follow Task B6 pattern)

- [ ] **Step 2: Commit**

```bash
git add public/og/automation.png
git commit -m "feat: Automation OG image placeholder"
```

---

## Phase E — Verification & Cleanup

### Task E1: Verify ServicePageLayout no longer used by the three routes

- [ ] **Step 1: Grep for stale imports**

Run: `grep -r "ServicePageLayout" src/app/websites src/app/graphic-design src/app/automation`

Expected: no matches.

- [ ] **Step 2: Check wider usage**

Run: `grep -rn "ServicePageLayout" src/`

Record any remaining usages. If none outside `src/components/ServicePageLayout.tsx` itself, add a comment at the top of that file marking it deprecated for the three squeeze routes but available if a future generic service page is added. Do not delete it.

- [ ] **Step 3: Commit if comment added**

```bash
git add src/components/ServicePageLayout.tsx
git commit -m "docs: mark ServicePageLayout as deprecated for current squeeze routes"
```

---

### Task E2: Lighthouse verification

- [ ] **Step 1: Run production build**

```bash
npm run build && npm run start
```

- [ ] **Step 2: Run Lighthouse per page**

```bash
npx lighthouse http://localhost:3000/websites --only-categories=performance,accessibility,best-practices,seo --preset=desktop --output=json --output-path=/tmp/lh-websites.json --chrome-flags="--headless"
npx lighthouse http://localhost:3000/graphic-design --only-categories=performance,accessibility,best-practices,seo --preset=desktop --output=json --output-path=/tmp/lh-gd.json --chrome-flags="--headless"
npx lighthouse http://localhost:3000/automation --only-categories=performance,accessibility,best-practices,seo --preset=desktop --output=json --output-path=/tmp/lh-automation.json --chrome-flags="--headless"
```

- [ ] **Step 3: Verify scores**

Each page must have Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Extract scores:

```bash
for f in /tmp/lh-websites.json /tmp/lh-gd.json /tmp/lh-automation.json; do
  echo "=== $f ==="
  node -e "const j=require('$f'); for (const k of Object.keys(j.categories)) console.log(k, j.categories[k].score*100);"
done
```

If any score falls below its threshold, fix the specific audit findings before proceeding.

- [ ] **Step 4: Commit any fixes**

Use appropriate `fix:` commit messages per category.

---

### Task E3: Playwright full visual review

- [ ] **Step 1: Capture all three pages, desktop + mobile, full page**

```bash
mkdir -p /tmp/nc-review-final
for p in websites graphic-design automation; do
  npx playwright screenshot --viewport-size=1440,900 --full-page http://localhost:3000/$p /tmp/nc-review-final/$p-desktop.png
  npx playwright screenshot --viewport-size=390,844 --full-page http://localhost:3000/$p /tmp/nc-review-final/$p-mobile.png
done
npx playwright screenshot --viewport-size=1440,900 --full-page http://localhost:3000/case-studies/dealer-lead-response-time /tmp/nc-review-final/case-study.png
```

- [ ] **Step 2: Open and review each**

Open all screenshots. Verify against design spec §4 (per-service visual identity). Record any gaps.

- [ ] **Step 3: Address any P0/P1 gaps, commit fixes.**

---

### Task E4: OG unfurl verification

- [ ] **Step 1: Inspect meta tags in rendered HTML**

For each URL, `curl -sL http://localhost:3000/<path> | grep -E '(og:|twitter:|canonical)'`. Verify:
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type` all present.
- `twitter:card=summary_large_image`, `twitter:image` present.
- `<link rel="canonical" href="https://nextconsulting.dev/...">` present.
- `<script type="application/ld+json">` present with valid JSON.

- [ ] **Step 2: If any missing, fix `buildPageMetadata` or route and commit**

---

### Task E5: Final summary + merge

- [ ] **Step 1: Run all tests + typecheck + build**

```bash
npm test
npx tsc --noEmit
npm run build
```

All must pass.

- [ ] **Step 2: Update spec cross-link**

Append to `docs/superpowers/specs/2026-04-17-squeeze-pages-redesign-design.md`:

```markdown
---

**Implementation:** Shipped per `docs/superpowers/plans/2026-04-17-squeeze-pages-redesign.md`. See git log `feat(squeeze):` tagged commits.
```

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-04-17-squeeze-pages-redesign-design.md
git commit -m "docs: link squeeze-pages spec to implementation plan"
```

- [ ] **Step 4: Offer PR or direct push**

Ask user: "Ready to push to main, or open a PR for review first?" Proceed based on answer.

---

## Self-Review Notes

- **Spec §2 Architecture:** Covered by Phase A (foundations) + Phase B/C/D assembly tasks. ✓
- **Spec §3 Skeleton order:** Enforced by each Squeeze assembly task. ✓
- **Spec §4 Per-service identities:** B3, C3, C4, D3, D4 each ship the service-specific visual motif. ✓
- **Spec §5 Stats + citations:** B1, C1, D1 each require real verifiable URLs before committing content files. ✓
- **Spec §6 CTAs:** A4 (Calendly constants), A8 (ServiceOfferCTA), A9 (SecondaryCTA), used by each assembly task. ✓
- **Spec §7 Sharability:** A5 (metadata helpers), D5 (MDX loader), D7 (ShareRow + canonical + JSON-LD + case study route). ✓
- **Spec §8 A11y rules:** A1 (raised divider opacity), B3 (prefers-reduced-motion), Task E2 (Lighthouse accessibility ≥95). ✓
- **Spec §9 Success criteria:** E2 (Lighthouse ≥90), E3 (visual diff), E4 (OG verification). ✓
- **Spec §10 Non-goals:** Plan does not introduce CMS, syndication, admin UI, or changes to homepage/other routes beyond necessary nav-consistency. ✓
- **Type consistency check:** `SqueezePageContent` defined once (Task A3), imported in B2/C2/D2. `CaseStudyRecord` = `CaseStudyFrontmatter & { body }`, defined in D5. `ServiceOffer.calendlyUrl` populated from `CALENDLY.*` constants in every content file. Consistent.
- **Placeholder scan:** "REPLACE" appears only in Task B2 Step 1 as an explicit marker the engineer must overwrite before committing, with an explicit gate in Step 2. No bare TBDs or TODOs elsewhere.
