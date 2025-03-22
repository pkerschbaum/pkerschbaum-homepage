import { css } from '@pigment-css/react';
import type React from 'react';

import { HeaderNavBackgroundImage } from '#pkg/components/header-nav/HeaderNavBackgroundImage.jsx';
import { OpenSidenavButton } from '#pkg/components/sidenav/index.js';

export const HeaderNav: React.FC = () => {
  return (
    <>
      <div
        className={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: var(--menu-button-size);

          --menu-button-size: 40px;

          & > * {
            isolation: isolate;
          }
        `}
      >
        <HeaderNavBackgroundImage />
        <OpenSidenavButton />
        <div
          className={css`
            width: var(--menu-button-size);
            height: var(--menu-button-size);
          `}
        />
      </div>
    </>
  );
};
