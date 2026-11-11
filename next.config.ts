import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // The old per-offer page was folded into the homepage's single offer.
  async redirects() {
    return [{ source: "/efficiency-engine", destination: "/#offer", permanent: false }];
  },
};

export default nextConfig;
