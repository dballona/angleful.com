// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const sentryConfig = {
  dsn: 'https://2d9b181961b3faf0ab00dbf8e68d39f6@o4506657226293248.ingest.sentry.io/4506657228783616',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
};

if (process.env.NODE_ENV === 'production') Sentry.init(sentryConfig);
