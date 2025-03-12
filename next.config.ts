// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove or comment out the following line:
  // output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
