/* eslint-disable n/no-process-env -- config.ts is the only place where reading from process.env is allowed */

const isDevEnvironment = process.env.NODE_ENV === 'development';

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

export const config = {
  isDevEnvironment,
  isServer: typeof window === 'undefined',
  nextRuntime: process.env['NEXT_RUNTIME'],
  deploymentOrigin,
  canonicalTLDPlus1: 'physio-kerschbaum.at',
};
