import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // for Google profile images
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // for your local Django media server
        port: '8008', // optional but good for clarity
      },
      {
        protocol: 'https',
        hostname: "ytecommerceapi2025-production.up.railway.app",
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;