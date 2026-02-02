import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rotashowcase-public-uploads.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  // Enable static export if needed for static hosting
  // output: 'export',
};

export default nextConfig;
