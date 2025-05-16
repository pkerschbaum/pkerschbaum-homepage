import { Animations, ColorTheme, DataAttribute } from '#pkg/constants-browser.js';

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
    * {
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
      font-family:
        'Rubik Variable',
        'Segoe UI',
        -apple-system,
        BlinkMacSystemFont,
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        sans-serif;
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

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      /*
        The <header> is absolutely positioned. Without any scroll-margin-top, if a user goes to our website
        using a fragment pointing to a heading, the user agent would set the scroll position just enough
        to reveal the heading - but the absolutely-positioned <header> would be over that heading, hiding it.

        That's why we set some scroll-margin-top to so that the user agent scrolls enough to reveal the heading.
      */
      scroll-margin-top: 100px;
    }

    code {
      /* monospace font family string taken from @codesandbox/sandpack-themes GitHub Light Theme. Plus Cascadia Code. */
      font-family:
        var(--font-family-monospace), 'Fira Mono', 'DejaVu Sans Mono', Menlo, Consolas,
        'Liberation Mono', Monaco, 'Lucida Console', monospace;
      font-size: var(--font-size-sm);
    }

    *:not(pre) > code {
      padding: calc(0.5 * var(--spacing-base)) calc(0.75 * var(--spacing-base));
      font-size: 0.9em;
      background-color: var(--color-bg-emphasized);
      border-radius: 4px;
    }
  }
`;

export const cssPrismaTheme = css`
  /* 
   * The Prismjs styles are based on these themes:
   * - https://gist.github.com/kyubuns/41ac79a4bfe6f258c5e3f5cf392f5191 from 20220704 
   * - https://github.com/PrismJS/prism-themes/blob/447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-nord.css
   */

  *:root {
    --prism-theme-github-bg: white;
    --prism-theme-nord-bg: #2e3440;
    --prism-border-radius: 8px;
  }

  code[class*='language-'],
  pre[class*='language-'] {
    line-height: 1.5;
    text-align: left;
    word-spacing: normal;
    hyphens: none;
    word-break: normal;
    word-wrap: normal;
    tab-size: 4;
    white-space: pre;
    background: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding-block: var(--app-padding-inline);
    padding-inline: var(--app-padding-inline);
    overflow: auto;
    border-radius: var(--prism-border-radius);
    box-shadow: var(--shadow-elevation-low);
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    white-space: normal;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  /* For light theme, use GitHub Light (https://gist.github.com/kyubuns/41ac79a4bfe6f258c5e3f5cf392f5191) */
  *:root:not([${DataAttribute.THEME}='${ColorTheme.DARK}']) {
    code,
    code[class*='language-'],
    pre[class*='language-'] {
      color: #24292e;
    }

    pre[class*='language-'] {
      background-color: var(--prism-theme-github-bg);
      border-color: #ddd;
    }

    .token.selector,
    .token.attr-name,
    .token.attr-value .punctuation:first-child,
    .token.keyword,
    .token.regex,
    .token.important,
    .token.operator {
      color: #d73a49;
    }
    .token.class-name,
    .token.type-class-name,
    .token.namespace {
      color: #6f42c1;
    }
    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #6a737d;
    }
    .token.function {
      color: #6f42c1;
    }
    .token.string,
    .token.atrule,
    .token.attr-value {
      color: #032f62;
    }
    .token.boolean,
    .token.number {
      color: #005cc5;
    }
  }

  /* For dark theme, use Nord (https://github.com/PrismJS/prism-themes/blob/447479fc7b2be2051fe27e561aceed7cc87a589f/themes/prism-nord.css) */
  *:root[${DataAttribute.THEME}='${ColorTheme.DARK}'] {
    code[class*='language-'],
    pre[class*='language-'] {
      color: #f8f8f2;
    }

    :not(pre) > code[class*='language-'],
    pre[class*='language-'] {
      background: var(--prism-theme-nord-bg);
    }

    .token.comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #8d97ab; /* <-- using something between "nord3" and "nord4" for comments (nord3 is roughly readable, and nord4 is already in use for plain text) */
    }

    .token.punctuation {
      color: #81a1c1;
    }

    .namespace {
      opacity: 0.7;
    }

    .token.property,
    .token.tag,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: #81a1c1;
    }

    .token.number {
      color: #b48ead;
    }

    .token.boolean {
      color: #81a1c1;
    }

    .token.selector,
    .token.attr-name,
    .token.string,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: #a3be8c;
    }

    .token.operator,
    .token.entity,
    .token.url,
    .language-css .token.string,
    .style .token.string,
    .token.variable {
      color: #81a1c1;
    }

    .token.atrule,
    .token.attr-value,
    .token.function {
      color: #88c0d0;
    }

    .token.class-name,
    .token.type-class-name {
      color: #8fbcbb;
    }

    .token.keyword {
      color: #81a1c1;
    }

    .token.regex,
    .token.important {
      color: #ebcb8b;
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
