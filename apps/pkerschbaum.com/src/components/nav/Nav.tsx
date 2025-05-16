import { styled } from '@pigment-css/react';
import type React from 'react';
import { PenTool } from 'react-feather';

import { headingIds } from '#pkg/app/heading-ids.js';
import { Favicon } from '#pkg/components/favicon/index.js';
import { Cookie } from '#pkg/components/icon-library/index.js';
import { DataAttribute, IsScrolled } from '#pkg/constants-browser.js';
import { Anchor } from '#pkg/elements/index.js';

export const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavHomeAnchor href="/">
        <NavHomeAnchorText>Patrick Kerschbaum</NavHomeAnchorText>
        <NavHomeAnchorLogo>
          <Favicon width={36} height={36} />
        </NavHomeAnchorLogo>
      </NavHomeAnchor>

      <SubNavContainer>
        <NavAnchor href={`/#${headingIds.blog}`}>
          <PenTool size="1em" />
          Blog
        </NavAnchor>
        <NavAnchor href={`/#${headingIds.tidbits}`}>
          <Cookie size="1em" />
          Tidbits
        </NavAnchor>
      </SubNavContainer>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  --nav-column-gap: calc(3 * var(--spacing-base));

  display: flex;
  flex-wrap: wrap;
  row-gap: calc(1 * var(--spacing-base));
  column-gap: var(--nav-column-gap);
  align-items: center;
`;

const SubNavContainer = styled.div`
  display: flex;
  gap: var(--nav-column-gap);
  align-items: center;
`;

const NavAnchor = styled(Anchor)`
  display: flex;
  flex-shrink: 0;
  gap: calc(1 * var(--spacing-base));
  align-items: center;

  font-size: var(--font-size-xl);
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: revert;
  }

  & > *:nth-child(1) {
    flex-shrink: 0;
  }
`;

const NavHomeAnchor = styled(NavAnchor)`
  --animation-duration: 400ms;

  display: grid;
  grid-template-areas: 'container';

  width: 180px;

  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  text-transform: uppercase;

  transition: width var(--animation-duration);
  *:root[${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}'] & {
    width: 40px;
  }

  & > * {
    grid-area: container;

    animation-name: var(--animation-slide-right);
    animation-duration: var(--animation-duration);
    animation-fill-mode: both;
  }
`;

const NavHomeAnchorText = styled.div`
  *:root[${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}'] & {
    animation-name: var(--animation-slide-left);
  }
`;

const NavHomeAnchorLogo = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;

  *:root:not([${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}']) & {
    animation-name: var(--animation-slide-left);
  }
`;
