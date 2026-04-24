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
  priceRange: string;
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
      priceRange: "Custom scope", // DEFERRED — "leave them for now"
      oneLiner: "Lead-to-revenue plumbing. Integrated with Phase 1, not a bolt-on.",
    },
    {
      phaseSlug: "scale",
      label: "Phase 3 — Scale",
      priceRange: "Custom scope", // DEFERRED — "leave them for now"
      oneLiner: "Ongoing architecture. Stop whenever. You keep everything.",
    },
  ] as const satisfies readonly PricingTier[],
  arena: {
    eyebrow: "Not sold on us?",
    headline: "We built an arena for that.",
    body:
      "Don't believe us. Pay the crowd. Real builders fight tournament-style to earn your business — we're only here to see you win.",
    // Homepage teaser CTA routes to the /arena marketing page for the full pitch.
    // The /arena page itself exposes "Get early access" → /contact?interest=arena
    // while hosting is pending. When Arena ships, flip the /arena CTA to the
    // live URL and leave this one pointing at /arena as the content hub.
    ctaLabel: "See how Arena works",
    href: "/arena",
    external: false,
  },
} as const;
