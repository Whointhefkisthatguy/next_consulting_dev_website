# SB7 & UX Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the homepage through the StoryBrand SB7 framework and fix UX issues across all pages — making the customer the hero, adding a clear plan, painting success/failure, fixing layout bugs, and improving visual contrast and form visibility.

**Architecture:** Homepage gets a full content rewrite following SB7 (character → problem → guide → plan → CTA → success → failure). Inner pages get targeted fixes: service hero brightness, About layout bug, Contact form visibility, section background alternation, mobile CTA visibility.

**Tech Stack:** Next.js 16, Tailwind CSS 4, inline styles for color reliability

---

## File Structure

```
src/app/page.tsx                    — Homepage (major rewrite: SB7 flow)
src/components/CTABlock.tsx         — CTA block (remove ScrollReveal, add transitional CTA)
src/components/ServicePageLayout.tsx — Service pages (brighten hero, fix section contrast)
src/app/about/page.tsx              — About page (fix layout bug)
src/app/contact/page.tsx            — Contact page (fix form visibility)
src/app/globals.css                 — Add mobile sticky CTA styles
```

---

### Task 1: Homepage — SB7 Hero Rewrite (Character + Problem)

**Files:**
- Modify: `src/app/page.tsx`

The hero currently says "We build the systems your revenue depends on" — that's about us. SB7 says lead with the customer's problem. The customer is the hero; we're the guide.

- [ ] **Step 1: Rewrite the hero section**

Replace the current hero content block (lines 83-125) — everything inside the `max-w-[720px]` div — with:

```tsx
            <h1 className="font-[var(--font-display)] font-800 text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]" style={{ color: "#f0ebe3" }}>
              Your revenue has a ceiling.
              <br />
              <span style={{ color: "rgba(240,235,227,0.45)" }}>It&rsquo;s not the market &mdash;</span>
              <br />
              it&rsquo;s the <em className="italic" style={{ color: "#c4835a" }}>system</em>.
            </h1>

            <p className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[560px]" style={{ color: "rgba(240,235,227,0.6)" }}>
              You built something worth scaling. But the website doesn&rsquo;t convert, the brand doesn&rsquo;t command, and your team is buried in manual work that should have been automated last year.
            </p>

            <p className="mt-4 font-[var(--font-body)] text-base sm:text-lg leading-relaxed max-w-[560px]" style={{ color: "rgba(240,235,227,0.45)" }}>
              That&rsquo;s not a growth problem. That&rsquo;s an architecture problem.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#book"
                className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
                style={{ backgroundColor: "#c4835a", color: "#070708" }}
              >
                Book a Diagnostic
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
                style={{ color: "#c4835a" }}
              >
                See how we work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
```

This gives us: direct CTA (Book a Diagnostic) + transitional CTA (See how we work). The service pills are removed from the hero — they'll show in the plan section.

- [ ] **Step 2: Verify and commit**

```bash
cd /Users/shawnbeekman/next_consulting_dev_website && npm run build
git add src/app/page.tsx && git commit -m "feat: SB7 hero — customer-first headline, problem framing, dual CTAs"
```

---

### Task 2: Homepage — Guide + Plan Sections

**Files:**
- Modify: `src/app/page.tsx`

Replace the Drucker quote section and "What We Build" section with Guide and Plan sections. The quote moves to after the plan.

- [ ] **Step 1: Replace quote and services sections**

Replace everything between `{/* ═══ QUOTE BREAK ═══ */}` and the end of `{/* ═══ SERVICES OVERVIEW ═══ */}` (lines 143-188) with:

```tsx
      {/* ═══ GUIDE — empathy + authority ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[800px] mx-auto">
          <p className="font-[var(--font-body)] text-base sm:text-lg leading-relaxed" style={{ color: "rgba(240,235,227,0.6)" }}>
            We&rsquo;ve watched this pattern destroy good businesses. Revenue goes up, but margins don&rsquo;t. Headcount grows, but output doesn&rsquo;t. The website looks fine, but it doesn&rsquo;t convert. The brand exists, but it doesn&rsquo;t command.
          </p>
          <p className="mt-6 font-[var(--font-body)] text-base sm:text-lg leading-relaxed" style={{ color: "rgba(240,235,227,0.45)" }}>
            Next Consulting works at the intersection of design, technology, and operations. We don&rsquo;t pitch &mdash; we diagnose. Then we build systems that compound.
          </p>
        </div>
      </section>

      {/* ═══ PLAN — 3 steps ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)", background: "#0c0c0e" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-[var(--font-display)] font-700 text-3xl sm:text-4xl mb-6" style={{ color: "#f0ebe3" }}>
            How It Works
          </h2>
          <p className="font-[var(--font-body)] text-sm mb-16" style={{ color: "rgba(240,235,227,0.4)" }}>
            Every engagement follows the same discipline.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Diagnose",
                body: "We audit your current systems \u2014 website, brand, operations \u2014 and identify exactly where revenue is leaking. No assumptions. No pitches. Just data.",
              },
              {
                step: "02",
                title: "Architect",
                body: "We design the fix. Whether it\u2019s a full website rebuild, a brand identity system, or workflow automation \u2014 we architect the solution before touching a single pixel.",
              },
              {
                step: "03",
                title: "Build & Compound",
                body: "We build it, launch it, and stay. Every system we deploy is designed to compound \u2014 not expire. We monitor, iterate, and optimize after go-live.",
              },
            ].map((item) => (
              <div key={item.step} className="relative" style={{ padding: "32px", border: "1px solid rgba(240,235,227,0.06)" }}>
                <span className="font-[var(--font-display)] text-sm font-700" style={{ color: "#c4835a" }}>
                  {item.step}
                </span>
                <h3 className="mt-3 font-[var(--font-display)] text-xl font-700" style={{ color: "#f0ebe3" }}>
                  {item.title}
                </h3>
                <p className="mt-4 font-[var(--font-body)] text-sm leading-relaxed" style={{ color: "rgba(240,235,227,0.45)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-[var(--font-display)] font-700 text-3xl sm:text-4xl mb-16" style={{ color: "#f0ebe3" }}>
            What We Build
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            {SERVICES.map((service, i) => (
              <div key={service.name}>
                <span className="font-[var(--font-display)] text-xs tracking-[0.15em] uppercase font-600" style={{ color: "#c4835a" }}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl font-700" style={{ color: "#f0ebe3" }}>
                  {service.name}
                </h3>
                <p className="mt-4 font-[var(--font-body)] text-sm leading-relaxed" style={{ color: "rgba(240,235,227,0.5)" }}>
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 mt-6 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80"
                  style={{ color: "#c4835a" }}
                >
                  Learn more
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/app/page.tsx && git commit -m "feat: SB7 guide + 3-step plan sections on homepage"
```

---

### Task 3: Homepage — Success + Stakes + Quote

**Files:**
- Modify: `src/app/page.tsx`

Replace the current "Value Proposition" section (the "problem isn't scale" block, lines 190-212) with Success, Stakes, and the Drucker quote.

- [ ] **Step 1: Replace value prop section**

Replace the `{/* ═══ VALUE PROPOSITION ═══ */}` section with:

```tsx
      {/* ═══ SUCCESS — paint the after ═══ */}
      <section className="py-28 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)", background: "#0c0c0e" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] leading-[1.15]" style={{ color: "#f0ebe3" }}>
            Your website converts. Your brand commands the room.
            <br />
            Your operations <em className="italic" style={{ color: "#c4835a" }}>run themselves</em>.
          </h2>
          <p className="mt-8 font-[var(--font-body)] text-base leading-relaxed max-w-[600px] mx-auto" style={{ color: "rgba(240,235,227,0.45)" }}>
            That&rsquo;s not a fantasy. It&rsquo;s what happens when you stop scaling a broken system and start building one that compounds.
          </p>
        </div>
      </section>

      {/* ═══ STAKES — what happens if you don't ═══ */}
      <section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
        <div className="max-w-[800px] mx-auto text-center">
          <blockquote className="font-[var(--font-body)] italic text-xl sm:text-2xl leading-relaxed" style={{ color: "#f0ebe3", opacity: 0.55 }}>
            &ldquo;The purpose of business is to create a customer, the business enterprise thus has two&mdash;and only two basic functions: marketing and innovation. Marketing and innovation produce results, all the rest are costs.&rdquo;
          </blockquote>
          <cite className="block mt-6 font-[var(--font-display)] not-italic text-xs font-500 tracking-[0.2em] uppercase" style={{ color: "#6b6560" }}>
            &mdash; Peter Drucker
          </cite>
          <p className="mt-10 font-[var(--font-body)] text-sm leading-relaxed max-w-[500px] mx-auto" style={{ color: "rgba(240,235,227,0.35)" }}>
            Every quarter you delay, the gap between where you are and where you should be compounds. Revenue without architecture is funded chaos.
          </p>
        </div>
      </section>
```

- [ ] **Step 2: Remove the old PROOF_POINTS constant**

Delete the `PROOF_POINTS` array (lines 29-33) since it's no longer used.

- [ ] **Step 3: Verify and commit**

```bash
npm run build
git add src/app/page.tsx && git commit -m "feat: SB7 success + stakes sections, Drucker quote repositioned"
```

---

### Task 4: Fix CTABlock — Remove ScrollReveal, Add Transitional CTA

**Files:**
- Modify: `src/components/CTABlock.tsx`

ScrollReveal is making CTA content invisible in some contexts. Remove it. Also add the transitional "See how we work" CTA.

- [ ] **Step 1: Rewrite CTABlock**

Replace the entire file:

```tsx
export default function CTABlock() {
  return (
    <section className="py-32 px-6 sm:px-14 flex items-center justify-center text-center" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
      <div>
        <h2 className="font-[var(--font-display)] font-700 text-[clamp(2rem,4vw,3rem)] tracking-[-0.02em] mb-4" style={{ color: "#f0ebe3" }}>
          Ready to talk?
        </h2>
        <p className="font-[var(--font-body)] text-sm mb-12 max-w-md mx-auto" style={{ color: "#6b6560" }}>
          45 minutes. No pitch. A diagnostic or your time back.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300 hover:brightness-110"
            style={{ backgroundColor: "#c4835a", color: "#070708" }}
          >
            Book a Diagnostic
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="mailto:revops@nextconsulting.dev"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-[var(--font-display)] text-xs font-600 tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ border: "1px solid #c4835a", color: "#c4835a" }}
          >
            Email Us
          </a>
        </div>

        <a
          href="/case-studies"
          className="inline-flex items-center gap-2 font-[var(--font-body)] text-sm transition-opacity duration-300 hover:opacity-80 mb-12"
          style={{ color: "rgba(240,235,227,0.35)" }}
        >
          Not ready to talk? See how we work first
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>

        <p className="font-[var(--font-body)] italic text-sm max-w-md mx-auto leading-relaxed" style={{ color: "#6b6560" }}>
          The question was never whether something needs to change.
          It&rsquo;s whether you&rsquo;ll be the one who changes it.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/CTABlock.tsx && git commit -m "fix: CTABlock — remove ScrollReveal, add transitional CTA, rename to Book a Diagnostic"
```

---

### Task 5: Brighten Service Page Hero Images

**Files:**
- Modify: `src/components/ServicePageLayout.tsx`

Hero images at `brightness(0.4)` are too dark. Bump to `0.5` and reduce the gradient overlay.

- [ ] **Step 1: Update hero image brightness**

In `ServicePageLayout.tsx`, change the hero img style from:
```
style={{ filter: "brightness(0.4) saturate(0.5)" }}
```
to:
```
style={{ filter: "brightness(0.5) saturate(0.6)" }}
```

And change the gradient overlay from:
```
"linear-gradient(to bottom, rgba(7,7,8,0.3) 0%, rgba(7,7,8,0.4) 50%, rgba(7,7,8,0.9) 100%)"
```
to:
```
"linear-gradient(to bottom, rgba(7,7,8,0.2) 0%, rgba(7,7,8,0.3) 50%, rgba(7,7,8,0.85) 100%)"
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/ServicePageLayout.tsx && git commit -m "fix: brighten service page hero images"
```

---

### Task 6: Alternate Section Backgrounds for Visual Rhythm

**Files:**
- Modify: `src/components/ServicePageLayout.tsx`

Every section on service pages has the same `#070708` background. Alternate between `#070708` and `#0c0c0e` for visual rhythm.

- [ ] **Step 1: Add background to deliverables section**

In `ServicePageLayout.tsx`, change the deliverables section opening tag from:
```
<section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)" }}>
```
to:
```
<section className="py-24 px-6 sm:px-14" style={{ borderTop: "1px solid rgba(240,235,227,0.08)", background: "#0c0c0e" }}>
```

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/components/ServicePageLayout.tsx && git commit -m "fix: alternate section backgrounds for visual rhythm"
```

---

### Task 7: Fix Contact Form Visibility

**Files:**
- Modify: `src/app/contact/page.tsx`

Form inputs are invisible — border-bottom is too faint. Add a subtle background fill and stronger default borders.

- [ ] **Step 1: Update all input and textarea styles**

In `contact/page.tsx`, for each `<input>` and `<textarea>`, change the style from:
```
style={{ color: "#f0ebe3", borderBottom: "1px solid rgba(240,235,227,0.1)" }}
```
to:
```
style={{ color: "#f0ebe3", borderBottom: "1px solid rgba(240,235,227,0.2)", background: "rgba(240,235,227,0.03)", padding: "12px 8px" }}
```

Also update the labels from `text-xs` to `text-xs mb-3` for more spacing.

- [ ] **Step 2: Verify and commit**

```bash
npm run build
git add src/app/contact/page.tsx && git commit -m "fix: contact form inputs visible — background fill + stronger borders"
```

---

### Task 8: Mobile Sticky CTA Bar

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

On mobile, the CTA buttons are below the fold in the hero. Add a sticky CTA bar at the bottom on mobile that appears after scrolling past the hero.

- [ ] **Step 1: Add sticky CTA to homepage**

At the very end of `page.tsx`, before the closing `</>`, add:

```tsx
      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex sm:hidden items-center justify-center gap-3 px-4 py-3 transition-transform duration-300"
        style={{
          background: "rgba(7,7,8,0.95)",
          borderTop: "1px solid rgba(196,131,90,0.2)",
          backdropFilter: "blur(8px)",
          transform: mounted ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <a
          href="#book"
          className="flex-1 flex items-center justify-center gap-2 py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
          style={{ backgroundColor: "#c4835a", color: "#070708" }}
        >
          Book a Diagnostic
        </a>
        <a
          href="mailto:revops@nextconsulting.dev"
          className="flex-1 flex items-center justify-center py-3 font-[var(--font-display)] text-xs font-600 tracking-[0.1em] uppercase"
          style={{ border: "1px solid #c4835a", color: "#c4835a" }}
        >
          Email Us
        </a>
      </div>
```

- [ ] **Step 2: Add bottom padding to body on mobile so content isn't hidden behind sticky bar**

In `globals.css`, add at the end:

```css
@media (max-width: 639px) {
  body {
    padding-bottom: 64px;
  }
}
```

- [ ] **Step 3: Verify and commit**

```bash
npm run build
git add src/app/page.tsx src/app/globals.css && git commit -m "feat: mobile sticky CTA bar — Book a Diagnostic + Email Us"
```

---

### Task 9: Playwright Verification

**Files:** None (verification only)

- [ ] **Step 1: Run full-page screenshots of all routes**

```bash
node -e "
const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const routes = ['/', '/websites', '/graphic-design', '/automation', '/about', '/contact'];
  for (const r of routes) {
    const name = r === '/' ? 'home' : r.slice(1);
    await desktop.goto('http://localhost:3004' + r, { waitUntil: 'networkidle' });
    await desktop.waitForTimeout(2000);
    const h = await desktop.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 300) { await desktop.evaluate(s => window.scrollTo(0,s), y); await desktop.waitForTimeout(100); }
    await desktop.screenshot({ path: '/tmp/sb7-final-' + name + '-desktop.png', fullPage: true });
    await mobile.goto('http://localhost:3004' + r, { waitUntil: 'networkidle' });
    await mobile.waitForTimeout(2000);
    const mh = await mobile.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < mh; y += 300) { await mobile.evaluate(s => window.scrollTo(0,s), y); await mobile.waitForTimeout(100); }
    await mobile.screenshot({ path: '/tmp/sb7-final-' + name + '-mobile.png', fullPage: true });
  }
  await browser.close();
})();
"
```

- [ ] **Step 2: Review all screenshots for:**
  - SB7 flow reads correctly on homepage (problem → guide → plan → services → success → stakes → CTA)
  - No invisible sections
  - Service hero images are visible
  - Contact form inputs are visible
  - Mobile sticky CTA bar renders
  - Section backgrounds alternate for visual rhythm

- [ ] **Step 3: Final commit if any fixes needed**

```bash
git add -A && git commit -m "fix: final adjustments from visual verification"
git push origin main
```
