# Next Consulting Website -- Design Spec

## Overview

A single-page website for Next Consulting that functions as a statement of authority, not a sales tool. The site is a filter: if you need convincing, you're not the client. Minimal content, maximum intent. The Architect meets Van Gogh -- precision and systems thinking with an artist's hand.

## Brand Identity

- **Name on site:** None. Monogram only.
- **Personality:** Structured chaos. Blueprints drawn by someone who sees beauty in the math.
- **Audience:** Large-scale retail auto clients. $100K+/mo ad spend or $100M+ annual revenue. But the site speaks from expertise, not to a vertical. Industry-agnostic language. Revenue architecture as a discipline.
- **Conversion philosophy:** Not a form -- a threshold. If they made it here, they qualify.

## Color Palette

| Role | Value | Notes |
|------|-------|-------|
| Canvas | `#0A0A0C` - `#141418` | Near-black, deep charcoal |
| Primary text | `#B8BCC4` range | Cool gray |
| Accent 1 | Gold amber | Warm metallic, aged brass. Primary accent. |
| Accent 2 | Burnt orange | The Van Gogh heat. Secondary warmth. |
| Accent 3 | Deep blue | Structural, the architect's ink. Sparse use. |
| Borders/subtle | Dark gray | Barely visible, structural only |

Exact hex values to be finalized during implementation with the brand guidelines PDF as reference.

## Typography

New pairing -- not reusing existing brand fonts. Direction:

- **Display/Headlines:** Geometric precision. Sharp, confident, architectural.
- **Body/Quotes:** Clean, quiet, readable at medium sizes.
- **Sourced from Google Fonts** for simplicity.

Final pairing selected during implementation.

## Texture

- Subtle grain texture overlay across the entire canvas, low opacity, static (not animated)
- Adds the painterly quality beneath the clean structure

## Page Structure

### Section 1: The Monogram

- Full viewport height, monogram dead center
- Canvas: `#0A0A0C` with grain overlay
- Monogram rendered in gold amber, slightly oversized
- Animation: fades in over ~1.5s with subtle upward drift on load
- Nothing else on screen. No nav, no text, no scroll indicator.
- Scroll discovered naturally -- only affordance is a barely visible gradient shift at bottom edge
- Logo source: `/Desktop/NextConsulting_FINAL_FILES_Mar2026/Next_Consulting_RGB.svg` (monogram variant)

### Section 2: The Drucker Quote

- Full viewport, same dark canvas
- Quote centered:

  > "There is surely nothing quite so useless as doing with great efficiency what should not be done at all."

- Attribution below: *"-- Peter Drucker, 1963"* in smaller, muted gray
- Source: "Managing for Business Effectiveness," Harvard Business Review, May 1963
- Animation: clean fade-in + slight upward shift on scroll, entire block at once
- Gold amber accent on a single element (em dash or period)

### H1 Transition

- Between the quote and the truths
- Text: **"The problem isn't scale, it's architecture."**
- Can be its own brief viewport moment or positioned at the bottom of Section 2 with breathing room
- Same fade-in treatment

### Section 3: Three Contrarian Truths + Counter Metrics

- Full viewport (or slightly more), same dark canvas
- Three blocks stacked vertically with generous spacing

**Block 1:**
- Statement: *"Best in class is just the tallest person in a short room."*
- Counter metric: *"92% of companies benchmarking against industry averages are optimizing the wrong targets."*

**Block 2:**
- Statement: *"Your funnel isn't leaking. It was never built to hold."*
- Counter metric: *"For every dollar spent acquiring customers, 58 cents is spent compensating for process failures downstream."*

**Block 3:**
- Statement: *"The revenue you report isn't the revenue you're missing."*
- Counter metric: *"Most organizations don't have a revenue problem. They have 30 process problems wearing a revenue mask."*

**Layout per block:**
- Statement in medium cool gray, one word/phrase accented in gold amber
- Counter metric beneath, smaller, more muted -- rewards the reader for looking closer
- Staggered fade-in: statement first, metric follows ~300ms later
- Blocks stagger 200-300ms apart as they enter viewport

All metrics viewed through the Drucker lens: the problem is efficiency misapplied, not a lack of resources.

### Section 4: The Inquiry

- Full viewport, same dark canvas
- A single line: *"If this resonates, we should talk."* (or similar -- minimal)
- One action: understated link or minimal button opens the inquiry
- Inquiry collects:
  - Name
  - Company
  - One open field: *"What problem are you solving?"*
- No revenue qualifiers. No dropdowns. No checkboxes.
- Submit: *"Request a conversation"*
- The simplicity of the form signals exclusivity

## Technical Architecture

- **Framework:** Next.js 15+ with App Router
- **Styling:** Tailwind CSS 4
- **Animations:** CSS scroll-driven animations (native) where possible, Framer Motion for polish
- **Grain texture:** CSS-based (pseudo-element with noise SVG or generated texture)
- **Logo:** SVG from brand package
- **Fonts:** Google Fonts (specific pairing TBD)
- **Responsive:** Fully responsive, designed desktop-first
- **Deployment:** Vercel
- **Form backend:** TBD -- could be simple API route + email, or external service

## What This Site Is Not

- Not a portfolio
- Not an agency site
- Not a lead gen squeeze page
- Not an explainer of services
- No testimonials, no client logos, no case studies
- No navigation menu
- No footer (or the barest possible)
