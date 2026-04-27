import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'elguide.buybuy.kg',
            pathname: '/uploads/**',
          },
          {
              protocol: 'http',
              hostname: 'localhost',
              pathname: '/uploads/**',
          },
        ],
        },
        async rewrites() {
            return [
                {
                    source: '/uploads/:path*',
                    destination: 'http://nginx/uploads/:path*',
                },
            ];
        },
};

export default nextConfig;
