import { css } from 'styled-components';

export const commonStyles = {
  /**
   * based on https://www.joshwcomeau.com/snippets/react-components/visually-hidden/
   */
  visuallyHidden: css`
    display: inline-block;
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  `,
};
