import styled from 'styled-components';

export const TileAnchor = styled.a`
  color: var(--color-fg);
  text-decoration: none;
`;

export const Tile = styled.article`
  height: 100%;

  color: inherit;
  border-radius: 4px;
  box-shadow: var(--shadow-elevation-medium);
  /* hide overflow to "apply" box-shadow to children */
  overflow: hidden;

  transition: box-shadow 0.3s ease;
  will-change: transition;

  &:hover {
    box-shadow: var(--shadow-elevation-high);
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
