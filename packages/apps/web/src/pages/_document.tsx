import { getSandpackCssText } from '@codesandbox/sandpack-react';
import Document, { DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';
import { ServerStyleSheet } from 'styled-components';

import { Classes, ColorTheme, DataAttribute, IsScrolled, LocalStorageKey } from '~/constants';

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
                display:none;
              }`}
            </style>
          </noscript>

          {/* https://sandpack.codesandbox.io/docs/getting-started/ssr#nextjs */}
          <style dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} id="sandpack" />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: blockingSetInitialColorTheme.toString() }} />
          <script dangerouslySetInnerHTML={{ __html: blockingSetDocumentIsScrolled.toString() }} />
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
