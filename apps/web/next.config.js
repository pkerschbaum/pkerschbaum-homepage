import path from 'path';
import url from 'url';

import remoteRefresh from 'next-remote-refresh';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const withRemoteRefresh = remoteRefresh({
  paths: [path.resolve(__dirname, 'src', 'writing')],
});

/** @type {import('next').NextConfig} */
let nextConfig = {
  distDir: 'dist',
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },

  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },

  typescript: {
    tsconfigPath: './tsconfig.project.json',
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
        source: '/p.io/js/script.hash.outbound-links.file-downloads.exclusions.js',
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
};

nextConfig = await withRemoteRefresh(nextConfig);

export default nextConfig;
