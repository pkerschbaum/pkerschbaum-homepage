import { createGlobalStyle, css } from 'styled-components';

import { ColorTheme, DataAttribute } from '~/constants';

const appGlobalStyle = css`
  * {
    transition: background 200ms;
  }

  /* change scrollbar to a thin variant which lightens up on hover */
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 1000px;
    background-color: var(--color-grey);
    border: 2px solid var(--color-grey);
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-darkgrey);
    border: 2px solid var(--color-darkgrey);
  }
  ::-webkit-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0);
  }

  html {
    font-family: sans-serif;
    color: var(--color-fg);
    background-color: var(--color-bg);

    /* design tokens */
    --color-white: rgb(250, 250, 250); /* https://web.dev/prefers-color-scheme/#avoid-pure-white */
    --color-black-hsl: 225, 6%, 13%;
    --color-black: hsl(var(--color-black-hsl));
    --color-darkgrey: hsl(0 0% 35%);
    --color-grey: hsl(0 0% 65%);
    --color-lightgrey: hsl(0 0% 85%);
    --color-verylightgrey: hsl(0 0% 88%);
    --color-darkteal: hsl(180 100% 25%);
    --color-teal: hsl(180 100% 45%);
    --color-lightteal: hsl(180 100% 29%);
    --color-verylightteal: hsl(180 100% 75%);

    --color-fg-less-emphasized: var(--color-darkgrey);
    --color-bg-emphasized: var(--color-verylightgrey);
    --color-fg-interactive: var(--color-lightteal);
    --color-bg-interactive: var(--color-verylightteal);

    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-xxl: 1.5rem;
    --font-size-xxxl: 1.75rem;
    --font-size-xxxxl: 2rem;
    --font-weight-bold: 700;
    --spacing-base: 8px;
    --box-width-md: 800px;

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

  :root {
    --color-fg: var(--color-black);
    --color-bg: var(--color-white);
    --image-filter: grayscale(0%);
  }

  :root[${DataAttribute.THEME}='${ColorTheme.DARK}'] {
    --color-fg: var(--color-white);
    --color-fg-less-emphasized: var(--color-lightgrey);
    --color-bg: var(--color-black);
    --color-bg-emphasized: var(--color-darkgrey);
    --color-bg-interactive: var(--color-darkteal);
    --shadow-color: var(--color-black-hsl);
    --image-filter: grayscale(20%);
  }

  /* re-colorize and darken photographic images (https://web.dev/prefers-color-scheme/#re-colorize-and-darken-photographic-images) */
  img:not([src*='.svg']) {
    filter: var(--image-filter);
  }

  #__next {
    overflow-y: scroll;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
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
    color: inherit;
  }
  a:visited {
    color: inherit;
  }
  a:hover {
    color: var(--color-fg-interactive);
  }

  /* style buttons */
  button {
    border: none;
    color: inherit;
    background-color: inherit;
  }
  button:hover {
    cursor: pointer;
    color: var(--color-fg-interactive);
  }

  p,
  ul,
  ol {
    font-size: var(--font-size-base);
  }

  h1 {
    font-size: var(--font-size-xxxxl);
  }
  h2 {
    font-size: var(--font-size-xxl);
  }
  h3 {
    font-size: var(--font-size-xl);
  }

  code {
    font-size: var(--font-size-base);
    padding: calc(0.5 * var(--spacing-base)) calc(0.75 * var(--spacing-base));
    border-radius: 4px;
    background-color: var(--color-bg-emphasized);
  }
`;

export const AppGlobalStyle = createGlobalStyle`
  ${appGlobalStyle}
`;