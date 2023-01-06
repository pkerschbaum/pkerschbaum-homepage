import * as styled from 'styled-components';

import { DataAttribute, ColorTheme } from '#pkg/constants';

export const PrismStyles = styled.createGlobalStyle`
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
    background: none;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*='language-'] {
    box-shadow: var(--shadow-elevation-low);
    border-radius: var(--prism-border-radius);
    overflow: auto;
    padding-block: var(--app-padding-inline);
    padding-inline: var(--app-padding-inline);
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
      border-color: #dddddd;
      background-color: var(--prism-theme-github-bg);
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
