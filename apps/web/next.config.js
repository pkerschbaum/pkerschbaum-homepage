// @ts-check
import createMDX from '@next/mdx';
import { withPigment } from '@pigment-css/nextjs-plugin';

import { createMdxOptions } from '@pkerschbaum-homepage/mdx/mdx';

/** @type {import('next').NextConfig} */
let nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,

  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },

  typescript: {
    tsconfigPath: './tsconfig.next.json',
    ignoreBuildErrors: true,
  },

  webpack(config) {
    // moduleResolution: node16 support for Next.js (https://github.com/vercel/next.js/discussions/41189#discussioncomment-4026895)
    config.resolve.extensionAlias = {
      ...config.resolve.extensionAlias,
      '.js': ['.js', '.ts'],
      '.jsx': ['.jsx', '.tsx'],
    };
    return config;
  },

  async rewrites() {
    /*
     * https://plausible.io/docs/proxy/guides/nextjs#step-1-add-url-rewrite-rules
     * avoid using "plausible" in the source path (use "p.io" instead) because otherwise it could get blocked by adblockers
     */
    return [
      {
        source: '/p.io/js/script.js',
        destination: 'https://analytics.pkerschbaum.com/js/script.js',
      },
      {
        source: '/p.io/api/event',
        destination: 'https://analytics.pkerschbaum.com/api/event',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/tidbits/wsl-web-dev-setup',
        destination: '/tidbits/wsl-and-ubuntu-web-dev-setup',
        permanent: true,
      },
    ];
  },

  // include .md and .mdx files, see https://nextjs.org/docs/app/building-your-application/configuring/mdx#configure-nextconfigmjs
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: createMdxOptions({ collectedHrefs: [], collectedHeadings: [] }),
});

nextConfig = withMDX(nextConfig);

nextConfig = withPigment(nextConfig);

export default nextConfig;
