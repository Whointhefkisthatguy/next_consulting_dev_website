# Next Consulting Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild nextconsulting.dev as a multi-page site with premium navigation, service pages, portfolio, case studies, and a cinematic depth system.

**Architecture:** Next.js 16 App Router with shared layout (header + footer), per-page routes, Tailwind CSS 4 for styling, CSS transitions + IntersectionObserver for animation, and Unsplash images served from /public. No GSAP, no Lenis, no framer-motion.

**Tech Stack:** Next.js 16.2.3, React 19, Tailwind CSS 4, TypeScript, Syne + DM Sans (Google Fonts via next/font)

**Spec:** `docs/superpowers/specs/2026-04-15-site-redesign-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              — Root layout: fonts, global header/footer, metadata
│   ├── page.tsx                — Homepage
│   ├── globals.css             — Design tokens, grain, reveal animations, global styles
│   ├── websites/
│   │   └── page.tsx            — Websites service page
│   ├── graphic-design/
│   │   └── page.tsx            — Graphic Design service page
│   ├── automation/
│   │   └── page.tsx            — Automation service page
│   ├── case-studies/
│   │   ├── page.tsx            — Case studies grid
│   │   └── [slug]/
│   │       └── page.tsx        — Individual case study
│   ├── work/
│   │   └── page.tsx            — Portfolio/Our Work page
│   ├── about/
│   │   └── page.tsx            — About page
│   └── contact/
│       └── page.tsx            — Contact page
├── components/
│   ├── Header.tsx              — Fixed nav with services dropdown, mobile menu
│   ├── Footer.tsx              — Minimal footer with monogram, nav, copyright
│   ├── Monogram.tsx            — N> SVG mark, reusable
│   ├── CTABlock.tsx            — Tri-level CTA (Book/Email/Request Info)
│   ├── ScrollReveal.tsx        — IntersectionObserver wrapper for reveal animations
│   ├── ServicePageLayout.tsx   — Shared template for all 3 service pages
│   ├── ParallaxImage.tsx       — Background image with parallax drift + treatments
│   └── CaseStudyCard.tsx       — Card component for case studies grid
public/
├── images/
│   ├── bg-leather.jpg          — Hero: grain of leather texture (ultrawide)
│   ├── bg-glass.jpg            — Light through glass (tall narrow)
│   ├── bg-metal.jpg            — Machined metal surface (square)
│   ├── bg-ink.jpg              — Ink on paper (ultrawide)
│   ├── bg-steel.jpg            — Condensation on steel (tall narrow)
│   └── bg-concrete.jpg         — Concrete texture (9:16)
│   (+ more as needed per page — 2-3 unique per page)
```

---

### Task 1: Clean Slate — Replace Design System

**Files:**
- Modify: `src/app/globals.css` (full rewrite)
- Modify: `src/app/layout.tsx` (full rewrite)
- Delete old components: `src/components/InquirySection.tsx`, `src/components/MonogramDissolve.tsx`, `src/components/MonogramSection.tsx`, `src/components/QuoteSection.tsx`, `src/components/TruthsSection.tsx`, `src/components/ServicesSection.tsx`, `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Rewrite globals.css with new design tokens and base styles**

Replace the entire file with:

```css
@import "tailwindcss";

/* ═══ DESIGN TOKENS ═══ */
:root {
  --void: #070708;
  --surface: #0f0f11;
  --cream: #f0ebe3;
  --muted: #6b6560;
  --copper: #c4835a;
  --copper-hover: #d4935a;
  --divider: rgba(240, 235, 227, 0.06);
}

/* ═══ BASE ═══ */
html {
  font-size: 16px;
  scroll-behavior: smooth;
  background: var(--void);
}

body {
  color: var(--cream);
  background: var(--void);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ═══ FILM GRAIN ═══ */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 128px;
}

::selection {
  background-color: rgba(196, 131, 90, 0.25);
  color: var(--cream);
}

/* ═══ SCROLL REVEAL ═══ */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-stagger > .reveal:nth-child(1) { transition-delay: 0s; }
.reveal-stagger > .reveal:nth-child(2) { transition-delay: 0.1s; }
.reveal-stagger > .reveal:nth-child(3) { transition-delay: 0.15s; }
.reveal-stagger > .reveal:nth-child(4) { transition-delay: 0.2s; }
.reveal-stagger > .reveal:nth-child(5) { transition-delay: 0.25s; }
.reveal-stagger > .reveal:nth-child(6) { transition-delay: 0.3s; }

/* ═══ ANIMATIONS ═══ */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes scroll-pulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); transform-origin: top; }
  50% { opacity: 1; transform: scaleY(1); }
}
```

- [ ] **Step 2: Rewrite layout.tsx with new fonts and structure**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next Consulting",
  description: "Revenue architecture & design.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-[var(--font-body)]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Delete old components**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
rm src/components/InquirySection.tsx src/components/MonogramDissolve.tsx src/components/MonogramSection.tsx src/components/QuoteSection.tsx src/components/TruthsSection.tsx src/components/ServicesSection.tsx src/components/ScrollReveal.tsx
```

- [ ] **Step 4: Remove unused dependencies**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
npm uninstall gsap @gsap/react lenis framer-motion
```

- [ ] **Step 5: Commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add -A
git commit -m "chore: clean slate — new design system, fonts, remove old components and deps"
```

---

### Task 2: Monogram Component

**Files:**
- Create: `src/components/Monogram.tsx`

- [ ] **Step 1: Create the Monogram component**

```tsx
export default function Monogram({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 215.1 94.2"
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Next Consulting"
    >
      <polygon points="94.5,0 94.5,63.4 112.2,84.1 94.5,67.2 27.2,0 27,0.2 27,0 0,0 0,94.2 27,94.2 27,43 12.5,23 27,38 83.3,94.2 104.1,94.2 121.4,94.2 121.4,0" />
      <polyline points="193.1,23.3 169.8,0 131.6,0 176.9,45.3 128,94.2 145.3,94.2 166.2,94.2 187.8,72.6 204.5,55.7 204.1,56.3 215.1,45.3 196,26.2 196,26.2" />
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Monogram.tsx
git commit -m "feat: add reusable Monogram SVG component"
```

---

### Task 3: ScrollReveal Component

**Files:**
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Create the ScrollReveal wrapper**

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({
  children,
  className = "",
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? el.querySelectorAll(".reveal")
      : [el];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [stagger]);

  const baseClass = stagger ? "reveal-stagger" : "reveal";

  return (
    <div ref={ref} className={`${baseClass} ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal component with IntersectionObserver"
```

---

### Task 4: ParallaxImage Component

**Files:**
- Create: `src/components/ParallaxImage.tsx`

- [ ] **Step 1: Create the ParallaxImage component**

This renders a hyper-cropped background image with desaturation, opacity, and subtle parallax drift.

```tsx
"use client";

import { useEffect, useRef } from "react";

type AspectRatio = "ultrawide" | "tall" | "square";

const aspectClasses: Record<AspectRatio, string> = {
  ultrawide: "w-[60vw] max-w-[900px] h-[25vw] max-h-[350px]",
  tall: "w-[20vw] max-w-[300px] h-[50vw] max-h-[600px]",
  square: "w-[30vw] max-w-[400px] h-[30vw] max-h-[400px]",
};

export default function ParallaxImage({
  src,
  aspect = "ultrawide",
  className = "",
  opacity = 0.2,
}: {
  src: string;
  aspect?: AspectRatio;
  className?: string;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const viewH = window.innerHeight;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const offset = (progress - 0.5) * 40; // 5-10% drift
        el.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute pointer-events-none overflow-hidden ${aspectClasses[aspect]} ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover grayscale-[65%]"
        loading="lazy"
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ParallaxImage.tsx
git commit -m "feat: add ParallaxImage with desaturation and parallax drift"
```

---

### Task 5: CTABlock Component

**Files:**
- Create: `src/components/CTABlock.tsx`

- [ ] **Step 1: Create the tri-level CTA block**

```tsx
import ScrollReveal from "./ScrollReveal";

export default function CTABlock() {
  return (
    <section className="py-32 px-6 sm:px-14 border-t border-[var(--divider)] flex items-center justify-center text-center">
      <ScrollReveal stagger>
        <h2 className="reveal font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] text-[var(--cream)] mb-4">
          Ready to talk?
        </h2>
        <p className="reveal font-[var(--font-body)] text-sm text-[var(--muted)] mb-12 max-w-md mx-auto">
          45 minutes. No pitch. A diagnostic or your time back.
        </p>

        <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Primary */}
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[var(--copper-hover)]"
          >
            Book a Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Secondary */}
          <a
            href="mailto:revops@nextconsulting.dev"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[var(--copper)] text-[var(--copper)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[var(--copper)] hover:text-[var(--void)]"
          >
            Email Us
          </a>

          {/* Tertiary */}
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--copper)] font-[var(--font-body)] text-sm transition-colors duration-300 hover:text-[var(--copper-hover)]"
          >
            Request Information
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <p className="reveal font-[var(--font-body)] italic text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
          The question was never whether something needs to change.
          It&rsquo;s whether you&rsquo;ll be the one who changes it.
        </p>
      </ScrollReveal>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CTABlock.tsx
git commit -m "feat: add tri-level CTABlock component"
```

---

### Task 6: Header Component

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Create the Header with nav, dropdown, mobile menu**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Monogram from "./Monogram";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Websites", href: "/websites" },
      { label: "Graphic Design", href: "/graphic-design" },
      { label: "Automation", href: "/automation" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isServiceActive = () =>
    ["/websites", "/graphic-design", "/automation"].some((p) =>
      pathname.startsWith(p)
    );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--void)]/95 backdrop-blur-sm border-b border-[var(--divider)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-[72px] flex items-center justify-between">
        {/* Monogram */}
        <Link href="/" aria-label="Home">
          <Monogram className="h-7 w-auto text-[var(--cream)] transition-colors duration-300 hover:text-[var(--copper)]" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`font-[var(--font-display)] text-[13px] font-500 tracking-[0.05em] uppercase transition-colors duration-300 ${
                    isServiceActive()
                      ? "text-[var(--copper)]"
                      : "text-[var(--cream)] hover:text-[var(--copper)]"
                  }`}
                >
                  {link.label}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`inline-block ml-1.5 transition-transform duration-300 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 py-3 px-1 bg-[var(--surface)] border border-[var(--divider)] min-w-[180px] transition-all duration-300 ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`block px-5 py-2.5 font-[var(--font-body)] text-sm transition-colors duration-300 ${
                        isActive(child.href)
                          ? "text-[var(--copper)]"
                          : "text-[var(--cream)] hover:text-[var(--copper)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-[var(--font-display)] text-[13px] font-500 tracking-[0.05em] uppercase transition-colors duration-300 ${
                  isActive(link.href)
                    ? "text-[var(--copper)]"
                    : "text-[var(--cream)] hover:text-[var(--copper)]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--copper)]" />
                )}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#book"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-[11px] font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[var(--copper-hover)]"
        >
          Book a Call
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-[var(--cream)] transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-[var(--cream)] transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-[var(--void)] transition-all duration-500 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.label} className="flex flex-col items-center gap-4">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="font-[var(--font-display)] text-2xl font-600 tracking-[0.05em] uppercase text-[var(--cream)]"
                >
                  {link.label}
                </button>
                {servicesOpen &&
                  link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`font-[var(--font-body)] text-lg pl-4 ${
                        isActive(child.href)
                          ? "text-[var(--copper)]"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`font-[var(--font-display)] text-2xl font-600 tracking-[0.05em] uppercase ${
                  isActive(link.href)
                    ? "text-[var(--copper)]"
                    : "text-[var(--cream)]"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="#book"
            className="mt-4 px-8 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify the header renders**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website && npm run build
```

Expected: Build succeeds (page.tsx may have broken imports — that's fine, we'll fix in the next task).

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header with nav, services dropdown, mobile menu"
```

---

### Task 7: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create the Footer**

```tsx
import Link from "next/link";
import Monogram from "./Monogram";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "Websites", href: "/websites" },
  { label: "Graphic Design", href: "/graphic-design" },
  { label: "Automation", href: "/automation" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--divider)] py-12 px-6 sm:px-14">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        <Monogram className="h-6 w-auto text-[var(--muted)]" />

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-[var(--font-body)] text-xs text-[var(--muted)] transition-colors duration-300 hover:text-[var(--cream)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="font-[var(--font-body)] text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} Next Consulting
        </span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add minimal Footer with monogram, nav, copyright"
```

---

### Task 8: Homepage

**Files:**
- Modify: `src/app/page.tsx` (full rewrite)

- [ ] **Step 1: Download Unsplash images for homepage**

Download 2-3 hyper-cropped images. Use direct Unsplash URLs (these are free to use):

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
mkdir -p public/images
curl -L "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80" -o public/images/bg-leather.jpg
curl -L "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600&q=80" -o public/images/bg-glass.jpg
curl -L "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200&q=80" -o public/images/bg-metal.jpg
```

- [ ] **Step 2: Rewrite the homepage**

Replace `src/app/page.tsx` entirely:

```tsx
"use client";

import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import CTABlock from "@/components/CTABlock";
import Monogram from "@/components/Monogram";
import Link from "next/link";

const SERVICES = [
  {
    name: "Websites",
    href: "/websites",
    description:
      "Revenue-generating systems engineered for conversion, built to last.",
  },
  {
    name: "Graphic Design",
    href: "/graphic-design",
    description:
      "Brand identity that communicates authority before a word is read.",
  },
  {
    name: "Automation",
    href: "/automation",
    description:
      "Intelligent automation that removes the manual and scales the system.",
  },
];

const PROOF_POINTS = [
  "We audit before we build. Every engagement starts with a diagnostic.",
  "We frame every deliverable through client experience and revenue impact.",
  "We don\u2019t fill portfolios. We move needles.",
];

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative h-dvh min-h-[700px] flex flex-col justify-center items-center overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(196,131,90,0.04) 0%, transparent 70%)",
          }}
        />

        {/* BG image — ultrawide, bottom-right */}
        <ParallaxImage
          src="/images/bg-leather.jpg"
          aspect="ultrawide"
          className="bottom-[10%] right-[-5%]"
          opacity={0.18}
        />

        {/* Content */}
        <div
          className="relative z-10 text-center"
          style={{
            opacity: 0,
            animation:
              "scale-in 1.5s 0.3s cubic-bezier(0.25,0.1,0.25,1) forwards",
          }}
        >
          <Monogram className="h-24 sm:h-32 md:h-36 w-auto text-[var(--cream)] mx-auto" />
          <p className="mt-8 font-[var(--font-display)] text-sm sm:text-base font-500 tracking-[0.2em] uppercase text-[var(--cream)]">
            Revenue Architecture &amp; Design
          </p>
          <p className="mt-4 font-[var(--font-body)] italic text-sm text-[var(--muted)] max-w-md mx-auto">
            &ldquo;There is surely nothing quite so useless as doing with great
            efficiency what should not be done at all.&rdquo;
            <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
              &mdash; Peter Drucker
            </span>
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            opacity: 0,
            animation:
              "fade-up 1.2s 1.2s cubic-bezier(0.25,0.1,0.25,1) forwards",
          }}
        >
          <span
            className="text-[0.55rem] tracking-[0.25em] uppercase text-[var(--muted)]"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div
            className="w-px h-10 bg-gradient-to-b from-[var(--copper)] to-transparent"
            style={{ animation: "scroll-pulse 2s ease-in-out infinite" }}
          />
        </div>
      </section>

      {/* ═══ SERVICES OVERVIEW ═══ */}
      <section className="relative py-32 px-6 sm:px-14 border-t border-[var(--divider)]">
        <ParallaxImage
          src="/images/bg-glass.jpg"
          aspect="tall"
          className="top-[10%] right-[15%] hidden md:block"
          opacity={0.15}
        />

        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.name}>
                <div className="reveal">
                  <span className="font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.15em] uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-[var(--font-display)] text-2xl font-700 text-[var(--cream)]">
                    {service.name}
                  </h3>
                  <p className="mt-4 font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 mt-6 text-[var(--copper)] font-[var(--font-body)] text-sm transition-colors duration-300 hover:text-[var(--copper-hover)]"
                  >
                    Learn more
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUE PROPOSITION ═══ */}
      <section className="relative py-32 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[900px] mx-auto text-center">
          <ScrollReveal>
            <h2 className="reveal font-[var(--font-display)] font-700 text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-[var(--cream)]">
              The problem isn&rsquo;t scale,
              <br />
              it&rsquo;s <em className="italic text-[var(--copper)]">architecture</em>.
            </h2>
          </ScrollReveal>

          <div className="mt-16 space-y-8 max-w-[600px] mx-auto">
            {PROOF_POINTS.map((point, i) => (
              <ScrollReveal key={i}>
                <div className="reveal flex items-start gap-4 text-left">
                  <span className="shrink-0 font-[var(--font-display)] text-sm font-700 text-[var(--copper)]">
                    0{i + 1}
                  </span>
                  <p className="font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                    {point}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <CTABlock />
    </>
  );
}
```

- [ ] **Step 3: Build and verify**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website && npm run build
```

Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx public/images/
git commit -m "feat: implement homepage — hero, services overview, value prop, CTA"
```

---

### Task 9: ServicePageLayout Component

**Files:**
- Create: `src/components/ServicePageLayout.tsx`

- [ ] **Step 1: Create the shared service page template**

```tsx
"use client";

import ScrollReveal from "./ScrollReveal";
import ParallaxImage from "./ParallaxImage";
import CTABlock from "./CTABlock";

type Deliverable = {
  name: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

type ServicePageProps = {
  title: string;
  quote: string;
  quoteAuthor: string;
  heroImage: string;
  bodyImage: string;
  intro: string[];
  deliverables: Deliverable[];
  process?: ProcessStep[];
};

export default function ServicePageLayout({
  title,
  quote,
  quoteAuthor,
  heroImage,
  bodyImage,
  intro,
  deliverables,
  process,
}: ServicePageProps) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-40 pb-24 px-6 sm:px-14 overflow-hidden">
        <ParallaxImage
          src={heroImage}
          aspect="ultrawide"
          className="top-[15%] right-[-10%]"
          opacity={0.2}
        />

        <div className="relative z-10 max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              {title}
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;{quote}&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; {quoteAuthor}
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="relative py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <ParallaxImage
          src={bodyImage}
          aspect="tall"
          className="top-[5%] right-[8%] hidden md:block"
          opacity={0.12}
        />

        <div className="max-w-[680px]">
          {intro.map((paragraph, i) => (
            <ScrollReveal key={i}>
              <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] mb-8">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ DELIVERABLES ═══ */}
      <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[700px]">
          <ScrollReveal>
            <h2 className="reveal font-[var(--font-display)] font-700 text-2xl text-[var(--cream)] mb-16">
              Deliverables
            </h2>
          </ScrollReveal>

          <div className="space-y-12">
            {deliverables.map((d, i) => (
              <ScrollReveal key={i}>
                <div className="reveal flex items-start gap-6">
                  <span className="shrink-0 font-[var(--font-display)] text-sm font-700 text-[var(--copper)] mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-[var(--font-display)] text-lg font-600 text-[var(--cream)]">
                      {d.name}
                    </h3>
                    <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                      {d.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS (optional) ═══ */}
      {process && process.length > 0 && (
        <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
          <div className="max-w-[1000px] mx-auto">
            <ScrollReveal>
              <h2 className="reveal font-[var(--font-display)] font-700 text-2xl text-[var(--cream)] mb-16">
                Process
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {process.map((step, i) => (
                <ScrollReveal key={i}>
                  <div className="reveal relative">
                    <span className="font-[var(--font-display)] text-sm font-700 text-[var(--copper)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-[var(--font-display)] text-base font-600 text-[var(--cream)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--muted)] leading-relaxed">
                      {step.description}
                    </p>
                    {/* Connector line (desktop only, not on last) */}
                    {i < process.length - 1 && (
                      <div className="hidden md:block absolute top-3 left-full w-full h-px bg-[var(--divider)]" />
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <CTABlock />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ServicePageLayout.tsx
git commit -m "feat: add ServicePageLayout template for service pages"
```

---

### Task 10: Service Pages (Websites, Graphic Design, Automation)

**Files:**
- Create: `src/app/websites/page.tsx`
- Create: `src/app/graphic-design/page.tsx`
- Create: `src/app/automation/page.tsx`

- [ ] **Step 1: Download additional images for service pages**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
curl -L "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80" -o public/images/bg-code.jpg
curl -L "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80" -o public/images/bg-ink.jpg
curl -L "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80" -o public/images/bg-workspace.jpg
curl -L "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80" -o public/images/bg-circuit.jpg
curl -L "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200&q=80" -o public/images/bg-paper.jpg
curl -L "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80" -o public/images/bg-steel.jpg
```

- [ ] **Step 2: Create Websites page**

```tsx
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = { title: "Websites — Next Consulting" };

export default function WebsitesPage() {
  return (
    <ServicePageLayout
      title="Websites"
      quote="The details are not the details. They make the design."
      quoteAuthor="Charles Eames"
      heroImage="/images/bg-code.jpg"
      bodyImage="/images/bg-ink.jpg"
      intro={[
        "Your website is not a brochure. It\u2019s the first system your customer interacts with \u2014 and the one that sets every expectation that follows. We design and build full-stack web experiences that treat your website as what it actually is: a revenue instrument.",
        "Every decision we make is framed through client experience and operational impact. Not what looks good in a portfolio \u2014 what converts, retains, and compounds over time.",
        "From custom UI/UX to backend architecture, authentication, payments, and third-party integrations \u2014 we build the whole thing and we build it to last.",
      ]}
      deliverables={[
        { name: "Custom UI/UX Design", description: "Wireframing through high-fidelity design, informed by your customer\u2019s actual journey." },
        { name: "Full-Stack Development", description: "Frontend, backend, database, deployment \u2014 one team, one standard." },
        { name: "Backend Integration", description: "Authentication, payments, CRM hooks, and third-party APIs wired in from day one." },
        { name: "SEO & Performance", description: "Structured for search engines and optimized for speed. Not afterthoughts \u2014 foundations." },
        { name: "Ongoing Support", description: "Iteration, monitoring, and optimization after launch. We don\u2019t disappear." },
      ]}
      process={[
        { title: "Discovery", description: "We audit your current experience, map your customer journey, and define what success looks like." },
        { title: "Architecture", description: "Information architecture, technical stack decisions, and wireframes before a pixel is placed." },
        { title: "Build", description: "Design and development in parallel, with review checkpoints at every milestone." },
        { title: "Launch & Iterate", description: "Deployment, monitoring, and continuous improvement based on real data." },
      ]}
    />
  );
}
```

- [ ] **Step 3: Create Graphic Design page**

```tsx
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = { title: "Graphic Design — Next Consulting" };

export default function GraphicDesignPage() {
  return (
    <ServicePageLayout
      title="Graphic Design"
      quote="Design is not just what it looks like and feels like. Design is how it works."
      quoteAuthor="Steve Jobs"
      heroImage="/images/bg-paper.jpg"
      bodyImage="/images/bg-workspace.jpg"
      intro={[
        "Your brand is a system of signals. Every mark, every color, every piece of collateral tells your customer who they\u2019re dealing with \u2014 before you ever get to make your case.",
        "We build visual identity systems from the ground up for companies that understand the difference between looking professional and communicating authority. If your brand has outgrown its look, we fix that.",
        "Every asset we create is designed to work together as a system \u2014 not a collection of one-offs that slowly drift apart.",
      ]}
      deliverables={[
        { name: "Logo & Brand Mark", description: "A mark that works at every scale, on every surface, in every context." },
        { name: "Brand Identity System", description: "Colors, typography, spacing, usage rules \u2014 a complete style guide your team can follow." },
        { name: "Marketing Collateral", description: "Print-ready assets, brochures, business cards, and sales materials that match the standard." },
        { name: "Social Media Templates", description: "Branded templates your team can use without breaking the system." },
        { name: "Presentation Design", description: "Pitch decks and internal presentations that communicate the same authority as everything else." },
      ]}
    />
  );
}
```

- [ ] **Step 4: Create Automation page**

```tsx
import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = { title: "Automation — Next Consulting" };

export default function AutomationPage() {
  return (
    <ServicePageLayout
      title="Automation"
      quote="The first rule of any technology used in a business is that automation applied to an efficient operation will magnify the efficiency."
      quoteAuthor="Bill Gates"
      heroImage="/images/bg-circuit.jpg"
      bodyImage="/images/bg-steel.jpg"
      intro={[
        "Your team is doing work a machine should be doing. Every manual handoff, every copy-paste, every \u201Ccan you send me that report\u201D is friction that compounds against you. We find it and we remove it.",
        "We map your workflows, identify where time and accuracy are being lost, and deploy intelligent automation that scales with your business \u2014 not against it.",
        "This is not about replacing people. It\u2019s about freeing them to do the work that actually requires a human \u2014 and letting systems handle everything else.",
      ]}
      deliverables={[
        { name: "Workflow Audit", description: "We map your current processes end-to-end and identify every point of friction." },
        { name: "AI-Powered Automation", description: "Intelligent process automation designed to compound efficiency over time." },
        { name: "CRM & Data Integration", description: "Connect your systems so data flows where it needs to without human intervention." },
        { name: "Custom Internal Tooling", description: "Dashboards and tools built for your specific operational needs." },
        { name: "Accountability Systems", description: "Automated notifications, escalations, and reporting that keep your team honest." },
        { name: "Ongoing Optimization", description: "We monitor, measure, and continuously improve what we\u2019ve built." },
      ]}
      process={[
        { title: "Audit", description: "Map every workflow, identify friction points, and quantify the cost of manual processes." },
        { title: "Design", description: "Architect the automation strategy \u2014 what to automate, what to integrate, what to build." },
        { title: "Deploy", description: "Build and deploy automations with testing at every step." },
        { title: "Monitor", description: "Ongoing measurement and optimization to ensure the system compounds." },
      ]}
    />
  );
}
```

- [ ] **Step 5: Build and verify**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website && npm run build
```

Expected: Build succeeds with all 4 routes (/, /websites, /graphic-design, /automation).

- [ ] **Step 6: Commit**

```bash
git add src/app/websites/ src/app/graphic-design/ src/app/automation/ public/images/
git commit -m "feat: add Websites, Graphic Design, and Automation service pages"
```

---

### Task 11: Case Studies Page

**Files:**
- Create: `src/components/CaseStudyCard.tsx`
- Create: `src/app/case-studies/page.tsx`
- Create: `src/app/case-studies/[slug]/page.tsx`

- [ ] **Step 1: Create CaseStudyCard component**

```tsx
import Link from "next/link";

type CaseStudyCardProps = {
  slug: string;
  title: string;
  service: string;
  result: string;
  image: string;
};

export default function CaseStudyCard({
  slug,
  title,
  service,
  result,
  image,
}: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group block bg-[var(--surface)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(196,131,90,0.08)]"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6 border-t-2 border-transparent transition-colors duration-300 group-hover:border-[var(--copper)]">
        <span className="font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.1em] uppercase">
          {service}
        </span>
        <h3 className="mt-2 font-[var(--font-display)] text-lg font-600 text-[var(--cream)]">
          {title}
        </h3>
        <p className="mt-2 font-[var(--font-body)] text-sm text-[var(--muted)]">
          {result}
        </p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create Case Studies grid page**

```tsx
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/CaseStudyCard";

export const metadata = { title: "Case Studies — Next Consulting" };

// Placeholder data — replace with real case studies
const CASE_STUDIES = [
  {
    slug: "example-project",
    title: "Example Project",
    service: "Websites",
    result: "Case study details coming soon.",
    image: "/images/bg-metal.jpg",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              Case Studies
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;In God we trust. All others must bring data.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; W. Edwards Deming
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <ScrollReveal key={study.slug}>
              <div className="reveal">
                <CaseStudyCard {...study} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Create individual case study page**

```tsx
import ScrollReveal from "@/components/ScrollReveal";
import CTABlock from "@/components/CTABlock";
import Link from "next/link";

// Placeholder — will be replaced with real data/CMS later
const CASE_STUDIES: Record<
  string,
  {
    title: string;
    service: string;
    timeline: string;
    image: string;
    challenge: string;
    approach: string;
    outcome: string;
    metrics?: { label: string; value: string }[];
  }
> = {
  "example-project": {
    title: "Example Project",
    service: "Websites",
    timeline: "Q1 2026",
    image: "/images/bg-metal.jpg",
    challenge: "Case study content coming soon.",
    approach: "Case study content coming soon.",
    outcome: "Case study content coming soon.",
  },
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) {
    return (
      <section className="pt-40 pb-24 px-6 sm:px-14 text-center">
        <h1 className="font-[var(--font-display)] font-700 text-3xl text-[var(--cream)]">
          Case study not found
        </h1>
        <Link
          href="/case-studies"
          className="mt-6 inline-block text-[var(--copper)] font-[var(--font-body)] text-sm"
        >
          &larr; Back to Case Studies
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <ScrollReveal>
            <div className="reveal">
              <Link
                href="/case-studies"
                className="font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.1em] uppercase mb-6 inline-block"
              >
                &larr; Case Studies
              </Link>
              <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-[var(--cream)]">
                {study.title}
              </h1>
              <div className="mt-4 flex gap-4 text-xs text-[var(--muted)] font-[var(--font-body)] tracking-[0.1em] uppercase">
                <span>{study.service}</span>
                <span>&middot;</span>
                <span>{study.timeline}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Image */}
      <section className="px-6 sm:px-14 pb-16">
        <div className="max-w-[1200px] mx-auto h-[40vh] min-h-[300px] overflow-hidden">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover grayscale-[30%]"
          />
        </div>
      </section>

      {/* Narrative */}
      <section className="py-16 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[680px] space-y-16">
          {[
            { label: "Challenge", text: study.challenge },
            { label: "Approach", text: study.approach },
            { label: "Outcome", text: study.outcome },
          ].map((section) => (
            <ScrollReveal key={section.label}>
              <div className="reveal">
                <h2 className="font-[var(--font-display)] font-600 text-lg text-[var(--copper)] mb-4">
                  {section.label}
                </h2>
                <p className="font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8]">
                  {section.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Metrics */}
      {study.metrics && study.metrics.length > 0 && (
        <section className="py-16 px-6 sm:px-14 border-t border-[var(--divider)]">
          <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {study.metrics.map((m) => (
              <ScrollReveal key={m.label}>
                <div className="reveal text-center">
                  <p className="font-[var(--font-display)] font-700 text-3xl text-[var(--copper)]">
                    {m.value}
                  </p>
                  <p className="mt-2 font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase">
                    {m.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      <CTABlock />
    </>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/CaseStudyCard.tsx src/app/case-studies/
git commit -m "feat: add Case Studies page with grid and individual study routes"
```

---

### Task 12: Our Work (Portfolio) Page

**Files:**
- Create: `src/app/work/page.tsx`

- [ ] **Step 1: Create the portfolio page**

```tsx
"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const FILTERS = ["All", "Websites", "Graphic Design", "Automation"] as const;

// Placeholder data — replace with real projects
const PROJECTS = [
  {
    title: "Example Website",
    service: "Websites" as const,
    image: "/images/bg-code.jpg",
  },
  {
    title: "Example Brand",
    service: "Graphic Design" as const,
    image: "/images/bg-paper.jpg",
  },
  {
    title: "Example Automation",
    service: "Automation" as const,
    image: "/images/bg-circuit.jpg",
  },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.service === filter);

  return (
    <>
      <section className="pt-40 pb-16 px-6 sm:px-14">
        <div className="max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              Our Work
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;Quality is not an act, it is a habit.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; Aristotle
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-8 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[1200px] mx-auto">
          {/* Filters */}
          <div className="flex gap-6 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative font-[var(--font-body)] text-sm transition-colors duration-300 pb-1 ${
                  filter === f
                    ? "text-[var(--copper)]"
                    : "text-[var(--muted)] hover:text-[var(--cream)]"
                }`}
              >
                {f}
                {filter === f && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--copper)]" />
                )}
              </button>
            ))}
          </div>

          {/* Grid — varied aspect ratios via row-span */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <ScrollReveal key={`${project.title}-${i}`}>
                <div
                  className={`reveal group relative overflow-hidden cursor-pointer ${
                    i % 3 === 0 ? "sm:row-span-2 h-[500px]" : "h-[240px]"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[var(--void)]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="font-[var(--font-display)] text-lg font-600 text-[var(--cream)]">
                      {project.title}
                    </h3>
                    <span className="mt-2 font-[var(--font-body)] text-xs text-[var(--copper)] tracking-[0.1em] uppercase">
                      {project.service}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/work/
git commit -m "feat: add Our Work portfolio page with filter and masonry grid"
```

---

### Task 13: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Download about page image**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
curl -L "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80" -o public/images/bg-team.jpg
```

- [ ] **Step 2: Create About page**

```tsx
import ScrollReveal from "@/components/ScrollReveal";
import ParallaxImage from "@/components/ParallaxImage";
import CTABlock from "@/components/CTABlock";

export const metadata = { title: "About — Next Consulting" };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 sm:px-14 overflow-hidden">
        <ParallaxImage
          src="/images/bg-team.jpg"
          aspect="ultrawide"
          className="top-[10%] right-[-10%]"
          opacity={0.15}
        />

        <div className="relative z-10 max-w-[900px]">
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              About
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-lg">
              &ldquo;The best way to predict the future is to create it.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; Peter Drucker
              </span>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 sm:px-14 border-t border-[var(--divider)]">
        <div className="max-w-[680px]">
          <ScrollReveal>
            <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] mb-8">
              Next Consulting exists because we got tired of watching businesses invest in growth while ignoring the systems that growth depends on. Revenue without architecture is just funded chaos.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] mb-8">
              We work at the intersection of design, technology, and operations. Every engagement starts with a diagnostic &mdash; not a pitch. We audit before we build, we frame every deliverable through client experience and revenue impact, and we don&rsquo;t disappear after launch.
            </p>
          </ScrollReveal>

          {/* Pull quote */}
          <ScrollReveal>
            <blockquote className="reveal my-16 pl-6 border-l-2 border-[var(--copper)]">
              <p className="font-[var(--font-display)] italic text-xl text-[var(--cream)] leading-relaxed">
                We don&rsquo;t fill portfolios. We move needles.
              </p>
            </blockquote>
          </ScrollReveal>

          <ScrollReveal>
            <p className="reveal font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8]">
              Whether it&rsquo;s a website that converts, a brand that communicates authority, or automation that removes the manual from your operation &mdash; we build systems that compound. Not campaigns that expire.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTABlock />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/about/ public/images/bg-team.jpg
git commit -m "feat: add About page with story and pull quote"
```

---

### Task 14: Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create Contact page**

```tsx
"use client";

import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  return (
    <section className="pt-40 pb-32 px-6 sm:px-14">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left — copy */}
        <div>
          <ScrollReveal>
            <h1 className="reveal font-[var(--font-display)] font-800 text-[clamp(3rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
              Contact
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-6 font-[var(--font-body)] italic text-base text-[var(--muted)] max-w-md">
              &ldquo;The single biggest problem in communication is the illusion that it has taken place.&rdquo;
              <span className="block mt-2 not-italic text-xs tracking-[0.15em] uppercase">
                &mdash; George Bernard Shaw
              </span>
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p className="reveal mt-10 font-[var(--font-body)] text-[15px] text-[var(--cream)] opacity-80 leading-[1.8] max-w-md">
              45 minutes. No pitch. A diagnostic or your time back. If you&rsquo;re ready to talk about what&rsquo;s actually going on in your business, we&rsquo;re ready to listen.
            </p>
          </ScrollReveal>

          {/* Direct links */}
          <ScrollReveal>
            <div className="reveal mt-12 space-y-4">
              <a
                href="mailto:revops@nextconsulting.dev"
                className="block font-[var(--font-body)] text-sm text-[var(--copper)] transition-colors duration-300 hover:text-[var(--copper-hover)]"
              >
                revops@nextconsulting.dev
              </a>
              <a
                href="#book"
                className="block font-[var(--font-body)] text-sm text-[var(--copper)] transition-colors duration-300 hover:text-[var(--copper-hover)]"
              >
                Book a call &rarr;
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right — form */}
        <div>
          <ScrollReveal>
            <form
              className="reveal space-y-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)]"
                />
              </div>
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)]"
                />
              </div>
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)]"
                />
              </div>
              <div>
                <label className="block font-[var(--font-body)] text-xs text-[var(--muted)] tracking-[0.1em] uppercase mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full bg-transparent border-b border-[var(--divider)] py-3 font-[var(--font-body)] text-sm text-[var(--cream)] outline-none transition-colors duration-300 focus:border-[var(--copper)] resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--copper)] text-[var(--void)] font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:bg-[var(--copper-hover)]"
              >
                Send Message
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/
git commit -m "feat: add Contact page with form and direct links"
```

---

### Task 15: Final Build, Verify All Routes, Commit

**Files:**
- No new files — verification only

- [ ] **Step 1: Run production build**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website && npm run build
```

Expected: Build succeeds with routes: /, /websites, /graphic-design, /automation, /case-studies, /case-studies/[slug], /work, /about, /contact

- [ ] **Step 2: Run dev server and spot-check**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website && npm run dev
```

Open http://localhost:3000 and verify:
- Header renders with monogram, nav, dropdown, CTA
- Homepage: hero with monogram, services grid, value prop, CTA block
- Navigation works between all pages
- Mobile hamburger menu works
- Footer appears on every page
- Background images render with desaturation and parallax

- [ ] **Step 3: Final commit if any fixes were needed**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website
git add -A
git commit -m "fix: final adjustments from visual verification"
```
