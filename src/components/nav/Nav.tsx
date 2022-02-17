import type React from 'react';
import styled from 'styled-components';

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
  column-gap: calc(4 * var(--spacing-base));
  row-gap: calc(1 * var(--spacing-base));
`;

const SubNavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: calc(3 * var(--spacing-base));
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
  width: min-content;

  line-height: 1;
  ${nameHeadingStyles}
`;
