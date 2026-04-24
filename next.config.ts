import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      { source: "/websites", destination: "/#foundation", permanent: false },
      { source: "/graphic-design", destination: "/#foundation", permanent: false },
      { source: "/automation", destination: "/#automation", permanent: false },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
