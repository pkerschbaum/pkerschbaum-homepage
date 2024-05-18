// @ts-check
import createMDX from '@next/mdx';
import withLinaria from 'next-with-linaria';
import { withSentryConfig } from '@sentry/nextjs';

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

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webmention.io',
        port: '',
        pathname: '/avatar/**',
      },
    ],
  },

  // include .md and .mdx files, see https://nextjs.org/docs/app/building-your-application/configuring/mdx#configure-nextconfigmjs
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: createMdxOptions({ collectedHrefs: [], collectedHeadings: [] }),
});

nextConfig = withMDX(nextConfig);

nextConfig = withLinaria(nextConfig);

nextConfig = /** @type {import('next').NextConfig} */ (
  withSentryConfig(
    nextConfig,
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      org: 'patrick-kerschbaum',
      project: 'pkerschbaum-homepage',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,

      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: false,

      // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
      // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
      // side errors will fail.
      tunnelRoute: '/monitoring',

      // Hides source maps from generated client bundles
      hideSourceMaps: true,

      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,

      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  )
);

export default nextConfig;
