import type React from 'react';
import styled, { keyframes } from 'styled-components';

import { Favicon } from '~/components/favicon';
import { CLASSNAME_NOT_SCROLLED, CLASSNAME_SCROLLED, HeaderContainer } from '~/components/header';
import { nameHeadingStyles } from '~/components/introduction';
import { Anchor } from '~/elements';

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

const slideLeft = keyframes`
  0% {
    transform: translateX(0%);
  }
  50% {
    transform: translateX(-100%);
  }
  50.1% {
    transform: translateX(-100%);
    display: none;
  }
  100% {
    transform: translateX(-100%);
    display: none;
  }
`;
const slideRight = keyframes`
  0% {
    transform: translateX(-100%);
    display: none;
  }
  0.1% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(0%);
  }
`;
const NavHomeAnchor = styled(NavAnchor)`
  display: grid;
  grid-template: 'container';

  line-height: 1;
  ${nameHeadingStyles}

  transition: width 400ms;
  width: 180px;
  ${HeaderContainer}.${CLASSNAME_SCROLLED} & {
    width: 40px;
  }

  & > * {
    grid-area: container;

    animation-name: ${slideRight};
    animation-duration: 400ms;
    animation-fill-mode: both;
  }
`;

const NavHomeAnchorText = styled.div`
  ${HeaderContainer}.${CLASSNAME_SCROLLED} & {
    animation-name: ${slideLeft};
  }
`;

const NavHomeAnchorLogo = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;

  ${HeaderContainer}.${CLASSNAME_NOT_SCROLLED} & {
    animation-name: ${slideLeft};
  }
`;
