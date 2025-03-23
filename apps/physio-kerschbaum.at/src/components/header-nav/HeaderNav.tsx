import { css } from '@pigment-css/react';
import type React from 'react';

import { headingIds } from '#pkg/app/page-constants.js';
import logo from '#pkg/assets/logo.png';
import { OpenSidenavButton } from '#pkg/components/sidenav/index.js';
import { Anchor } from '#pkg/elements/Anchor.jsx';
import { Image } from '#pkg/elements/Image.jsx';

const LOGO_HEIGHT = 32;

export const HeaderNav: React.FC = () => {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        justify-content: space-between;

        width: 100%;

        font-size: var(--menu-button-size);

        --menu-button-size: ${LOGO_HEIGHT}px;

        & > * {
          isolation: isolate;
        }
      `}
    >
      <div
        className={css`
          width: var(--menu-button-size);
          height: var(--menu-button-size);
        `}
      />
      <Anchor href={`/#${headingIds.welcome}`}>
        <Image src={logo} alt="" height={LOGO_HEIGHT} />
      </Anchor>
      <OpenSidenavButton />
    </div>
  );
};
