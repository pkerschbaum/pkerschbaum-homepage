import * as React from 'react';
import styled from 'styled-components';

import { Favicon } from '#/components/favicon';
import { config } from '#/config';
import { Animations, DataAttribute, IsScrolled } from '#/constants';
import { Anchor } from '#/elements';

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
        <NavAnchor href="/notes">Notes</NavAnchor>
        {config.featureFlags.projects && <NavAnchor href="/projects">Projects</NavAnchor>}
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
  font-size: var(--font-size-xl);
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
    text-decoration: revert;
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

    animation-name: ${Animations.SLIDE_RIGHT};
    animation-duration: var(--animation-duration);
    animation-fill-mode: both;
  }
`;

const NavHomeAnchorText = styled.div`
  *:root[${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}'] & {
    animation-name: ${Animations.SLIDE_LEFT};
  }
`;

const NavHomeAnchorLogo = styled.div`
  display: flex;
  align-items: center;

  width: fit-content;

  *:root:not([${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}']) & {
    animation-name: ${Animations.SLIDE_LEFT};
  }
`;
