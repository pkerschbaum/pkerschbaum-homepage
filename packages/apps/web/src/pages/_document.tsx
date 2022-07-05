import Document, { DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';

import {
  Animations,
  Classes,
  ColorTheme,
  DataAttribute,
  IsAnimationEnabled,
  IsScrolled,
  LocalStorageKey,
} from '~/constants';

export default class MyDocument extends Document {
  public static async getInitialProps(ctx: Parameters<typeof Document.getInitialProps>[0]) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      const result: DocumentInitialProps = {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };

      return result;
    } finally {
      sheet.seal();
    }
  }

  public render() {
    return (
      <Html lang="en">
        <Head>
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `
                @font-face {
                  font-family: 'CascadiaMonoVariable';
                  font-style: normal;
                  font-display: swap;
                  font-weight: 200 700;
                  src: url(/fonts/CascadiaMono.woff2) format('woff2');
                }
                @font-face {
                  font-family: 'CascadiaMonoVariable';
                  font-style: italic;
                  font-display: swap;
                  font-weight: 200 700;
                  src: url(/fonts/CascadiaMonoItalic.woff2) format('woff2');
                }
              `,
            }}
          />
          {/* favicons block generated with https://realfavicongenerator.net */}
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
          <link rel="shortcut icon" href="/favicons/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />

          <meta property="og:image" content="/favicons/favicon-32x32.png" />
          <noscript>
            <style type="text/css">
              {`
              .${Classes.JS_REQUIRED} {
                display:none !important;
              }`}
            </style>
          </noscript>

          {/* Plausible analytics */}
          <script defer data-domain="pkerschbaum.com" src="https://plausible.io/js/plausible.js" />

          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `
              *:root:not([${DataAttribute.IS_ANIMATION_ENABLED}='${IsAnimationEnabled.YES}']) * {
                /* https://css-tricks.com/revisiting-prefers-reduced-motion/ */
                animation-duration: 0.001ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.001ms !important;
              }
            
              *:root[${DataAttribute.IS_ANIMATION_ENABLED}='${IsAnimationEnabled.YES}'] a,
              *:root[${DataAttribute.IS_ANIMATION_ENABLED}='${IsAnimationEnabled.YES}'] svg * {
                transition: color 150ms, fill 150ms;
              }

              @keyframes ${Animations.HIDE} {
                to {
                  display: none;
                }
              }

              @keyframes ${Animations.SLIDE_LEFT} {
                0% {
                  transform: translateX(0%);
                }
                50% {
                  transform: translateX(calc(-100% + -1 * var(--app-padding-inline)));
                }
                50.1% {
                  transform: translateX(calc(-100% + -1 * var(--app-padding-inline)));
                  display: none;
                }
                100% {
                  transform: translateX(calc(-100% + -1 * var(--app-padding-inline)));
                  display: none;
                }
              }
              
              @keyframes ${Animations.SLIDE_RIGHT} {
                0% {
                  transform: translateX(calc(-100% + -1 * var(--app-padding-inline)));
                  display: none;
                }
                0.1% {
                  transform: translateX(calc(-100% + -1 * var(--app-padding-inline)));
                }
                50% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(0%);
                }
              }
              `,
            }}
          />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: blockingSetInitialColorTheme }} />
          <script dangerouslySetInnerHTML={{ __html: blockingSetDocumentIsScrolled }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// see https://sreetamdas.com/blog/the-perfect-dark-mode#recap
const blockingSetInitialColorTheme = `(function() {
  function getInitialColorTheme() {
    // If the user has explicitly chosen light or dark, let's use it.
    const persistedTheme = localStorage.getItem('${LocalStorageKey.THEME}');
    if (persistedTheme === '${ColorTheme.LIGHT}' || persistedTheme === '${ColorTheme.DARK}') {
      return persistedTheme;
    }
  
    // If they haven't been explicit, let's check the media query (user agent)
    const userAgentPrefersDarkMode =
      'matchMedia' in window && window.matchMedia('(prefers-color-scheme: dark)').matches === true;
    if (userAgentPrefersDarkMode) {
      return '${ColorTheme.DARK}';
    }
  
    // Return LIGHT if user agent has no preference or preference is "light"
    return '${ColorTheme.LIGHT}';
  }

  const colorTheme = getInitialColorTheme();

  // add HTML attribute if dark mode
  if (colorTheme === '${ColorTheme.DARK}') {
    document.documentElement.setAttribute('${DataAttribute.THEME}', '${ColorTheme.DARK}');
  }
})()
`;

const blockingSetDocumentIsScrolled = `(function() {
  document.documentElement.setAttribute('${DataAttribute.IS_SCROLLED}', window.scrollY > 0 ? '${IsScrolled.YES}' : '${IsScrolled.NO}');
  function onScroll() {
    document.documentElement.setAttribute('${DataAttribute.IS_SCROLLED}', window.scrollY > 0 ? '${IsScrolled.YES}' : '${IsScrolled.NO}');
  }
  document.addEventListener('scroll', onScroll, { passive: true });
})()
`;
