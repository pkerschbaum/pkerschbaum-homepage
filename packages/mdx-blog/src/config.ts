/* eslint-disable n/no-process-env -- config.ts is the only place where reading from process.env is allowed */
/* eslint-disable unicorn/prefer-global-this -- this file is consumed by the web app and access to "windows" explicitely is on purpose */

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
  deploymentOrigin,
};
