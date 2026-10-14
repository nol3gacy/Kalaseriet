import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — everything dynamic (Stripe checkout, webhook,
  // download links, session lookup) moved to a separate Cloudflare Worker.
  // See worker/ and lib/api-base.ts.
  output: "export",
};

export default nextConfig;
