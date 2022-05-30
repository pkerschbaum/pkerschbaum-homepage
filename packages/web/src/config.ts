/* eslint-disable node/no-process-env -- config.ts is the only place where reading from process.env is allowed */

export const config = {
  isDevEnvironment: process.env.NODE_ENV === 'development',
  isServer: typeof window === 'undefined',
};
