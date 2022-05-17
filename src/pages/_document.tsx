import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import { Classes, ColorTheme, DataAttribute, LocalStorageKey } from '~/constants';

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
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  public render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <noscript>
            <style type="text/css">
              {`
              .${Classes.JS_REQUIRED} {
                display:none;
              }`}
            </style>
          </noscript>
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: blockingSetInitialColorTheme.toString() }} />
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
