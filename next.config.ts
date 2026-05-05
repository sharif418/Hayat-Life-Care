import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hayatlifecare.ailearnersbd.com',
          },
        ],
        destination: 'https://hayatlifecare.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
