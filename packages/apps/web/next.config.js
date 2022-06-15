const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withRemoteRefresh = require('next-remote-refresh')({
  paths: [path.resolve(__dirname, 'src', 'posts')],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 60,

  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },

  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },

  typescript: {
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
};

module.exports = withRemoteRefresh(nextConfig);
