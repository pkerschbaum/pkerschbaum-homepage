import { css } from '@pigment-css/react';

export const commonStyles = {
  /**
   * based on https://www.joshwcomeau.com/snippets/react-components/visually-hidden/
   */
  visuallyHidden: css`
    position: absolute;
    display: inline-block;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    border: 0;
    clip: rect(0 0 0 0);
  `,
};
