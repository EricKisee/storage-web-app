import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {
        protocol:'https',
        hostname:'media.istockphoto.com'
      },
      {
        protocol:'https',
        hostname:'cloud.appwrite.io'
      },
    ]
  }
};

export default nextConfig;
