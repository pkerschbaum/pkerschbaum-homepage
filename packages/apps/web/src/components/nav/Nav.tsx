import Image from 'next/image';
import type React from 'react';
import styled, { keyframes } from 'styled-components';

import { CLASSNAME_NOT_SCROLLED, CLASSNAME_SCROLLED, HeaderContainer } from '~/components/header';
import { nameHeadingStyles } from '~/components/introduction';
import { ColorTheme, DataAttribute } from '~/constants';
import { Anchor } from '~/elements';

export const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavHomeAnchor href="/">
        <NavHomeAnchorText>Patrick Kerschbaum</NavHomeAnchorText>
        <NavHomeAnchorLogo>
          <Image src="/favicons/favicon.svg" height={36} width={36} alt="Logo" />
          <Image src="/favicons/favicon-dark.svg" height={36} width={36} alt="Logo" />
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
    transform: translateY(0%);
  }
  49.9% {
    margin-inline-start: calc(-1 * (var(--nav-column-gap) + var(--nav-home-anchor-width)));
  }
  50% {
    margin-inline-start: calc(-1 * (var(--nav-column-gap) + var(--nav-home-anchor-width)));
  }
  100% {
    margin-inline-start: calc(-1 * (var(--nav-column-gap) + var(--nav-home-anchor-width)));
  }
`;
const slideRight = keyframes`
  0% {
    margin-inline-start: calc(-1 * (var(--nav-column-gap) + var(--nav-home-anchor-width)));
  }
  50% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(0%);
  }
`;
const NavHomeAnchor = styled(NavAnchor)`
  display: grid;
  grid-template: 'container';

  line-height: 1;
  ${nameHeadingStyles}

  & > * {
    grid-area: container;

    width: var(--nav-home-anchor-width);

    animation-name: ${slideRight};
    animation-duration: 400ms;
    animation-fill-mode: both;
  }
`;

const NavHomeAnchorText = styled.div`
  --nav-home-anchor-width: 180px;
  ${HeaderContainer}.${CLASSNAME_SCROLLED} & {
    animation-name: ${slideLeft};
  }
`;

const NavHomeAnchorLogo = styled.div`
  --nav-home-anchor-width: 40px;
  display: flex;

  ${HeaderContainer}.${CLASSNAME_NOT_SCROLLED} & {
    animation-name: ${slideLeft};
  }

  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] && > *:nth-child(1) {
    display: none !important;
  }
  && > *:nth-child(2) {
    display: none !important;
  }
  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] && > *:nth-child(2) {
    display: initial !important;
  }
`;
