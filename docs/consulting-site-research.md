# Best-in-Class Consulting Site Research

## 1. Elite Consulting Site Patterns

**MBB (McKinsey/Bain/BCG)** compete on restraint and depth:
- Custom typefaces, zero stock photos
- Thought leadership IS the product — articles, reports, insights
- Extreme whitespace, minimal navigation, no visual noise
- Trust built through institutional weight, not flashy design

**Digital Agencies (Work & Co, Instrument, Pentagram)** compete on craft proof:
- Portfolio IS the hero — the work speaks
- Custom cursors, monochrome + one accent color
- Sub-1.5s load times as a non-negotiable
- Motion design as narrative system, not decoration

**Key takeaway:** NEXT sits between these — consulting authority with agency-level craft. The site should feel like a firm that builds things, not one that just advises.

## 2. Pricing Page Best Practices

- **Three-tier with visual anchor on middle tier** — this is psychologically proven
- **Show price minimums** — hiding all pricing increases bounce rate significantly
- **First-person CTA copy** ("Get My Strategy Session") outperforms second-person ("Get Your...")
- **One specific testimonial per tier**, outcome-referenced (not generic praise)
- **FAQs below the fold** handle objections without cluttering the cards
- **No feature parity comparison tables** — card-focused layouts convert better for services

## 3. Glassmorphism That Works

- Only works against gradient/abstract backgrounds (NOT photos)
- Blur radius: 10-20px desktop, 6-8px mobile
- Background opacity: 15-18%
- Max 3-5 glass elements on screen simultaneously
- **Never animate `backdrop-filter`** — kills performance
- Best applications: pricing cards, stats panels, sticky nav transition on scroll

```css
/* Production glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px) saturate(1.3);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
```

## 4. Scroll Animation Patterns

**Premium:**
- Staggered fade-up: 60-100ms stagger, 400-600ms duration, power2.out easing
- Text mask/clip reveal for headlines (character or word level)
- Pinned horizontal scroll for 4+ case studies
- Count-up numbers for metrics
- Parallax ONLY on background decorative elements, 10-20px max offset

**Gimmicky (avoid):**
- Parallax on text or primary content
- Rotation effects on scroll
- Scale animations on anything other than images
- Any animation > 800ms duration
- Stagger delays > 150ms

**The line between premium and gimmicky is timing and restraint.**

## 5. Typography Pairing

Dominant 2025-2026 pattern: **high-contrast editorial serif (display) + geometric sans (body)**

Specific pairs:
- **Fraunces + Inter Variable** — tech-forward warmth
- **Editorial New + DM Sans** — editorial authority
- **Instrument Sans + Lora** — modern clarity

Rules:
- Hero text: 72-96px minimum on desktop
- Two families max (three with a mono for labels)
- Letter-spacing: `0.12em` on uppercase labels, `-0.02em` on display heads
- Max 65ch line length on body text
- Font weight contrast > 300 units between display and body

## 6. CTA Button Design

- Minimum 44x44px touch target
- **Filled beats ghost/outline** for primary CTAs
- First-person copy
- One CTA per section (not two competing buttons)
- The premium hover pattern: 2px lift + shadow deepening + instant `:active` return
- Magnetic hover (cursor-following translate) signals high craft

Common failures:
- Ghost buttons as primary CTA (low contrast, low urgency)
- "Learn More" as CTA text (zero specificity)
- Multiple CTAs competing for attention in the same viewport

## 7. Navy/Coral/Blue Color Psychology

- Navy: 42% trust lift in professional services contexts
- **Navy + coral is the highest-converting pairing** in professional services — 34% more trustworthy than competing combinations
- Coral must stay under ~15% of visible surface area (accent, not dominant)
- Blue (#4376BB) works for secondary elements, labels, metadata

**WCAG note:** Coral #E65B38 with white text is borderline AA. Use dark text on coral backgrounds, or darken coral slightly for text-on-dark applications.

Palette tokens:
| Token | Value | Use |
|-------|-------|-----|
| `--navy` | `#051C2C` | Primary background |
| `--navy-light` | `#0a2d45` | Card backgrounds |
| `--coral` | `#E65B38` | Primary accent, CTAs |
| `--coral-light` | `#ff7b5a` | Hover states |
| `--blue` | `#4376BB` | Labels, metadata |
| `--gray` | `#929497` | Body text, descriptions |
| `--white` | `#FFFFFF` | Headlines, feature text |

## 8. The $500 vs. $50k Gap

Ten observable differences that separate template sites from agency builds:

1. **Custom typeface rendering** — not just Google Fonts, but proper font-feature-settings, optical sizing
2. **Motion as narrative system** — animations tell a story, not just "things fade in"
3. **Scroll-linked behaviors** — progress indicators, parallax layers, pinned transitions
4. **Image handling** — LQIP placeholders, art-directed responsive images, no CLS
5. **Design token system** — consistent spacing/color/type scale, not ad-hoc values
6. **Micro-interaction craft** — form label animations, press states, wipe underlines
7. **Performance budget** — LCP < 1.5s, no layout shift, preloaded critical assets
8. **Five-breakpoint responsive** — not just "mobile and desktop" but fluid at every width
9. **Hover states on every interactive element** — nothing feels dead
10. **Custom cursor** — optional but signals extreme attention to detail
