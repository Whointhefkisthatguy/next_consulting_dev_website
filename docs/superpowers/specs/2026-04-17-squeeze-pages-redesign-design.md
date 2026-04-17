# Squeeze Pages Redesign — Design Spec

**Date:** 2026-04-17
**Project:** nextconsulting.dev
**Scope:** Rebuild `/websites`, `/graphic-design`, and `/automation` as standalone, visually distinct squeeze pages.

---

## 1. Goal

Turn the three service pages into self-sufficient squeeze pages that:

- Can land cold traffic without feeling like funnel throwaways (hybrid: keep nav, footer, brand system).
- Look and feel distinct from each other — the current shared template reads as templated.
- Carry real sourced proof (industry stats + work samples) on every page.
- Route cold visitors to a service-specific offer, each on its own Calendly event.
- Ship a content-file architecture so mock assets swap to real ones in one place.
- Are prepared (but not built) for a future syndication pipeline that cross-posts case studies to premium blog destinations with proper canonical handling.

Out of scope for this spec: syndication pipeline itself (deferred to Project 2).

---

## 2. Architecture

### 2.1 File layout

```
src/app/
  websites/page.tsx            ← thin route file, imports squeeze component
  graphic-design/page.tsx
  automation/page.tsx

src/components/squeeze/
  WebsitesSqueeze.tsx          ← unique visual identity: Digital Storefront
  GraphicDesignSqueeze.tsx     ← unique visual identity: Typographic Specimen
  AutomationSqueeze.tsx        ← unique visual identity: Thesis Paper
  TrustStrip.tsx               ← shared; reads stats from content file
  WorkGrid.tsx                 ← shared; Websites + Graphic Design
  CaseStudyList.tsx            ← Automation only; academic format
  ServiceOfferCTA.tsx          ← shared; per-service offer props
  ShareRow.tsx                 ← case studies; X / LinkedIn / Copy

src/content/squeeze/
  websites.ts                  ← copy, stats, work samples, offer
  graphic-design.ts
  automation.ts

src/content/case-studies/
  [slug].mdx                   ← Automation case studies in MDX
  [slug]/og.png                ← social preview image per case study
```

`ServicePageLayout.tsx` is retired from these three routes. It may remain in the codebase for future generic service pages.

### 2.2 Data model

**Trust Strip stat:**

```ts
type TrustStat = {
  value: string;           // "47%"
  label: string;           // "higher conversion..."
  source: { label: string; url: string };
};
```

**Work sample (Websites, Graphic Design):**

```ts
type WorkSample = {
  title: string;
  client: string;
  tags: string[];
  image: string;                                     // mock or real
  href?: string;
  status?: "placeholder" | "live";                   // renders "Coming soon" ribbon if placeholder
};
```

**Automation case study (MDX frontmatter):**

```yaml
---
slug: "dealer-lead-response-time"
title: "Dropping first-touch response time from 18 hours to 4 minutes"
problem: "..."
hypothesis: "..."
results:
  - { metric: "Response time", value: "4m", context: "P50" }
  - { metric: "Lead-to-appointment", value: "+41%", context: "90 day window" }
sources:
  - { label: "InsideSales Lead Response Study", url: "..." }
ogImage: "/case-studies/dealer-lead-response-time/og.png"
publishedAt: "2026-04-20"
---
```

**Service offer:**

```ts
type ServiceOffer = {
  name: string;                     // "Free Website Conversion Audit"
  durationMinutes: number;
  bullets: string[];                // 2–3 deliverables
  calendlyUrl: string;              // event-specific URL
  buttonLabel: string;              // "Book the audit — no pitch"
};
```

**Rationale:** All page-specific content lives in typed content files. Swapping mock imagery for real work is a single-line change per sample. No DB, no CMS in Project 1.

---

## 3. Shared Squeeze Page Skeleton

Every squeeze page uses this section sequence. Visual treatment differs per service; the funnel stays constant.

```
1. HERO                 unique per service (see §4)
2. TRUST STRIP          3 sourced stats + soft "book the audit" button
3. PROMISE              one-sentence outcome at display size
4. WHAT YOU GET         service-flavored deliverables
5. PROOF                Websites/GD: work grid | Automation: case study list
6. PROCESS              4 steps, retained from existing structure
7. SERVICE-OFFER CTA    full-width block, named offer, Calendly button
8. SECONDARY CTA        single line "not ready? email me directly"
```

Design rules:

- **Dual CTA**: soft button at end of Trust Strip (non-scrollers) + full-width block at §7 (scrollers). Both point to the same Calendly URL for that page.
- **Trust Strip is fixed height with visible dividers.** No 0.06-opacity ghost borders. Accent color on stat values. Citation row sits directly beneath.
- **Promise section is one short sentence, display type.** Replaces the current multi-paragraph intro.
- **Service-Offer CTA is bordered, full width, uses the service's accent.** Names the offer, lists 2–3 bullets, single button. Micro-copy "no pitch" to reduce cold-booking friction.
- **Secondary CTA** at the very bottom: *"Not ready to book? Email me a question directly →"* mailto link.

These fixes eliminate three P1 review findings: invisible borders, sections looking identical, Drucker quote reading as filler (it moves into hero as an accent, not a section).

---

## 4. Per-Service Visual Identities

Shared brand tokens (colors, fonts, nav, footer). Distinct hero, motif, and rhythm per page.

### 4.1 Websites — *Digital Storefront*

**Feel:** precision, performance, conversion.

- **Hero:** large H1 framed by device/viewport outlines — desktop frame left, mobile frame right, both rendering a shared wordmark to imply responsive mastery. Ambient terminal-cursor blink on the headline.
- **Motif:** hairline grid overlays, viewport breakpoint labels as decorative type (`1440 · 1024 · 768 · 390`), monospace metadata captions.
- **Accent:** terracotta on conversion-related numbers only.
- **Section transitions:** breakpoint micro-header before each section (`§ 02 · Trust`). Page reads like a spec.
- **Signature section:** Trust Strip bleeds into a subtle browser-chrome frame that "renders" on scroll.

### 4.2 Graphic Design — *Typographic Specimen*

**Feel:** craft, material, editorial.

- **Hero:** oversized letterform (`G` or ampersand) set at ~60vw, bleeding off the edge. H1 tucks into the negative space. Paper/grain texture at 5% opacity.
- **Motif:** type specimens (weight samples, kerning pairs), pantone-style color chips inline, baseline grid rules.
- **Accent:** terracotta becomes one of three swatches — this page earns color variety because it's about brand systems.
- **Section transitions:** numbered dingbat glyphs between sections instead of horizontal rules.
- **Signature section:** a "specimen" row between Trust Strip and Promise — wordmark set in 6 weights scaling down the page like an editorial opener.

### 4.3 Automation — *Thesis Paper*

**Feel:** research-grade, contrarian, quiet confidence.

- **Hero:** heavy declarative counter-claim H1. No image, no video. Example form:
  > **"78% of dealerships answer a web lead after the prospect has bought a different car."**
  > — MIT / InsideSales lead-response study, 2021¹

  Small footnote link at the bottom of the hero. No CTA button in hero — the claim and a quiet scroll cue are the whole composition.
- **Motif:** monospace for stats, citations, diagrams. System-diagram strokes (arrow flows) as section dividers. Footnote-style superscripts throughout.
- **Accent:** terracotta only for footnote markers and the single "book discovery" CTA. Otherwise near-monochrome.
- **Section transitions:** academic-paper section markers (`I. The Problem`, `II. Evidence`, `III. Method`, `IV. Results`).
- **Signature section:** Proof is a vertical stack of short case studies in academic format (Problem → Hypothesis → Approach → Result with sourced metric). Not a visual grid.

---

## 5. Stats, Citations, Copy Sourcing

**Approach:** 3 real sourced stats per page. Citations shown as small grey captions under each stat.

**Sourcing tiers (priority order):**
1. Primary research: Baymard Institute, Nielsen Norman Group, MIT studies, Forrester, McKinsey, Gartner.
2. Platform data: Google (Core Web Vitals), HubSpot, Salesforce Research, Shopify, Adobe.
3. Industry surveys: Lucidpress/Marq brand consistency report, Stanford web credibility, Hick's law studies.

**What to avoid:** unsourced "90% of businesses" claims, vendor whitepapers with obvious selection bias, random blog stats.

**Candidate stat directions per page** (final sourcing happens during implementation):

**Websites — Digital Storefront**
- Page-speed → conversion (Google / Deloitte "Milliseconds Make Millions").
- Mobile UX expectations (Google / Baymard).
- First-impression design judgment speed (Stanford / Lindgaard study).

**Graphic Design — Typographic Specimen**
- Consistent brand presentation → revenue (Lucidpress / Marq).
- Signature color → brand recognition (Reboot / University of Loyola).
- Brand trust → purchase decision (Edelman Trust Barometer).

**Automation — Thesis Paper**
- Lead response time vs. contact rate (HBR / MIT / InsideSales).
- Automation ROI gap for mid-market (McKinsey / Forrester).
- Dealer-specific: speed-to-lead average (Cox Automotive / DrivingSales if sourceable).

**Citation format beneath each stat:**

```
— Baymard Institute, 2024
```

Citations link to source. Verifiability is load-bearing for credibility.

**Copy tone per page:**
- Websites: declarative, precision (reads like a spec).
- Graphic Design: editorial, deliberate (reads like an essay).
- Automation: academic, contrarian (reads like a thesis).

---

## 6. CTAs and Calendly

### 6.1 Service-specific offer routing

| Page | Offer | Calendly event | Duration |
|---|---|---|---|
| Websites | Free Website Conversion Audit | `/nextconsulting/website-audit` | 30 min |
| Graphic Design | Free Brand Consistency Check | `/nextconsulting/brand-check` | 30 min |
| Automation | Process Discovery Call | `/nextconsulting/process-discovery` | 45 min |

All route to the same human; Calendly event types drive per-call prep and per-page conversion tracking. Event URLs above are target paths — actual events must be created in Calendly admin before launch. If a specific event doesn't exist yet, the content file falls back to a single default Calendly URL so the page never links to a 404.

### 6.2 Offer-block copy pattern

```
FREE WEBSITE CONVERSION AUDIT

30-minute call. I'll walk through your site
against the same checklist I use for clients.

You'll leave with:
  → A conversion-rate diagnostic
  → Top 3 friction points, prioritized
  → A written recommendation you can act on

[ Book the audit — no pitch ]
```

"No pitch" micro-copy reduces cold-booking friction.

### 6.3 Secondary CTA

Single line at page bottom:

> *Not ready to book? Email me a question directly →* (mailto link)

Catches visitors not ready for a 30-min commitment; keeps email funnel warm.

---

## 7. Sharability — Project-2-Friendly Preparation

Project 1 bakes in everything a future syndication pipeline needs, without building the pipeline itself.

- **MDX case studies** at `src/content/case-studies/[slug].mdx`. Portable to any future target (Medium, LinkedIn, Substack, Dev.to, Hashnode).
- **Per-page and per-case-study metadata** via Next.js `generateMetadata()`:
  - Open Graph (title, description, image, url, type).
  - Twitter card (`summary_large_image`).
  - **Canonical URL** always points to `nextconsulting.dev/...` so future cross-posts avoid duplicate-content penalties.
  - JSON-LD structured data: `Article` schema for case studies, `Service` schema for squeeze pages.
- **Share row** on every case study — X, LinkedIn, Copy link, pre-filled share text with a quote from the case study.
- **Internal backlinks** from case study → parent squeeze page and home, anchor text matching the service ("see the Websites offer").
- **Unique social preview image per case study** at `src/content/case-studies/[slug]/og.png`. Default fallback image available while placeholders exist.

No CMS, no admin UI, no publishing queue. Authoring loop: drop MDX + OG image into folder → commit → redeploy.

---

## 8. Visual and Accessibility Rules

- **No `rgba(..., 0.06)` ghost borders.** Minimum divider opacity is 0.15, and dividers use the service's accent treatment, not just white.
- **Contrast floor:** body text ≥ 4.5:1, interactive elements ≥ 3:1 against their background. Current 0.55–0.75 alpha body text is borderline; Promise and CTA copy must clear 4.5:1.
- **Keyboard focus states required** on every CTA, citation link, and share button.
- **`prefers-reduced-motion` respected** on all entrance animations and hero cursor blinks.
- **Images:** `next/image` with explicit width/height and meaningful `alt`. Placeholder work images get descriptive alt text ("Mock: ClientName website redesign").

---

## 9. Success Criteria

- All three pages render at `/websites`, `/graphic-design`, `/automation` with distinct hero visuals matching §4.
- Each page has a real Trust Strip with 3 sourced, cited stats.
- Each page routes cold visitors to its own Calendly event.
- Adding or swapping a work sample or case study is a single-file change (content file or MDX drop-in).
- Social share preview (Open Graph) for each page and each case study renders correctly on X, LinkedIn, and iMessage unfurl.
- Canonical URL is set on every page and case study.
- P0 broken items from the Playwright review are fixed on these three pages as a side-effect of the rebuild:
  - Visible section dividers (not 0.06 opacity).
  - No mobile sticky CTA / footer overlap on these pages.
  - Differentiated services (no more identical-looking service pages).
- Lighthouse performance score ≥ 90 on each page (mobile + desktop).

---

## 10. Explicit Non-Goals

- No CMS or admin authoring UI.
- No automated syndication / cross-posting (deferred to Project 2).
- No changes to homepage, `/about`, `/contact`, `/work`, or `/case-studies` routes beyond what's needed to keep nav consistent.
- No redesign of `ServicePageLayout.tsx` itself — it's retired from these routes; future generic service pages can still use it.
- No new CMS-agnostic image pipeline — `public/` + `next/image` is sufficient for Project 1.

---

**Implementation:** Shipped per `docs/superpowers/plans/2026-04-17-squeeze-pages-redesign.md`. See git log `feat:` / `fix(a11y):` commits from 2026-04-17.
