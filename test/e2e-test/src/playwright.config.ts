/* eslint-disable n/no-process-env */

import { defineConfig, devices } from '@playwright/test';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  testDir: './',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
