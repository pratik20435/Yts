import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.yts.mx" },
      { protocol: "https", hostname: "yts.mx" },
      { protocol: "https", hostname: "movies-api.accel.li" },
      { protocol: "https", hostname: "yts.bz" },
      { protocol: "https", hostname: "**.yts.mx" },
    ],
  },
};

export default nextConfig;
