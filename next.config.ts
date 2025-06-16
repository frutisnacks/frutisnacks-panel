import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "alipio-ponce-server-img-production.up.railway.app",
    ],
  },
};

export default nextConfig;
