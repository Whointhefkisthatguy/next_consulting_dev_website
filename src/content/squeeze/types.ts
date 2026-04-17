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

export type ServiceOffer = {
  name: string;
  durationMinutes: number;
  bullets: string[];
  calendlyUrl: string;
  buttonLabel: string;
};

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
  offer: ServiceOffer;
};

export type CaseStudyFrontmatter = {
  slug: string;
  title: string;
  problem: string;
  hypothesis: string;
  results: Array<{ metric: string; value: string; context: string }>;
  sources: Array<{ label: string; url: string }>;
  ogImage?: string;
  publishedAt: string;
};
