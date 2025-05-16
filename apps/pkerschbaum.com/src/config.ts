/* eslint-disable n/no-process-env -- configs are the only place where reading from process.env is allowed */

import { config as MDXBlogConfig } from '@pkerschbaum-homepage/mdx-blog/config';

const isDevEnvironment = process.env.NODE_ENV === 'development';
export const config = {
  isDevEnvironment,
  isServer: typeof window === 'undefined',
  nextRuntime: process.env['NEXT_RUNTIME'],
  deploymentOrigin: MDXBlogConfig.deploymentOrigin,
  socialMedia: {
    handles: {
      gitHub: 'pkerschbaum',
      linkedIn: 'pkerschbaum',
      bsky: 'pkerschbaum.com',
    },
  },
  canonicalTLDPlus1: 'pkerschbaum.com',
};
