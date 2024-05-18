'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import React from 'react';

const GlobalError: React.FC<{ error: Error & { digest?: string }; reset: () => void }> = ({
  error,
  reset,
}) => {
  React.useEffect(
    function captureErrorViaSenty() {
      Sentry.captureException(error);
    },
    [error],
  );

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
