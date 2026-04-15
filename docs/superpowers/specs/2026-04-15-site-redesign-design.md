# Next Consulting — Full Site Redesign

## Overview

Complete redesign of nextconsulting.dev from a single-page scroll site to a multi-page site with proper navigation, service pages, portfolio, and case studies. Design direction: premium, deep, minimalistic, cinematic. The site itself proves what Next Consulting sells — excellence in design and client experience.

## Navigation

**Structure**: Fixed header, full-width, ~72px height

- **Left**: N> monogram SVG (~28px height)
- **Center**: Home | Services (dropdown) | Case Studies | Our Work | About | Contact
- **Right**: "Book a Call" CTA button in copper

**Services dropdown**: Websites, Graphic Design, Automation — simple hover panel, `--surface` background

**Behavior**:
- Transparent over hero sections, cream text
- On scroll past hero: `--void` background fades in with subtle `--divider` bottom border
- Active page: copper underline, 2px, offset 4px below text

**Mobile**:
- Monogram left, hamburger right
- Full-screen overlay: `--void` background, links stacked center, Syne 600 large type
- Services expand inline with indent

**Nav typography**: Syne 500, 13px, tracking 0.05em, uppercase. Dropdown items: DM Sans 400, 14px, normal case.

---

## Design System

### Typography

Two fonts only:

- **Display**: Syne (700/800) — geometric, modern, confident. Headings, nav, monogram wordmark.
- **Body**: DM Sans (400/500) — clean, warm, readable. Paragraphs, UI elements, captions.

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--void` | #070708 | Background, near-black with warmth |
| `--surface` | #0f0f11 | Cards, elevated surfaces |
| `--cream` | #f0ebe3 | Primary text |
| `--muted` | #6b6560 | Secondary text, captions |
| `--copper` | #c4835a | Single accent — interactive elements only |
| `--divider` | rgba(240,235,227,0.06) | Borders, separators |

### Depth System

- Film grain overlay: CSS noise texture at 2-3% opacity
- Ambient light gradients: warm copper glow spots at ~4% opacity, positioned per page
- Micro-shadows on elevated elements (warm shadow, not standard box-shadow)
- No glassmorphism. No blur effects. Depth through spatial composition and light.

### Background Imagery

- **Source**: Unsplash — hyper-cropped, zoomed in tight enough to read as texture/mood, not literal subjects (grain of leather, light through glass, machined metal, ink on paper, condensation on steel)
- **Aspect ratios**: Varied — ultrawide cinematic strips (21:9), tall narrow slices (9:16), squares. Never full-bleed. Placed asymmetrically for compositional tension.
- **Treatment**: Desaturated 60-70%, blended into void at 15-30% opacity. Should feel like light leaking in, not images placed on top.
- **Placement**: 2-3 per page, unique per page. No repeats.
- **Motion**: Subtle parallax drift (5-10% offset from content scroll speed) — dimensional without being distracting.

### Motion

- **Page transitions**: Content fades out (200ms), new page fades in (400ms) with 20px upward shift
- **Scroll reveals**: Elements translate up 30px, fade in on viewport entry, staggered 100ms per element
- **Hover states**: 300ms ease-out on everything. Copper accent fades in.
- **No parallax on content. No scroll hijacking.**

---

## Pages

### 1. Homepage

**Hero** (full viewport height):
- Monogram centered, large (~120px desktop), fades in with slow scale 0.95 → 1 over 1.5s
- Tagline below: Syne 500, ~18px, uppercase, tracked — "REVENUE ARCHITECTURE & DESIGN" (or similar)
- Subhead quote: DM Sans 400 italic, muted
- Hyper-cropped background image bleeds from bottom-right, ultrawide, ~20% opacity
- Scroll indicator bottom-center: minimal line + vertical "Scroll" text

**Services Overview**:
- Three columns, no cards/borders — just type, whitespace, alignment
- Each service: icon or small visual, name in Syne 700, one sentence, "Learn more" link with copper arrow
- Tall narrow background image slice between columns 2 and 3

**Value Proposition**:
- One strong statement: large Syne, centered, ~48px (e.g. "The problem isn't scale, it's architecture")
- 2-3 proof points below: DM Sans muted, copper numbered badges (01, 02, 03)

**CTA Section**:
- Heading in Syne
- Three actions:
  - **Primary**: "Book a Call" — copper background, void text
  - **Secondary**: "Email Us" — copper outline, links to revops@nextconsulting.dev
  - **Tertiary**: "Request Information" — text link with arrow
- Closing line: DM Sans italic, muted

**Footer**:
- Monogram left, copyright center, social links right
- `--divider` border top
- Nav links repeated in small type

### 2. Service Pages (Websites, Graphic Design, Automation)

All three follow the same template with unique content.

**Hero**:
- Page title: Syne 800, ~64px, left-aligned
- Quote subhead: unique per page, DM Sans italic, muted
- Background image right side, cinematic aspect ratio, fading into void

**What We Do**:
- 2-3 paragraphs, DM Sans 400, max-width ~680px, left-aligned
- CX/RevOps framing — not just deliverables, but business impact
- Background image strip along right margin, tall and narrow

**Deliverables**:
- Simple list, no cards
- Copper numbered badges (01, 02, 03...) + name in Syne 600 + one-line description in DM Sans muted
- Generous spacing between items

**Process** (optional per page):
- 3-4 steps, horizontal on desktop, vertical on mobile
- Copper step number, Syne title, DM Sans description
- Connected by thin `--divider` line

**CTA**:
- Same tri-level block as homepage

### 3. Case Studies Page

**Grid**:
- 2 columns on desktop
- Cards: project image (actual screenshot/deliverable), client name, service type tag, one-line result
- `--surface` background, warm shadow on hover, copper border-top on hover

**Individual Case Study** (own route):
- Hero with large project image
- Client name, service type, timeline
- Narrative: challenge → approach → outcome in DM Sans prose
- Key metrics with copper accent on numbers
- Next/Previous navigation at bottom

### 4. Our Work Page

**Portfolio grid**:
- Masonry-style or varied aspect ratio grid (matches cinematic image philosophy)
- Each item: project thumbnail fills card, name + service type overlay on hover
- Filterable by service type — simple text toggle, copper underline on active

### 5. About Page

**Hero**:
- "About" in Syne, quote subhead
- Background image — human, zoomed tight

**The Story**:
- Who Next Consulting is, philosophy, approach
- DM Sans prose, generous whitespace, left-aligned, max-width
- Pull quote as breakout: large Syne italic, copper left border

**CTA**: Same tri-level block

### 6. Contact Page

**Layout**:
- Left: heading, quote subhead, brief copy ("45 minutes. No pitch. A diagnostic or your time back.")
- Right: form — Name, Email, Company, Message, Submit (copper button)
- Below form: direct links — revops@nextconsulting.dev, booking link, "Request Information"
- No map, no address block

---

## CTAs (Global)

Three tiers used consistently across all pages:

1. **Primary**: "Book a Call" — copper background, void text, links to booking
2. **Secondary**: "Email Us" — copper outline border, links to revops@nextconsulting.dev
3. **Tertiary**: "Request Information" — text link with copper arrow

---

## Technical Notes

- **Stack**: Next.js (current), Tailwind CSS 4
- **Fonts**: Google Fonts — Syne + DM Sans (replace all 7 current fonts)
- **Images**: Unsplash, downloaded and served from /public (not hotlinked)
- **Routing**: App Router — each page is its own route
- **Animations**: CSS transitions + IntersectionObserver for scroll reveals. No GSAP dependency.
- **Responsive**: Mobile-first. Breakpoints at sm (640), md (768), lg (1024), xl (1280)
- **Deployment**: Vercel, vercel.json with framework: nextjs required for Next.js 16
