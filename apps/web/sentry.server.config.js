/*
 * This file configures the initialization of Sentry on the server.
 * The config you add here will be used whenever the server handles a request.
 * https://docs.sentry.io/platforms/javascript/guides/nextjs/
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://bf0911f238f1ae9ee61127230432c0e5@o4507030135373824.ingest.us.sentry.io/4507034283671552',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  /*
   * Uncomment the line below to enable Spotlight (https://spotlightjs.com)
   * spotlight: process.env.NODE_ENV === 'development',
   */
});
