import { websitesContent } from "@/content/squeeze/websites";
import { graphicDesignContent } from "@/content/squeeze/graphic-design";
import { automationContent } from "@/content/squeeze/automation";
import type { SqueezePageContent } from "@/content/squeeze/types";

// =============================================================================
// LEGACY: Foundation / Automation / Scale model
// Still consumed by /pricing and the existing /websites, /automation, /scale pages.
// Will be reconciled with the RBMS module sequence in a follow-on spec.
// =============================================================================

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

// =============================================================================
// RBMS Module Sequence (5 modules, contractor ICP)
// See: docs/superpowers/specs/2026-05-25-rbms-module-sequence.md (strategy doc)
// =============================================================================

export type ModuleSlug =
  | "acquisition"
  | "intake"
  | "scheduling"
  | "execution"
  | "close";

export type RbmsModule = {
  number: "01" | "02" | "03" | "04" | "05";
  slug: ModuleSlug;
  name: string;
  lens: string;
  soldAs: string;
  builtAs: string;
  handsOffTo: ModuleSlug | null;
};

export type EntryTierSlug = "find-the-leak" | "run-the-work" | "full-os";

export type EntryTier = {
  number: "01" | "02" | "03";
  slug: EntryTierSlug;
  name: string;
  lensQuote: string;
  firstModule: string;
  buildFrom: number;
  monthly: number;
  expansionPath: string;
  contactHref: string;
};

export type Rule = {
  number: "01" | "02" | "03";
  name: string;
  body: string;
};

export type Industry = {
  name: string;
  oneLine: string;
};

export const positioning = {
  // The new category claim line. Drives CategoryClaim section on the homepage.
  // Pattern: "{lead}, {tail}" — the comma is the split point. CategoryClaim
  // splits on ", " and renders the tail in italic.
  categoryClaim:
    "We don't sell software, we install the operating system one module at a time.",
  // LEGACY phase model — still consumed by /pricing.
  phases: [
    {
      number: "01",
      slug: "foundation",
      name: "Foundation",
      headline: "The website and brand that earn credibility in 50 milliseconds.",
      subhead:
        "Phase 1 gives you a revenue-grade site and the identity system that runs on top of it. Nothing is bolted on. It's architected.",
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
        "Phase 3 is ongoing optimization. Conversion iteration, new-channel playbooks, and reporting that tells you what's actually working.",
      deliverables: [],
    },
  ] as const satisfies readonly Phase[],
  // LEGACY pricing — consumed by /pricing PricingLadder block. Do not delete.
  pricing: [
    {
      phaseSlug: "foundation",
      label: "Phase 1 · Foundation",
      priceRange: "$5,000 – $15,000",
      oneLiner:
        "Website + brand system. The website is the anchor, brand stacks on top. You own the code, the DB, the domain.",
    },
    {
      phaseSlug: "automation",
      label: "Phase 2 · Automation",
      priceRange: "Custom scope",
      oneLiner:
        "Lead-to-revenue plumbing. Integrated with Phase 1, not a bolt-on.",
    },
    {
      phaseSlug: "scale",
      label: "Phase 3 · Scale",
      priceRange: "Custom scope",
      oneLiner: "Ongoing architecture. Stop whenever. You keep everything.",
    },
  ] as const satisfies readonly PricingTier[],
  // ===========================================================================
  // RBMS five-module sequence. Drives the § 4 module sequence on the homepage.
  // ===========================================================================
  modules: [
    {
      number: "01",
      slug: "acquisition",
      name: "Acquisition",
      lens: "I need more work. My phone doesn't ring like it used to.",
      soldAs:
        "Instrumented lead capture and forced follow-up. Every lead that touches your business is captured. Every quote gets a follow-up sequence the system won't let your team skip.",
      builtAs:
        "Plus full-funnel instrumentation. The system tracks every lead all the way through to job completion and payment, so you can see exactly where the work disappears.",
      handsOffTo: "intake",
    },
    {
      number: "02",
      slug: "intake",
      name: "Intake",
      lens: "Leads come in but they don't turn into jobs. The good ones slip away.",
      soldAs:
        "Qualification and routing. Every captured lead is scored, qualified, and sent to the right person. No lead sits unactioned. No lead reaches the wrong hands.",
      builtAs:
        "Plus conversion-stage tracking. Every transition from lead to booked job is instrumented, so you can see exactly which stage bleeds and why.",
      handsOffTo: "scheduling",
    },
    {
      number: "03",
      slug: "scheduling",
      name: "Scheduling",
      lens: "We're busy but it's chaos. Crews double-booked, jobs starting late, the calendar is a source of stress.",
      soldAs:
        "Dispatch and calendar control. The right crew, at the right job, at the right time, visible to everyone who needs it. Double-booking is impossible.",
      builtAs:
        "Plus capacity-versus-demand instrumentation. The system tells you whether you're genuinely at capacity or just disorganized, and whether more work would help or break things.",
      handsOffTo: "execution",
    },
    {
      number: "04",
      slug: "execution",
      name: "Execution",
      lens: "My jobs fall apart in the field. The crew runs the work without the discipline I'd run it with.",
      soldAs:
        "Job-stage compliance, built around your actual workflow. Every job moves through defined stages, and the system won't let a stage be skipped or faked.",
      builtAs:
        "Plus margin-leak instrumentation. The system tracks where money is lost inside a job: rework, overruns, unbilled change orders, time that vanished.",
      handsOffTo: "close",
    },
    {
      number: "05",
      slug: "close",
      name: "Close",
      lens: "I do the work but I'm always chasing money. Invoices late, change orders unbilled, collections a part-time job nobody owns.",
      soldAs:
        "Billing and collections compliance. Every completed job is billed in full, on time, with collections the system drives. Not you.",
      builtAs:
        "Plus whole-system reporting. With all five modules live, the system now reports across the entire operation on one screen, always true because the engine enforced every step that produced the data.",
      handsOffTo: null,
    },
  ] as const satisfies readonly RbmsModule[],
  // ===========================================================================
  // Three entry tiers (the doors). Drives § 6 EntryTiers on the homepage.
  // PRICING PROPOSED 2026-05-25 — confirm or override with actual delivery
  // cost + target margin. See plan: /Users/shawnbeekman/.claude/plans/graceful-soaring-bachman.md
  // ===========================================================================
  entryTiers: [
    {
      number: "01",
      slug: "find-the-leak",
      name: "Find the Leak",
      lensQuote:
        "You don't need more leads. You need to see where the ones you have are going.",
      firstModule: "Module 01 · Acquisition",
      buildFrom: 5000,
      monthly: 750,
      expansionPath: "Intake → Scheduling → Execution → Close",
      contactHref: "/contact?tier=find-the-leak",
    },
    {
      number: "02",
      slug: "run-the-work",
      name: "Run the Work",
      lensQuote:
        "Your jobs run the way you'd run them, without you on every site.",
      firstModule: "Modules 01 + 02, fast-tracked to Execution",
      buildFrom: 18000,
      monthly: 1650,
      expansionPath: "Scheduling → Close",
      contactHref: "/contact?tier=run-the-work",
    },
    {
      number: "03",
      slug: "full-os",
      name: "The Full OS",
      lensQuote:
        "The whole business on one system, from first call to final payment.",
      firstModule: "Full five-module sequence",
      buildFrom: 45000,
      monthly: 2850,
      expansionPath: "Whole-system reporting + recursive loop",
      contactHref: "/contact?tier=full-os",
    },
  ] as const satisfies readonly EntryTier[],
  // ===========================================================================
  // Three design rules. Drives § 5 ThreeRules on the homepage.
  // ===========================================================================
  rules: [
    {
      number: "01",
      name: "Fixed build. Flexible frame.",
      body: "Same five modules every time. Only the language flexes to the contractor's named bleed. You always know what you're getting.",
    },
    {
      number: "02",
      name: "Bounded promise. Doubled delivery.",
      body: "Every module is sold as a specific, picture-able thing. We build it to deliver twice that. The second half is always instrumentation that sees further down the funnel than you asked for.",
    },
    {
      number: "03",
      name: "Every module hands off.",
      body: "Each module's data diagnoses the next one. Your own dashboard makes the case for the next build. We don't.",
    },
  ] as const satisfies readonly Rule[],
  // ===========================================================================
  // Industries served. Drives § 8 IndustriesGrid on the homepage.
  // ===========================================================================
  industries: [
    { name: "HVAC", oneLine: "Phones ringing, jobs stacking, summer chaos." },
    { name: "Plumbing", oneLine: "Service calls, dispatch, after-hours bleed." },
    { name: "Electrical", oneLine: "Mixed residential and commercial routing." },
    { name: "Roofing", oneLine: "Seasonal surges, crew mix, insurance work." },
    { name: "Remodeling", oneLine: "Long jobs, change orders, margin leaks." },
    { name: "Landscaping", oneLine: "Recurring routes, install jobs, weather risk." },
  ] as const satisfies readonly Industry[],
  // ===========================================================================
  // Cross-property URL: NLE Client Eval intake (7-section / 22-question
  // diagnostic wizard, "Let's measure it. / A 10-minute look at where your
  // business is leaking money." — generates the problem-cost chart reserved
  // for the discovery call, surfaced in the lead UI). Lives on the VM-hosted
  // NLE deployment via the nle-inbound.athenavr2.cc cloudflared tunnel.
  //
  // Why not pay.nextconsulting.dev/intake? That host points at the dormant
  // Vercel project (per docs/ops/vercel-dormancy.md) which is still serving
  // the OLD build-intake form ("Let's build it. / Fifteen questions") from
  // before PR #141. The VM, which IS the canonical deployment, is on current
  // main and serves the Client Eval form correctly.
  //
  // FOLLOW-ON: cut DNS so pay.nextconsulting.dev (or a new vanity host such
  // as intake.nextconsulting.dev) points at the VM tunnel, then swap this
  // constant back to the branded host. Tracked in NLE ops backlog.
  // ===========================================================================
  nleIntakeUrl: "https://nle-inbound.athenavr2.cc/intake",
  arena: {
    eyebrow: "Not sold on us?",
    headline: "We built an arena for that.",
    body:
      "Don't believe us. Pay the crowd. Real builders fight tournament-style to earn your business. We're only here to see you win.",
    ctaLabel: "See how Arena works",
    href: "/arena",
    external: false,
  },
} as const;
