import styled from 'styled-components';

/**
 * https://css-tricks.com/full-bleed/
 */
export const FullBleedWrapper = styled.div`
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
`;
