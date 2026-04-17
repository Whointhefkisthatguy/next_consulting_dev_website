import type { SqueezePageContent } from "./types";

export const automationContent: SqueezePageContent = {
  slug: "automation",
  route: "/automation",
  meta: {
    title: "Automation — Next Consulting",
    description:
      "Process automation for automotive retail. CRM workflows, lead routing, and follow-up cadences that recover the revenue underused software never does.",
    ogImage: "/og/automation.png",
  },
  hero: {
    kicker: "Automation",
    headline:
      "1 in 5 dealerships still takes over an hour to respond to an internet lead. 3 in 4 never send a price. The follow-up that closes buyers is the one that never gets sent.",
    subhead:
      "DAS Technology 2025 Lead Response Study, mystery-shopped 1,700 non-DAS dealerships over Q3–Q4 2024.",
  },
  trustStats: [
    {
      value: "7x",
      label:
        "More likely to qualify a lead when contacted within 1 hour vs. 2 hours. Average company takes 42 hours.",
      source: {
        label: "HBR, The Short Life of Online Sales Leads (Oldroyd et al.), 2011",
        url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
      },
    },
    {
      value: "6%",
      label:
        "Share of organizations that report 5%+ EBIT impact from AI/automation, despite 88% having deployed it somewhere.",
      source: {
        label: "McKinsey, The State of AI, November 2025",
        url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
      },
    },
    {
      value: "74%",
      label: "Dealerships that never include a price quote in their lead response.",
      source: {
        label:
          "DAS Technology, 2025 Lead Response Study (NADA 2025)",
        url: "https://www.businesswire.com/news/home/20250122957181/en/DAS-Technology-Releases-Findings-of-Its-Annual-Automotive-Industry-Lead-Response-Study",
      },
    },
  ],
  promise:
    "You walk away with a map of which processes to automate, in what order, and where the leverage actually compounds.",
  deliverables: [
    {
      name: "Process audit",
      description:
        "A full map of your current lead and service workflows — every handoff, delay, and manual step documented.",
    },
    {
      name: "Automation architecture",
      description:
        "A prioritized blueprint of what to automate, in what sequence, using tools you already own or tools worth adding.",
    },
    {
      name: "Build",
      description:
        "We implement the automations — CRM workflows, routing rules, follow-up cadences — not just the spec.",
    },
    {
      name: "Handoff & documentation",
      description:
        "Every workflow documented, tested, and handed to your team with enough context to own it going forward.",
    },
  ],
  workSamples: undefined,
  process: [
    {
      title: "Audit",
      description:
        "We map every manual step in your lead and service workflows — finding the gaps where revenue is leaking today.",
    },
    {
      title: "Design",
      description:
        "We architect the automation layer: what runs automatically, what gets escalated, and what the rules are at every branch.",
    },
    {
      title: "Build",
      description:
        "We build and test the automations inside your actual stack — no throwaway demos, no sandbox-only prototypes.",
    },
    {
      title: "Handoff",
      description:
        "We document everything, train your team, and hand off a system that runs without us in the room.",
    },
  ],
  startProject: {
    headline: "Ready to put your manual work on autopilot?",
    subhead:
      "Tell us what's eating your team's time. We'll reach out by email or SMS within one business day to map the first automation that earns its keep.",
    submitLabel: "Start the project",
  },
};
