'use client';

import { createGlobalStyle } from 'styled-components';

import { ColorTheme, DataAttribute } from '#pkg/constants.js';

export const GlobalAppStyles = createGlobalStyle`
  /* change scrollbar to a thin variant which lightens up on hover (on browsers supporting the webkit-pseudo-elements) */
  *:root {
    --color-thumb: var(--color-fg-less-emphasized);
    --color-thumb-hover: var(--color-fg);
    --color-track: transparent;

    scrollbar-color: var(--color-thumb) var(--color-track);
    scrollbar-width: thin;
  }
  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: var(--color-track);
  }
  *::-webkit-scrollbar-thumb {
    background-color: var(--color-thumb);
    border-radius: 1000px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-thumb-hover);
  }
  ::-webkit-scrollbar-corner {
    background-color: var(--color-track);
  }

  *:root {
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: ${17 / 16}rem;
    color: var(--color-fg);
    background-color: var(--color-bg);

    /* design tokens */
    --color-white: rgb(250 250 250); /* https://web.dev/prefers-color-scheme/#avoid-pure-white */
    --color-black-hsl: 225, 6%, 13%;
    --color-black: hsl(var(--color-black-hsl));
    --color-bluegray-hsl: 230, 16%, 17%;
    --color-bluegray: hsl(var(--color-bluegray-hsl));
    --color-darkgrey: hsl(0deg 0% 30%);
    --color-grey: hsl(0deg 0% 65%);
    --color-lightgrey: hsl(0deg 0% 85%);
    --color-verylightgrey: hsl(0deg 0% 88%);
    --color-darkteal: hsl(180deg 100% 25%);
    --color-teal: hsl(180deg 100% 29%);
    --color-lightteal: hsl(180deg 100% 45%);
    --color-verylightteal: hsl(180deg 100% 75%);

    --color-fg: var(--color-black);
    --color-fg-less-emphasized: var(--color-darkgrey);
    --color-fg-interactive: var(--color-teal);
    --color-bg: var(--color-white);
    --color-bg-emphasized: var(--color-verylightgrey);
    --color-bg-interactive: var(--color-verylightteal);

    --font-size-sm: 0.85rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-xxl: 1.5rem;
    --font-size-xxxl: 1.75rem;
    --font-size-xxxxl: 2rem;
    --font-weight-bold: 700;
    --spacing-base: 8px;
    --box-width-lg: 1050px;
    --box-width-md: 800px;
    --box-width-sm: 600px;
    --image-filter: grayscale(0%);

    /* https://www.joshwcomeau.com/shadow-palette/ */
    --shadow-color: 0deg 0% 63%;
    --shadow-elevation-low: 0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0%),
      0.2px 0.4px 0.7px hsl(var(--shadow-color) / 23%),
      0.4px 0.8px 1.3px hsl(var(--shadow-color) / 46%);
    --shadow-elevation-medium: 0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0%),
      0.5px 1px 1.7px hsl(var(--shadow-color) / 18%), 1.1px 2px 3.4px hsl(var(--shadow-color) / 36%),
      2.2px 4.1px 7px hsl(var(--shadow-color) / 54%);
    --shadow-elevation-high: 0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0%),
      1.1px 2.1px 3.6px hsl(var(--shadow-color) / 8%),
      2px 3.7px 6.3px hsl(var(--shadow-color) / 17%),
      2.9px 5.5px 9.3px hsl(var(--shadow-color) / 25%),
      4.1px 7.6px 13px hsl(var(--shadow-color) / 34%),
      5.7px 10.6px 18.1px hsl(var(--shadow-color) / 42%),
      7.8px 14.7px 25px hsl(var(--shadow-color) / 5%),
      10.8px 20.3px 34.5px hsl(var(--shadow-color) / 59%);
  }

  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] {
    --color-fg: var(--color-white);
    --color-fg-less-emphasized: var(--color-lightgrey);
    --color-fg-interactive: var(--color-lightteal);
    --color-bg: var(--color-bluegray);
    --color-bg-emphasized: var(--color-darkgrey);
    --color-bg-interactive: var(--color-darkteal);
    --shadow-color: var(--color-bluegray-hsl);
    --image-filter: grayscale(10%);
  }

  /* re-colorize and darken photographic images (https://web.dev/prefers-color-scheme/#re-colorize-and-darken-photographic-images) */
  img:not([src*='.svg']) {
    filter: var(--image-filter);
  }

  #__next {
    font-family: RubikVariable, 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  ul,
  ol {
    padding: 0;
  }
  ul > li {
    text-indent: 0;
    list-style-type: none;
  }
  ol > li {
    text-indent: 0;
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
    color: inherit;
    background-color: inherit;
    border: none;
  }
  button:hover {
    color: var(--color-fg-interactive);
    cursor: pointer;
  }

  p,
  ul,
  ol {
    font-size: var(--font-size-base);
  }

  h1,
  h2,
  h3 {
    margin-block-start: 2.5em;
    margin-block-end: 0.5em;
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

  h1 {
    text-wrap: balance;
  }

  code {
    /* monospace font family string taken from @codesandbox/sandpack-themes GitHub Light Theme. Plus Cascadia Code. */
    font-family: CascadiaMonoVariable, 'Fira Mono', 'DejaVu Sans Mono', Menlo, Consolas,
      'Liberation Mono', Monaco, 'Lucida Console', monospace;
    font-size: var(--font-size-sm);
  }

  *:not(pre) > code {
    padding: calc(0.5 * var(--spacing-base)) calc(0.75 * var(--spacing-base));
    font-size: 0.9em;
    background-color: var(--color-bg-emphasized);
    border-radius: 4px;
  }
`;
