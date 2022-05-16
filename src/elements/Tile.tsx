import styled from 'styled-components';

import { Anchor } from '~/elements/Anchor';

export const TileAnchor = styled(Anchor)`
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`;

export const Tile = styled.article`
  height: 100%;

  color: inherit;
  border: 1px solid lightgrey;
  border-radius: 4px;
  /* hide overflow to "apply" box-shadow to children */
  overflow: hidden;

  transition: box-shadow 0.3s ease, border 0.3s ease;
  will-change: transition;

  &:hover {
    border: 1px solid transparent;
    box-shadow: var(--shadow-elevation-medium);
  }
`;

export const TileContent = styled.div`
  padding: calc(2 * var(--spacing-base));
  gap: calc(0.5 * var(--spacing-base));
`;

export const Title = styled.h3``;

export const Description = styled.p`
  flex-grow: 1;

  text-align: justify;
`;
