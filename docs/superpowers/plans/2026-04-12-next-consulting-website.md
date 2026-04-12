# Next Consulting Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a minimal, authority-driven single-page consulting website with five scroll sections: monogram, Drucker quote, H1 transition, contrarian truths with counter metrics, and private inquiry form.

**Architecture:** Next.js 15+ App Router with a single page route. Five viewport-height sections rendered in sequence. Scroll-triggered fade-in animations via Framer Motion. CSS grain texture overlay. Form submission via Next.js API route.

**Tech Stack:** Next.js 15+, React 19, Tailwind CSS 4, Framer Motion 11, TypeScript, Google Fonts (Space Grotesk + Inter)

---

## File Structure

```
next_consulting_dev_website/
├── public/
│   └── brand/
│       └── monogram.svg              # N> icon mark extracted from brand assets, recolored
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout: fonts, metadata, grain overlay
│   │   ├── page.tsx                  # Single page: assembles all sections
│   │   ├── globals.css               # Design tokens, grain texture, base styles
│   │   └── api/
│   │       └── inquiry/
│   │           └── route.ts          # POST handler for inquiry form
│   └── components/
│       ├── ScrollReveal.tsx          # Reusable scroll-triggered animation wrapper
│       ├── MonogramSection.tsx       # Section 1: full-viewport monogram
│       ├── QuoteSection.tsx          # Section 2: Drucker quote + H1 transition
│       ├── TruthsSection.tsx         # Section 3: three contrarian truths + counter metrics
│       └── InquirySection.tsx        # Section 4: inquiry form
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`

- [ ] **Step 1: Initialize Next.js project**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
```

Expected: Project scaffolded with `src/app/` structure, Tailwind CSS configured, `package.json` with Next.js 15+.

- [ ] **Step 2: Install additional dependencies**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm install framer-motion
```

- [ ] **Step 3: Verify dev server starts**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm run dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: HTTP 200

- [ ] **Step 4: Create brand asset directory and extract monogram SVG**

Create `public/brand/monogram.svg` -- extract only the N> icon mark from the full logo SVG. The icon consists of the "N" letterforms and the red chevron arrow. Recolor the entire mark to `currentColor` so it can be styled via CSS.

```bash
mkdir -p /Users/shawnbeekman/next_consulting_dev_website/public/brand
```

Write `public/brand/monogram.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="currentColor">
  <!-- N letterform -->
  <polygon points="35.8,0 35.8,24 42.5,31.9 35.8,25.5 10.3,0 10.2,0.1 10.2,0 0,0 0,35.7 10.2,35.7 10.2,16.3 4.7,8.7 10.2,14.4 31.5,35.7 39.4,35.7 46,35.7 46,0"/>
  <!-- X upper-right arm -->
  <polygon points="139,14.2 153.2,0 138.7,0 131.5,7.2"/>
  <!-- X lower-right arm -->
  <polygon points="138.3,19.5 131.1,26.8 140.1,35.7 148,35.7 154.5,35.7"/>
  <!-- X chevron (the > arrow) -->
  <polygon points="136,17.2 128.7,9.9 128.7,9.9 127.6,8.8 118.8,0 104.3,0 120.8,16.4 126.2,12.3 121.5,17.1 121.5,17.2 115.8,22.9 115.8,22.9 115.8,22.9 103,35.7 109.5,35.7 117.4,35.7 125.6,27.5 132,21.1 131.8,21.3"/>
  <!-- E letterform -->
  <polygon points="66.6,0 56.4,0 56.4,35.7 56.4,35.7 66.6,35.7 95.6,35.7 95.6,26.4 66.6,26.4 66.6,22.5 95.6,22.5 95.6,13.2 66.6,13.2 66.6,9.4 95.6,9.4 95.6,0 66.6,0"/>
</svg>
```

Note: The exact SVG paths will be refined by extracting from the source file `/Users/shawnbeekman/Desktop/NextConsulting_FINAL_FILES_Mar2026/Next_Consulting_RGB.svg`. The key elements are the N polygon, E polygon, and the three X polygons (two dark arms + one red chevron). Remove the "consulting" text element and the T polygon. Recalculate the viewBox to fit just NEXT without "consulting". Set all fills to `currentColor`.

- [ ] **Step 5: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind and Framer Motion"
```

---

### Task 2: Design Tokens and Global Styles

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write globals.css with design tokens and grain texture**

Replace the contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  /* Canvas */
  --color-canvas: #0A0A0C;
  --color-canvas-light: #141418;
  --color-canvas-elevated: #1A1A1F;

  /* Text */
  --color-text-primary: #B8BCC4;
  --color-text-muted: #6B6F78;
  --color-text-faint: #3A3D44;

  /* Accents */
  --color-amber: #C8943E;
  --color-amber-light: #D4A94F;
  --color-burnt-orange: #C45D2C;
  --color-deep-blue: #1E3A5F;

  /* Border */
  --color-border: #1F2028;

  /* Typography */
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-canvas);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Grain texture overlay */
.grain::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Selection */
::selection {
  background-color: color-mix(in srgb, var(--color-amber) 30%, transparent);
  color: white;
}
```

- [ ] **Step 2: Write layout.tsx with fonts and metadata**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Consulting",
  description: "Revenue architecture.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify styles load**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm run build 2>&1 | tail -5
```

Expected: Build succeeds without errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add design tokens, grain texture, and font configuration"
```

---

### Task 3: ScrollReveal Component

**Files:**
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Write the ScrollReveal component**

This is a reusable wrapper that fades children in when they enter the viewport, with optional upward drift and staggered delay.

Create `src/components/ScrollReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 1,
  y = 24,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add src/components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal animation component"
```

---

### Task 4: Monogram Section

**Files:**
- Create: `src/components/MonogramSection.tsx`

- [ ] **Step 1: Write the MonogramSection component**

Full viewport, monogram centered, fades in on load with upward drift. No scroll indicator -- just a subtle gradient at the bottom edge.

Create `src/components/MonogramSection.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export function MonogramSection() {
  return (
    <section className="relative flex h-dvh items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="text-amber"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/monogram.svg"
          alt=""
          className="h-20 w-auto sm:h-28 md:h-32"
          style={{ filter: "brightness(0) saturate(100%) invert(63%) sepia(30%) saturate(700%) hue-rotate(10deg) brightness(90%)" }}
        />
      </motion.div>

      {/* Bottom gradient hint -- subtle scroll affordance */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, rgba(20, 20, 24, 0.6), transparent)",
        }}
      />
    </section>
  );
}
```

Note: The `filter` approach for recoloring the SVG is a fallback. The preferred approach is to inline the SVG directly or use `currentColor` in the SVG file so the `text-amber` class applies directly. If the SVG uses `currentColor` for its fill (as specified in Task 1, Step 4), replace the `<img>` with an inline SVG component:

```tsx
// Preferred: inline SVG approach
<div className="text-amber h-20 w-auto sm:h-28 md:h-32">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202 36" fill="currentColor" className="h-full w-auto">
    {/* N */}
    <polygon points="35.8,0 35.8,24 42.5,31.9 35.8,25.5 10.3,0 10.2,0.1 10.2,0 0,0 0,35.7 10.2,35.7 10.2,16.3 4.7,8.7 10.2,14.4 31.5,35.7 39.4,35.7 46,35.7 46,0"/>
    {/* E */}
    <polygon points="66.6,0 56.4,0 56.4,35.7 56.4,35.7 66.6,35.7 95.6,35.7 95.6,26.4 66.6,26.4 66.6,22.5 95.6,22.5 95.6,13.2 66.6,13.2 66.6,9.4 95.6,9.4 95.6,0 66.6,0"/>
    {/* X upper-right */}
    <polygon points="139,14.2 153.2,0 138.7,0 131.5,7.2"/>
    {/* X lower-right */}
    <polygon points="138.3,19.5 131.1,26.8 140.1,35.7 148,35.7 154.5,35.7"/>
    {/* X chevron arrow */}
    <polygon points="136,17.2 128.7,9.9 128.7,9.9 127.6,8.8 118.8,0 104.3,0 120.8,16.4 126.2,12.3 121.5,17.1 121.5,17.2 115.8,22.9 115.8,22.9 115.8,22.9 103,35.7 109.5,35.7 117.4,35.7 125.6,27.5 132,21.1 131.8,21.3"/>
    {/* T */}
    <polygon points="202.2,0 159.5,0 159.5,10.2 175.8,10.2 175.8,35.7 186,35.7 186,10.2 202.2,10.2"/>
  </svg>
</div>
```

The implementer should extract the exact polygon coordinates from the source SVG at `/Users/shawnbeekman/Desktop/NextConsulting_FINAL_FILES_Mar2026/Next_Consulting_RGB.svg` (Layer_3 group), normalize them to start at origin (0,0), and calculate the correct viewBox. The source SVG has these elements offset at y=99.9. Subtract the minimum x and y from all coordinates to normalize.

- [ ] **Step 2: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add src/components/MonogramSection.tsx
git commit -m "feat: add monogram hero section"
```

---

### Task 5: Quote Section with H1 Transition

**Files:**
- Create: `src/components/QuoteSection.tsx`

- [ ] **Step 1: Write the QuoteSection component**

Full viewport with the Drucker quote centered, attribution below, then the H1 transition line with breathing room.

Create `src/components/QuoteSection.tsx`:

```tsx
"use client";

import { ScrollReveal } from "./ScrollReveal";

export function QuoteSection() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <ScrollReveal>
          <blockquote className="font-display text-2xl leading-relaxed tracking-tight text-text-primary sm:text-3xl md:text-4xl">
            &ldquo;There is surely nothing quite so useless as doing with great
            efficiency what should not be done at all
            <span className="text-amber">.</span>&rdquo;
          </blockquote>
          <cite className="mt-8 block text-sm tracking-wide text-text-muted not-italic">
            &mdash; Peter Drucker, 1963
          </cite>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <h1 className="mt-32 font-display text-xl font-medium tracking-tight text-text-primary sm:text-2xl md:text-3xl">
            The problem isn&apos;t scale
            <span className="text-amber">,</span> it&apos;s architecture
            <span className="text-amber">.</span>
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add src/components/QuoteSection.tsx
git commit -m "feat: add Drucker quote section with H1 transition"
```

---

### Task 6: Contrarian Truths Section

**Files:**
- Create: `src/components/TruthsSection.tsx`

- [ ] **Step 1: Write the TruthsSection component**

Three contrarian statements, each with a supporting counter metric beneath. Staggered reveal per block, with the metric appearing slightly after the statement.

Create `src/components/TruthsSection.tsx`:

```tsx
"use client";

import { ScrollReveal } from "./ScrollReveal";

const truths = [
  {
    statement: "Best in class is just the tallest person in a short room.",
    accentWord: "tallest",
    metric:
      "92% of companies benchmarking against industry averages are optimizing the wrong targets.",
  },
  {
    statement:
      "Your funnel isn\u2019t leaking. It was never built to hold.",
    accentWord: "never",
    metric:
      "For every dollar spent acquiring customers, 58 cents is spent compensating for process failures downstream.",
  },
  {
    statement:
      "The revenue you report isn\u2019t the revenue you\u2019re missing.",
    accentWord: "missing",
    metric:
      "Most organizations don\u2019t have a revenue problem. They have 30 process problems wearing a revenue mask.",
  },
] as const;

function highlightWord(text: string, word: string) {
  const index = text.toLowerCase().indexOf(word.toLowerCase());
  if (index === -1) return <>{text}</>;
  const before = text.slice(0, index);
  const match = text.slice(index, index + word.length);
  const after = text.slice(index + word.length);
  return (
    <>
      {before}
      <span className="text-amber">{match}</span>
      {after}
    </>
  );
}

export function TruthsSection() {
  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-32">
      <div className="w-full max-w-3xl space-y-24 sm:space-y-32">
        {truths.map((truth, i) => (
          <div key={i}>
            <ScrollReveal delay={i * 0.15}>
              <p className="font-display text-xl leading-relaxed tracking-tight text-text-primary sm:text-2xl md:text-3xl">
                {highlightWord(truth.statement, truth.accentWord)}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={i * 0.15 + 0.3}>
              <p className="mt-6 text-sm leading-relaxed text-text-muted sm:text-base">
                {truth.metric}
              </p>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add src/components/TruthsSection.tsx
git commit -m "feat: add contrarian truths section with counter metrics"
```

---

### Task 7: Inquiry Section

**Files:**
- Create: `src/components/InquirySection.tsx`
- Create: `src/app/api/inquiry/route.ts`

- [ ] **Step 1: Write the API route**

Minimal POST handler. For now, logs the submission and returns success. Can be wired to email or a database later.

Create `src/app/api/inquiry/route.ts`:

```ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, company, problem } = body;

  if (!name || !company || !problem) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // TODO: Wire to email service or database
  console.log("Inquiry received:", { name, company, problem });

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Write the InquirySection component**

Clean form with three fields, minimal styling, "Request a conversation" submit button.

Create `src/components/InquirySection.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function InquirySection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      problem: (form.elements.namedItem("problem") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <ScrollReveal>
          <p className="mb-16 text-center font-display text-xl tracking-tight text-text-primary sm:text-2xl">
            If this resonates
            <span className="text-amber">,</span> we should talk
            <span className="text-amber">.</span>
          </p>
        </ScrollReveal>

        {status === "sent" ? (
          <ScrollReveal>
            <p className="text-center text-text-muted">
              Received. We&apos;ll be in touch.
            </p>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.3}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder:text-text-faint focus:border-amber focus:outline-none transition-colors"
              />
              <input
                name="company"
                type="text"
                placeholder="Company"
                required
                className="w-full border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder:text-text-faint focus:border-amber focus:outline-none transition-colors"
              />
              <textarea
                name="problem"
                placeholder="What problem are you solving?"
                required
                rows={3}
                className="w-full resize-none border-b border-border bg-transparent px-0 py-3 text-text-primary placeholder:text-text-faint focus:border-amber focus:outline-none transition-colors"
              />
              <div className="pt-8 text-center">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="text-sm tracking-widest text-text-muted uppercase transition-colors hover:text-amber disabled:opacity-50"
                >
                  {status === "sending"
                    ? "Sending..."
                    : "Request a conversation"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-center text-sm text-burnt-orange">
                  Something went wrong. Try again.
                </p>
              )}
            </form>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add src/components/InquirySection.tsx src/app/api/inquiry/route.ts
git commit -m "feat: add inquiry form section with API route"
```

---

### Task 8: Assemble Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write the main page**

Wire all sections together in sequence.

Replace `src/app/page.tsx`:

```tsx
import { MonogramSection } from "@/components/MonogramSection";
import { QuoteSection } from "@/components/QuoteSection";
import { TruthsSection } from "@/components/TruthsSection";
import { InquirySection } from "@/components/InquirySection";

export default function Home() {
  return (
    <main>
      <MonogramSection />
      <QuoteSection />
      <TruthsSection />
      <InquirySection />
    </main>
  );
}
```

- [ ] **Step 2: Remove default Next.js boilerplate**

Delete the default favicon and any unused files that `create-next-app` generates (e.g., `public/vercel.svg`, `public/next.svg`, `src/app/page.module.css`).

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
rm -f public/vercel.svg public/next.svg public/file.svg public/globe.svg public/window.svg src/app/page.module.css
```

- [ ] **Step 3: Build and verify**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm run build 2>&1 | tail -10
```

Expected: Build succeeds. All routes compile.

- [ ] **Step 4: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add -A
git commit -m "feat: assemble page with all sections, remove boilerplate"
```

---

### Task 9: Monogram SVG Extraction and Refinement

**Files:**
- Modify: `public/brand/monogram.svg`
- Modify: `src/components/MonogramSection.tsx`

- [ ] **Step 1: Extract and normalize the NEXT wordmark from source SVG**

Open the source SVG at `/Users/shawnbeekman/Desktop/NextConsulting_FINAL_FILES_Mar2026/Next_Consulting_RGB.svg`. The visible layer is `Layer_3`. Extract these elements:

1. N polygon (class `st10`, points starting at `109.6,99.9`)
2. E polygon (class `st10`, points starting at `140.4,99.9`)
3. X upper-right polygon (class `st10`, points starting at `212.8,114.1`)
4. X lower-right polygon (class `st10`, points starting at `212.1,119.4`)
5. X chevron polygon (class `st14` / red, points starting at `209.8,117.1`)
6. T polygon (class `st10`, points starting at `276,99.9`)

Normalize all coordinates by subtracting the minimum x (73.8) and minimum y (99.9) from every point. Set the viewBox to `0 0 202.2 71.3` (the bounding box after normalization). Set all fills to `currentColor`.

Write the normalized SVG to `public/brand/monogram.svg`.

- [ ] **Step 2: Update MonogramSection to use inline SVG**

Replace the `<img>` tag with an inline SVG using the normalized paths and `currentColor` fill, styled with `text-amber` on the parent.

- [ ] **Step 3: Visual verification**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm run dev &
sleep 3
echo "Open http://localhost:3000 and verify: monogram renders in gold amber, centered on dark canvas, grain texture visible"
kill %1
```

- [ ] **Step 4: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add public/brand/monogram.svg src/components/MonogramSection.tsx
git commit -m "feat: extract and refine NEXT monogram SVG from brand assets"
```

---

### Task 10: Polish and Final Build Verification

**Files:**
- Modify: `src/app/layout.tsx` (add favicon)
- Potentially adjust: any component for visual tweaks

- [ ] **Step 1: Generate favicon from monogram**

Copy an appropriate favicon from the brand assets:

```bash
cp /Users/shawnbeekman/gonextautoretailconsulting.agency/src/app/favicon.ico /Users/shawnbeekman/next_consulting_dev_website/src/app/favicon.ico
```

- [ ] **Step 2: Full production build**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm run build
```

Expected: Build succeeds, no warnings, no errors.

- [ ] **Step 3: Run production server and verify**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm run start &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: HTTP 200

- [ ] **Step 4: Final commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add -A
git commit -m "feat: add favicon and finalize production build"
```

- [ ] **Step 5: Push to GitHub**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git push -u origin main
```
