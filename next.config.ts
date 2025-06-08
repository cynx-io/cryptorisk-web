import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://coin-images.coingecko.com/**")],
  },
};

export default nextConfig;
