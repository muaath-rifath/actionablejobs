import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.glassdoor.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'd2q79iu7y748jz.cloudfront.net',
                pathname: '/**',
            },
            // Add any other image domains you need
            {
                protocol: 'https',
                hostname: 'linkedin.com',
                pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'media-exp1.licdn.com',
              pathname: '/**',
            },
            {
              protocol: 'https',
              hostname: 'media.licdn.com',
              pathname: '/**',
            }
            
        ],
  },
  /* config options here */
};

export default nextConfig;
