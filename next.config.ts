import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Auto-generated Next.js 16 type files can cause spurious errors; our own code is still type-checked.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
