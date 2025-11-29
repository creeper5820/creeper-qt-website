import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'r2.creeper5820.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
