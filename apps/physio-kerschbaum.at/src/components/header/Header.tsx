import { css } from '@pigment-css/react';
import type React from 'react';

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header
      className={css`
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: 1;

        flex-shrink: 0;
        align-self: stretch;

        background-color: var(--color-quaternary);
      `}
    >
      <div
        className={css`
          display: flex;
          gap: calc(4 * var(--spacing-base));
          align-items: center;
          justify-content: space-between;

          max-width: var(--app-max-width);
          padding-block-start: var(--spacing-base);
          padding-inline: var(--app-padding-inline);
          margin: 0 auto;

          overflow: hidden;

          & > * {
            padding-block-start: calc(1 * var(--spacing-base));
            padding-block-end: calc(2 * var(--spacing-base));
          }
        `}
      >
        {children}
      </div>
    </header>
  );
};
