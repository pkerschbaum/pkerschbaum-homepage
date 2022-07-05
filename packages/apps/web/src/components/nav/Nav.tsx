import * as React from 'react';
import styled from 'styled-components';

import { Favicon } from '~/components/favicon';
import { config } from '~/config';
import { Animations, DataAttribute, IsScrolled } from '~/constants';
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
        {config.featureFlags.projects && <NavAnchor href="/projects">Projects</NavAnchor>}
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
  display: grid;
  grid-template: 'container';

  line-height: 1;
  font-size: var(--font-size-xxl);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;

  --animation-duration: 400ms;
  transition: width var(--animation-duration);
  width: 180px;
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
  width: fit-content;
  display: flex;
  align-items: center;

  *:root:not([${DataAttribute.IS_SCROLLED}='${IsScrolled.YES}']) & {
    animation-name: ${Animations.SLIDE_LEFT};
  }
`;
