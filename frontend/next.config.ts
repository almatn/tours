import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'standalone',
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'elguide.buybuy.kg',
        pathname: '/strapi/uploads/**',
      },
    ],
  },
};

export default nextConfig;
