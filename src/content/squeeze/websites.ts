import type { SqueezePageContent } from "./types";

export const websitesContent: SqueezePageContent = {
  slug: "websites",
  route: "/websites",
  meta: {
    title: "Websites · Next Consulting",
    description:
      "Custom websites engineered for conversion. Tell us about your project. We'll get back within one business day.",
    ogImage: "/og/websites.png",
  },
  hero: {
    kicker: "§ 01 · Websites",
    headline: "Websites built as revenue instruments, not brochures.",
    subhead:
      "Every pixel, load time, and form field engineered against one question: does it convert?",
  },
  trustStats: [
    {
      value: "8.4%",
      label: "A 0.1-second improvement in mobile load time increased retail conversion rates by 8.4%",
      source: {
        label: "Deloitte / Google, Milliseconds Make Millions, 2020",
        url: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html",
      },
    },
    {
      value: "53%",
      label: "53% of mobile visits are abandoned if a page takes longer than 3 seconds to load",
      source: {
        label: "Google, The Need for Mobile Speed, 2016",
        url: "https://blog.google/products/admanager/the-need-for-mobile-speed/",
      },
    },
    {
      value: "50 milliseconds",
      label: "Users form a credibility judgment about your website in as little as 50 milliseconds, before they read a single word",
      source: {
        label: "Lindgaard et al., Behaviour & Information Technology, 2006",
        url: "https://www.tandfonline.com/doi/abs/10.1080/01449290500330448",
      },
    },
  ],
  promise:
    "You walk away with a site that loads fast, reads clear, and turns strangers into customers. Not a style trophy.",
  deliverables: [
    { name: "Custom UI/UX design", description: "Wireframes through high-fidelity, informed by your actual customer journey." },
    { name: "Full-stack development", description: "Frontend, backend, database, deployment. One team, one standard." },
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
    { title: "Scope", description: "We sit with you, map your customer journey, and define what success looks like before we propose anything." },
    { title: "Architecture", description: "Information architecture, stack decisions, and wireframes before a pixel is placed." },
    { title: "Build", description: "Design and development in parallel, with checkpoints at every milestone." },
    { title: "Launch & iterate", description: "Deployment, monitoring, and continuous improvement on real data." },
  ],
  startProject: {
    headline: "Ready to build a site that actually converts?",
    subhead:
      "Tell us what you're working with and what you want it to do. We'll reach out by email or SMS within one business day with real next steps. No pitch deck, no theater.",
    submitLabel: "Start the project",
  },
};
