import { styled } from '@pigment-css/react';
import type React from 'react';

import { headingIds } from '#pkg/app/page-constants.js';
import { SidenavAnchor } from '#pkg/components/sidenav/SidenavAnchor.jsx';

export const Nav: React.FC = () => {
  return (
    <NavContainer>
      <NavElementsContainer>
        <li>
          <NavAnchor href={`/#${headingIds.welcome}`}>Willkommen</NavAnchor>
        </li>
        <li>
          <NavAnchor href={`/#${headingIds.ueberMich}`}>Über Mich</NavAnchor>
        </li>
        <li>
          <NavAnchor href={`/#${headingIds.derWegZurPhysiotherapie}`}>
            Der Weg zur Physiotherapie
          </NavAnchor>
        </li>
        <li>
          <NavAnchor href={`/#${headingIds.leistungen}`}>Leistungen</NavAnchor>
        </li>
        <li>
          <NavAnchor href={`/#${headingIds.standortKontakt}`}>Standort & Kontakt</NavAnchor>
        </li>
      </NavElementsContainer>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  --nav-column-gap: calc(3 * var(--spacing-base));
  --nav-elements-gap: calc(1 * var(--spacing-base));

  display: flex;
  flex-direction: column;
  row-gap: calc(2 * var(--spacing-base));
  column-gap: var(--nav-column-gap);
  align-items: flex-start;

  width: 100%;
  padding-block: var(--app-padding-block);
  padding-inline: var(--app-padding-inline);
  margin: 0 auto;

  font-size: var(--font-size-lg);
`;

const NavElementsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  row-gap: var(--nav-elements-gap);
  column-gap: var(--nav-column-gap);
  align-items: flex-start;

  padding: 0;
  margin: 0;

  list-style-type: none;
`;

const NavAnchor = styled(SidenavAnchor)`
  display: flex;
  flex-shrink: 0;
  gap: calc(1 * var(--spacing-base));
  align-items: center;

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
