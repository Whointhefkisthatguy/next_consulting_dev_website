import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Proxy the CAN-SPAM unsubscribe endpoint to the lead-engine app on the
  // VM-hosted subdomain. Prospect sees https://nextconsulting.dev/unsubscribe/...
  // in every outbound footer (clean brand), request lands on the real route
  // handler at nle.nextconsulting.dev. Mask preserves the URL in the address
  // bar per Next.js rewrite semantics.
  async rewrites() {
    return [
      {
        source: "/unsubscribe/:token",
        destination: "https://nle.nextconsulting.dev/unsubscribe/:token",
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
