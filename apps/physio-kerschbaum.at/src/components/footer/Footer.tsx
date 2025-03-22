import { css } from '@pigment-css/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import type React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      className={css`
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        gap: calc(2 * var(--spacing-base));
        align-items: center;

        padding-block-start: calc(4 * var(--spacing-base));
      `}
    >
      <div
        className={css`
          display: flex;
          gap: calc(1 * var(--spacing-base));
          align-items: center;
          justify-content: center;
        `}
      >
        <span>{dayjs().year()}</span>
        <span>-</span>
        <Link href="/">Jasmin Kerschbaum</Link>
      </div>
    </footer>
  );
};
