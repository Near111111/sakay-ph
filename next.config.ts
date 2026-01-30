import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [100, 75], // Add quality 100 to supported qualities
  },
};

export default nextConfig;
