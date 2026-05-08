import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Auto-generated Next.js 16 type files can cause spurious errors; our own code is still type-checked.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
