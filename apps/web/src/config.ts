/* eslint-disable n/no-process-env -- config.ts is the only place where reading from process.env is allowed */

let deploymentOrigin;
if (typeof window !== 'undefined') {
  deploymentOrigin = new URL(window.location.origin);
} else if (process.env['DEPLOYMENT_ORIGIN']) {
  deploymentOrigin = new URL(process.env['DEPLOYMENT_ORIGIN']);
} else if (process.env['VERCEL_URL']) {
  deploymentOrigin = new URL(`https://${process.env['VERCEL_URL']}`);
} else {
  deploymentOrigin = new URL('http://localhost:3000');
}

const isDevEnvironment = process.env.NODE_ENV === 'development';
export const config = {
  isDevEnvironment,
  isServer: typeof window === 'undefined',
  nextRuntime: process.env['NEXT_RUNTIME'],
  deploymentOrigin,
  featureFlags: {
    projects: isDevEnvironment,
  },
  socialMediaLinks: {
    linkedIn: 'https://www.linkedin.com/in/pkerschbaum',
  },
  canonicalTLDPlus1: 'pkerschbaum.com',
};
