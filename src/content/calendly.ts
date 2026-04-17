const DEFAULT_CALENDLY = "https://calendly.com/nextconsulting/intro";

export const CALENDLY = {
  default: DEFAULT_CALENDLY,
  websiteAudit:
    process.env.NEXT_PUBLIC_CALENDLY_WEBSITE_AUDIT ?? DEFAULT_CALENDLY,
  brandCheck:
    process.env.NEXT_PUBLIC_CALENDLY_BRAND_CHECK ?? DEFAULT_CALENDLY,
  processDiscovery:
    process.env.NEXT_PUBLIC_CALENDLY_PROCESS_DISCOVERY ?? DEFAULT_CALENDLY,
} as const;
