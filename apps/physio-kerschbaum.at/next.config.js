// @ts-check
import { withPigment } from '@pigment-css/nextjs-plugin';

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
};

nextConfig = withPigment(nextConfig, {
  /**
   * see {@link https://github.com/callstack/linaria/blob/10302654006e414bfb52e3b4f07773d71b483abe/docs/CONFIGURATION.md} which also applies to Pigment CSS (uses also @wyw-in-js under-the-hood)
   */
  classNameSlug: (hash, title, args) => {
    let titleToUse;
    if (title === 'className') {
      /* this is the case when the result of a `css` function call is directly assigned to a `className` JSX prop */
      titleToUse = 'INLINE';
    } else {
      titleToUse = title;
    }
    return process.env.NODE_ENV === 'production'
      ? hash
      : `${args.file.substring(0, args.file.length - args.ext.length)}_${titleToUse}_${hash}`;
  },
});

export default nextConfig;
