import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/api/auth/google/callback',
        destination: '/callback?provider=google',
        permanent: false,
      },
      {
        source: '/api/auth/github/callback',
        destination: '/callback?provider=github',
        permanent: false,
      }
    ];
  },
  experimental: {},
  turbopack: {
    root: "C:\\Users\\Vishwajeet Singh\\jira",
  },
};

export default nextConfig;
