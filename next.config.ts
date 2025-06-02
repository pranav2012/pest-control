import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// Wrap your Next.js config with the bundle analyzer
const nextConfig: NextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "alphabeneficentcare.com",
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  staticPageGenerationTimeout: 120,
});

export default nextConfig;
