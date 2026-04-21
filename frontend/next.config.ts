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
        {
        protocol: 'http',
        hostname: 'strapi',
        port: '1337',
        pathname: '/uploads/**',
      },        {
        protocol: 'http',
        hostname: 'strapi',
        port: '1337',
        pathname: '/strapi/uploads/**',
      },
    ],
  },
};

export default nextConfig;
