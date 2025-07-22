import { WHITELIST } from "@/lib/constants/metadata";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      new URL(WHITELIST.AWS_S3),
      new URL(WHITELIST.AWS_CLOUDFRONT),
    ],
  },
};

export default nextConfig;
