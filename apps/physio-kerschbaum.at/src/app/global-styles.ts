import { Animations } from '#pkg/constants-browser.js';

export const cssReset = css`
  @layer reset {
    /* based on https://www.joshwcomeau.com/css/custom-css-reset/ */

    /*
     * 1. Use a more-intuitive box-sizing model.
     */
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    /*
     * 2. Remove default margin
     */
    *:not(p, ul, ol) {
      margin: 0;
    }

    /*
     * 3. Allow percentage-based heights in the application
     */
    html,
    body,
    #__next {
      height: 100%;
    }

    /*
     * Typographic tweaks!
     * 4. Add accessible line-height
     * 5. Improve text rendering
     */
    body {
      line-height: 1.7;
      -webkit-font-smoothing: antialiased;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      line-height: 1.2;
    }

    /*
     * 6. Improve media defaults
     */
    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }

    /*
     * 7. Remove built-in form typography styles
     */
    input,
    button,
    textarea,
    select {
      font: inherit;
    }

    /*
     * 8. Avoid text overflows
     */
    * {
      overflow-wrap: break-word;
    }

    /*
     * 9. Create a root stacking context
     */
    #__next {
      isolation: isolate;
    }
  }
`;

export const cssBase = css`
  @layer base {
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
      --color-black: hsl(225deg 6% 13%);
      --color-darkgrey: hsl(0deg 0% 30%);
      --color-verylightgrey: hsl(0deg 0% 88%);

      --color-primary: #296257;
      --color-secondary: #5fb0a1;
      --color-tertiary: #c6e7e1;
      --color-quaternary: #eaf6f4;

      --color-fg: var(--color-black);
      --color-fg-less-emphasized: var(--color-darkgrey);
      --color-fg-interactive: var(--color-primary);
      --color-bg: var(--color-white);
      --color-bg-emphasized: var(--color-verylightgrey);
      --color-bg-interactive: var(--color-secondary);

      --font-size-sm: 0.85rem;
      --font-size-base: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-xxl: 1.5rem;
      --font-size-xxxl: 1.75rem;
      --font-size-xxxxl: 2rem;
      --font-weight-bold: 700;
      --spacing-base: 8px;

      --animation-hide: ${Animations.HIDE};
      --animation-slide-left: ${Animations.SLIDE_LEFT};
      --animation-slide-right: ${Animations.SLIDE_RIGHT};

      /* https://www.joshwcomeau.com/shadow-palette/ */
      --shadow-color: 0deg 0% 63%;
      --shadow-elevation-low:
        0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0%),
        0.2px 0.4px 0.7px hsl(var(--shadow-color) / 23%),
        0.4px 0.8px 1.3px hsl(var(--shadow-color) / 46%);
      --shadow-elevation-medium:
        0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0%),
        0.5px 1px 1.7px hsl(var(--shadow-color) / 18%),
        1.1px 2px 3.4px hsl(var(--shadow-color) / 36%),
        2.2px 4.1px 7px hsl(var(--shadow-color) / 54%);
      --shadow-elevation-high:
        0.1px 0.2px 0.3px hsl(var(--shadow-color) / 0%),
        1.1px 2.1px 3.6px hsl(var(--shadow-color) / 8%),
        2px 3.7px 6.3px hsl(var(--shadow-color) / 17%),
        2.9px 5.5px 9.3px hsl(var(--shadow-color) / 25%),
        4.1px 7.6px 13px hsl(var(--shadow-color) / 34%),
        5.7px 10.6px 18.1px hsl(var(--shadow-color) / 42%),
        7.8px 14.7px 25px hsl(var(--shadow-color) / 5%),
        10.8px 20.3px 34.5px hsl(var(--shadow-color) / 59%);
      --shadow-style: 4px 4px 0 0 var(--color-fg);
      --shadow-style-elevation: 6px 6px 0 0 var(--color-fg);
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

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      text-wrap: balance;
    }

    /* table border of 1px solid var(--color-black) */
    table {
      border-spacing: 0;
      border-collapse: collapse;
    }
    th,
    td {
      padding-block: 0.2em;
      padding-inline: 0.5em;
      border: 1px solid var(--color-fg);
    }
  }
`;

/**
 * This function just returns the template string.
 * It's purpose is solely to have a function `css` which will trigger CSS syntax highlighting in VS Code, extension [`styled-components.vscode-styled-components`](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components).
 */
function css(strings: TemplateStringsArray, ...args: (string | number)[]): string {
  let result = strings[0] ?? '';
  for (const [i, arg] of args.entries()) {
    result += `${arg}${strings[i + 1]}`;
  }
  return result;
}
