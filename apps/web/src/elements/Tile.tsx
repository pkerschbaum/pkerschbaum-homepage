import { styled } from '@pigment-css/react';

import { Anchor } from '#pkg/elements/Anchor.jsx';

export const TileAnchor = styled(Anchor)`
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`;

export const Tile = styled.article`
  height: 100%;

  /* hide overflow to "apply" box-shadow to children */
  overflow: hidden;
  color: inherit;
  border: 1px solid var(--color-fg);
  border-radius: 12px;
  box-shadow: var(--shadow-style);

  transition:
    box-shadow 0.3s ease,
    background 200ms;
  will-change: transition;

  &:hover {
    background-color: var(--color-bg-interactive);
    box-shadow: var(--shadow-style-elevation);
  }
`;

export const TileContent = styled.div`
  gap: calc(0.5 * var(--spacing-base));
  padding: calc(2 * var(--spacing-base));
`;

export const Title = styled.h3`
  margin-block: 0;
`;

export const Description = styled.p`
  flex-grow: 1;

  text-align: justify;
`;
