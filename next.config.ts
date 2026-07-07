import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["three", "postprocessing"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
