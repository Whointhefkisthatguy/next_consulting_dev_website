export type TrustStat = {
  value: string;
  label: string;
  source: { label: string; url: string };
};

export type WorkSample = {
  title: string;
  client: string;
  tags: string[];
  image: string;
  href?: string;
  status: "placeholder" | "live";
};

export type Deliverable = {
  name: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type StartProjectBlock = {
  headline: string;
  subhead: string;
  submitLabel: string;
};

export type ServiceSlug = "websites" | "graphic-design" | "automation" | "general";

export type SqueezePageContent = {
  slug: "websites" | "graphic-design" | "automation";
  route: `/${string}`;
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  hero: {
    kicker?: string;
    headline: string;
    subhead?: string;
    attribution?: string;
  };
  trustStats: [TrustStat, TrustStat, TrustStat];
  promise: string;
  deliverables: Deliverable[];
  workSamples?: WorkSample[];
  process: ProcessStep[];
  startProject: StartProjectBlock;
};

export type TierLabel = "Realized" | "In-Flight" | "Thesis";

export type CaseStudyFrontmatter = {
  slug: string;
  title: string;
  description: string;
  plate: string;
  tier: 1 | 2 | 3;
  tierLabel: TierLabel;
  industry: string;
  engagement: string;
  thesis: string;
  publishedAt: string;
  draft?: boolean;
};

export type EssayFrontmatter = {
  slug: string;
  title: string;
  description: string;
  author: string;
  authorTitle: string;
  category: string;
  publishedAt: string;
  draft?: boolean;
};
