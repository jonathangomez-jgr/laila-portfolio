import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @react-pdf/renderer requires node runtime + externalization to work on Vercel.
  // Without this, bundling tries to resolve node-only deps (fs, path) in the browser edge.
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
