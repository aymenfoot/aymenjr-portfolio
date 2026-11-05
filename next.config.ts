import type { NextConfig } from "next";

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";

const nextConfig: NextConfig = {
  assetPrefix: assetPrefix || undefined,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
