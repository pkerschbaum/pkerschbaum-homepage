import * as _React from 'react';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
