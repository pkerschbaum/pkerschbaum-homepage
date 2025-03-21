import { styled } from '@pigment-css/react';

/**
 * https://css-tricks.com/full-bleed/
 */
export const FullBleedWrapper = styled.div`
  position: relative;
  right: 50%;
  left: 50%;
  width: 100vw;
  margin-right: -50vw;
  margin-left: -50vw;
`;
