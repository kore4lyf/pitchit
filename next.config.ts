import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        // You can specify port and pathname patterns if needed
        // port: '',
        // pathname: '/**',
      },
    ],
  },
  experimental: {
    ppr: "incremental",
    after: true
  },
  devIndicators: { // This will help us visualize what is happening with PPR
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right"
  }
};

export default nextConfig;
