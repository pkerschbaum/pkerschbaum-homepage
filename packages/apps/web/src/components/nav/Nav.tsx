import * as React from 'react';
import styled, { keyframes } from 'styled-components';

import { Favicon } from '~/components/favicon';
import { nameHeadingStyles } from '~/components/introduction';
import { DataAttribute, IsScrolled } from '~/constants';
import { Anchor } from '~/elements';

export const Nav: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <NavContainer>
      <NavHomeAnchor
        href="/"
        style={{
          '--animation-duration': !isMounted ? '0ms' : '400ms',
        }}
      >
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

  transition: width var(--animation-duration);
  width: 180px;
  *:root[${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}'] & {
    width: 40px;
  }

  & > * {
    grid-area: container;

    animation-name: ${slideRight};
    animation-duration: var(--animation-duration);
    animation-fill-mode: both;
  }
`;

const NavHomeAnchorText = styled.div`
  *:root[${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}'] & {
    animation-name: ${slideLeft};
  }
`;

const NavHomeAnchorLogo = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;

  *:root[${DataAttribute.IS_SCROLLED}='${IsScrolled.NO}'] & {
    animation-name: ${slideLeft};
  }
`;
