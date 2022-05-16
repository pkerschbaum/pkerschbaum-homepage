import { createGlobalStyle, css } from 'styled-components';

const appGlobalStyle = css`
  /* change scrollbar to a thin variant which lightens up on hover */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 1000px;
    background-color: var(--color-fg-grey);
    border: 2px solid var(--color-fg-grey);
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-fg-darkgrey);
    border: 2px solid var(--color-fg-darkgrey);
  }
  ::-webkit-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0);
  }

  html {
    font-family: sans-serif;

    /* design tokens */
    --color-fg: black;
    --color-fg-darkgrey: hsl(0 0% 45%);
    --color-fg-grey: hsl(0 0% 65%);
    --color-fg-lightgrey: hsl(0 0% 85%);
    --color-fg-teal: hsl(180 70% 45%);
    --color-fg-lightteal: hsl(180 100% 29%);
    --color-fg-emphasized: var(--color-fg-lightteal);
    --color-bg-emphasized: var(--color-fg-lightgrey);
    --color-fg-less-emphasized: var(--color-fg-darkgrey);
    --font-size-sm: 0.875rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-xxl: 1.5rem;
    --font-weight-bold: 700;
    --spacing-base: 8px;
    --box-width-medium: 800px;

    /* https://www.joshwcomeau.com/shadow-palette/ */
    --shadow-color: 0deg 0% 63%;
    --shadow-elevation-low: 0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0),
      0.2px 0.4px 0.7px hsl(var(--shadow-color) / 0.23),
      0.4px 0.8px 1.3px hsl(var(--shadow-color) / 0.46);
    --shadow-elevation-medium: 0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0),
      0.5px 1px 1.7px hsl(var(--shadow-color) / 0.18),
      1.1px 2px 3.4px hsl(var(--shadow-color) / 0.36),
      2.2px 4.1px 7px hsl(var(--shadow-color) / 0.54);
    --shadow-elevation-high: 0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0),
      1.1px 2.1px 3.6px hsl(var(--shadow-color) / 0.08),
      2px 3.7px 6.3px hsl(var(--shadow-color) / 0.17),
      2.9px 5.5px 9.3px hsl(var(--shadow-color) / 0.25),
      4.1px 7.6px 13px hsl(var(--shadow-color) / 0.34),
      5.7px 10.6px 18.1px hsl(var(--shadow-color) / 0.42),
      7.8px 14.7px 25px hsl(var(--shadow-color) / 0.5),
      10.8px 20.3px 34.5px hsl(var(--shadow-color) / 0.59);
  }

  #__next {
    overflow-y: scroll;
    font-family: 'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  ul {
    padding: 0;
  }
  ul li,
  ul ul li {
    text-indent: 0;
    list-style-type: none;
  }

  a {
    color: var(--color-fg);
  }
  a:visited {
    color: var(--color-fg);
  }
  a:hover {
    color: var(--color-fg-emphasized);
  }

  p {
    font-size: var(--font-size-lg);
  }

  h3 {
    font-size: var(--font-size-xl);
  }
`;

export const AppGlobalStyle = createGlobalStyle`
  ${appGlobalStyle}
`;
