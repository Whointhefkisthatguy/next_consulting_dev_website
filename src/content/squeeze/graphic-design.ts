import type { SqueezePageContent } from "./types";

export const graphicDesignContent: SqueezePageContent = {
  slug: "graphic-design",
  route: "/graphic-design",
  meta: {
    title: "Graphic Design — Next Consulting",
    description:
      "Brand identity, guidelines, and kit-of-parts design for automotive retail. Systems that hold up across every touchpoint.",
    ogImage: "/og/graphic-design.png",
  },
  hero: {
    kicker: "Graphic Design",
    headline: "\u201CDesign is thinking made visible.\u201D",
    attribution: "— Saul Bass",
    subhead: "We do that, ya know.",
  },
  promise:
    "You walk away with a brand system that holds up across every medium — not a logo in a vacuum.",
  trustStats: [
    {
      value: "33%",
      label: "Revenue lift organizations expect from consistent brand presentation",
      source: {
        label: "Lucidpress State of Brand Consistency, 2019",
        url: "https://www.prnewswire.com/news-releases/study-finds-companies-with-consistent-branding-can-see-up-to-33-increase-in-revenue-300967219.html",
      },
    },
    {
      value: "81%",
      label: "Consumers who say brand trust is a deal breaker in purchase decisions",
      source: {
        label: "Edelman Trust Barometer Special Report: In Brands We Trust?, 2019",
        url: "https://www.prnewswire.com/news-releases/only-one-third-of-consumers-trust-most-of-the-brands-they-buy-300869683.html",
      },
    },
    {
      value: "34%",
      label:
        "Consumers who actually trust most of the brands they buy — the gap is the opportunity",
      source: {
        label: "Edelman Trust Barometer Special Report: In Brands We Trust?, 2019",
        url: "https://www.prnewswire.com/news-releases/only-one-third-of-consumers-trust-most-of-the-brands-they-buy-300869683.html",
      },
    },
  ],
  deliverables: [
    {
      name: "Identity design",
      description:
        "Logo, mark, and visual language built to hold up at every scale and on every surface.",
    },
    {
      name: "Brand guidelines",
      description:
        "A single source of truth your team and vendors can follow without asking you every time.",
    },
    {
      name: "Type system",
      description:
        "Display, body, and functional typefaces chosen for hierarchy, readability, and brand voice.",
    },
    {
      name: "Color system",
      description:
        "Primary, secondary, and functional palettes with accessible contrast ratios and usage rules.",
    },
    {
      name: "Collateral & specimens",
      description:
        "Real-world applications — print, digital, signage — that prove the system works before you ship it.",
    },
  ],
  workSamples: [
    {
      title: "Sam Boswell brand system",
      client: "Sam Boswell",
      tags: ["Identity", "Guidelines"],
      image: "/images/bg-paper.jpg",
      status: "placeholder",
    },
    {
      title: "Red Hawks identity",
      client: "Red Hawks",
      tags: ["Identity", "Sports"],
      image: "/images/bg-ink.jpg",
      status: "placeholder",
    },
    {
      title: "Jurassic Park brand exploration",
      client: "Jurassic Park",
      tags: ["Brand", "Exploration"],
      image: "/images/bg-leather.jpg",
      status: "placeholder",
    },
    {
      title: "Trade-Up identity",
      client: "Trade-Up",
      tags: ["Identity", "Automotive"],
      image: "/images/bg-metal.jpg",
      status: "placeholder",
    },
    {
      title: "Valley Luxury Transport brand",
      client: "Valley Luxury Transport",
      tags: ["Brand", "Luxury"],
      image: "/images/bg-glass.jpg",
      status: "placeholder",
    },
    {
      title: "Driveonix identity",
      client: "Driveonix",
      tags: ["Identity", "Platform"],
      image: "/images/bg-circuit.jpg",
      status: "placeholder",
    },
  ],
  process: [
    {
      title: "I. Audit",
      description:
        "We inventory every existing brand asset, identify inconsistencies, and map what customers actually see.",
    },
    {
      title: "II. Strategy",
      description:
        "Positioning, competitive landscape, and brand personality defined before a mark is drawn.",
    },
    {
      title: "III. Design",
      description:
        "Identity exploration, refinement, and sign-off on every element of the visual system.",
    },
    {
      title: "IV. Systematize",
      description:
        "Guidelines, templates, and specimens packaged so the system scales without your oversight.",
    },
  ],
  startProject: {
    headline: "Let's build a brand that actually holds up.",
    subhead:
      "Tell us about your business and what you want the brand to do. We'll reach out by email or SMS within one business day.",
    submitLabel: "Start the project",
  },
};
