/* eslint-disable node/no-process-env -- config.ts is the only place where reading from process.env is allowed */

let deploymentOrigin;
if (typeof window !== 'undefined') {
  deploymentOrigin = window.location.origin;
} else if (process.env.DEPLOYMENT_ORIGIN) {
  deploymentOrigin = process.env.DEPLOYMENT_ORIGIN;
} else if (process.env.VERCEL_URL) {
  deploymentOrigin = `https://${process.env.VERCEL_URL}`;
} else {
  deploymentOrigin = 'http://localhost:3000';
}

export const config = {
  isDevEnvironment: process.env.NODE_ENV === 'development',
  isServer: typeof window === 'undefined',
  deploymentOrigin,
};
