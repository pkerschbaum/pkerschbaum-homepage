import type React from 'react';
import styled from 'styled-components';

import { CLASSNAME_PINNED, HeaderContainer } from '~/components/header';
import { nameHeadingStyles } from '~/components/introduction';
import { Anchor } from '~/elements';

export const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavHomeAnchor href="/">Patrick Kerschbaum</NavHomeAnchor>

      <SubNavContainer>
        <NavAnchor href="/blog">Blog</NavAnchor>
        <NavAnchor href="/projects">Projects</NavAnchor>
        <NavAnchor href="/resume">Resume</NavAnchor>
      </SubNavContainer>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  --nav-column-gap: calc(3 * var(--spacing-base));
  column-gap: var(--nav-column-gap);
  row-gap: calc(1 * var(--spacing-base));
`;

const SubNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--nav-column-gap);
`;

const NavAnchor = styled(Anchor)`
  color: inherit;
  font-size: var(--font-size-xl);
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: revert;
  }
`;

const NavHomeAnchor = styled(NavAnchor)`
  --nav-home-anchor-width: 180px;
  width: var(--nav-home-anchor-width);

  line-height: 1;
  ${nameHeadingStyles}

  /* animate home anchor out to the left if header is pinned */
  transition: margin-inline-start 200ms;
  margin-inline-start: 0px;
  ${HeaderContainer}.${CLASSNAME_PINNED} & {
    margin-inline-start: calc(-1 * (var(--nav-column-gap) + var(--nav-home-anchor-width)));
  }
`;
