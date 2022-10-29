import path from 'path';
import url from 'url';

import remoteRefresh from 'next-remote-refresh';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const withRemoteRefresh = remoteRefresh({
  paths: [path.resolve(__dirname, 'src', 'posts')],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
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

  /* 
    "puppeteer" has some dependencies on Node.js built-ins (like "fs").
    We add fallbacks for those plugins so that the application will compile (https://stackoverflow.com/a/70995196/1700319)
   */
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,

      /* puppeteer-core */
      fs: false,
      net: false,
      readline: false,
      child_process: false,
      tls: false,

      /* puppeteer */
      module: false,
      'utf-8-validate': false,
      bufferutil: false,
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
        destination:
          'https://plausible.io/js/script.hash.outbound-links.file-downloads.exclusions.js',
      },
      {
        source: '/p.io/api/event',
        destination: 'https://plausible.io/api/event',
      },
    ];
  },
};

export default withRemoteRefresh(nextConfig);
