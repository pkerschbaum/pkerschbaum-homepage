import { css } from '@pigment-css/react';
import React from 'react';

export const HeaderNavBackgroundImage: React.FC = () => {
  return (
    <div
      className={css`
        position: absolute;
        inset: 0;
        background-color: var(--color-bg);
        opacity: 0;
        transition: opacity 200ms;

        :root[data-is-scrolled='true'] & {
          box-shadow: var(--shadow-elevation-medium);
          opacity: 1;
        }
      `}
    />
  );
};
