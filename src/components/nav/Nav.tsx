import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

export const Nav: React.FC = () => {
  return (
    <NavContainer>
      <Link href="/" passHref>
        <NavHomeLink>Patrick Kerschbaum</NavHomeLink>
      </Link>
      <Link href="/blog" passHref>
        <NavLink>Blog</NavLink>
      </Link>
      <Link href="/projects" passHref>
        <NavLink>Projects</NavLink>
      </Link>
      <Link href="/resume" passHref>
        <NavLink>Resume</NavLink>
      </Link>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: baseline;
  gap: calc(1 * var(--spacing-base));
`;

const NavLink = styled.a``;

const NavHomeLink = styled(NavLink)`
  margin-inline-end: calc(1 * var(--spacing-base));
  font-size: var(--font-size-xl);
`;
