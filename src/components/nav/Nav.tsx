import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

import { nameHeadingStyles } from '~/components/introduction';

export const Nav: React.FC = () => {
  return (
    <NavContainer>
      <Link href="/" passHref>
        <NavHomeLink>Patrick Kerschbaum</NavHomeLink>
      </Link>

      <SubNavContainer>
        <Link href="/blog" passHref>
          <NavLink>Blog</NavLink>
        </Link>
        <Link href="/projects" passHref>
          <NavLink>Projects</NavLink>
        </Link>
        <Link href="/resume" passHref>
          <NavLink>Resume</NavLink>
        </Link>
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

const NavLink = styled.a`
  color: inherit;
  font-size: var(--font-size-lg);
  text-decoration: none;

  &:hover {
    text-decoration: revert;
  }
`;

const NavHomeLink = styled(NavLink)`
  width: min-content;

  line-height: 1;
  ${nameHeadingStyles}
`;
