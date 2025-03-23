import './cascade-layers-definition.css';
import '@pigment-css/react/styles.css';
import '@fontsource-variable/rubik';

import { styled } from '@pigment-css/react';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type React from 'react';

import { cssReset, cssBase, cssPrismaTheme } from '#pkg/app/global-styles.js';
import { EnableAnimationsAfterHydration } from '#pkg/components/enable-animations-after-hydration/EnableAnimationsAfterHydration.jsx';
import { Footer } from '#pkg/components/footer/index.js';
import { Header } from '#pkg/components/header/index.js';
import { Nav } from '#pkg/components/nav/index.js';
import { RssFeedAnchor } from '#pkg/components/rss-feed-anchor/index.js';
import { ToggleThemeButton } from '#pkg/components/toggle-theme-button/index.js';
import { config } from '#pkg/config.js';
import {
  Animations,
  Classes,
  ColorTheme,
  DataAttribute,
  IsAnimationEnabled,
  IsScrolled,
  LocalStorageKey,
  TOC_QUERY,
} from '#pkg/constants-browser.js';

const fontMonospace = localFont({
  src: [
    {
      path: '../assets/fonts/CascadiaMono.woff2',
      style: 'normal',
      weight: '200 700',
    },
    {
      path: '../assets/fonts/CascadiaMonoItalic.woff2',
      style: 'italic',
      weight: '200 700',
    },
  ],
  display: 'swap',
  variable: '--font-family-monospace',
});

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={fontMonospace.variable}
      {...{ [DataAttribute.IS_SCROLLED]: IsScrolled.NO }}
    >
      <head>
        {/* disable automatic (faulty) detection of phone numbers on Safari */}
        <meta name="format-detection" content="telephone=no" />

        {/* favicons block generated with https://realfavicongenerator.net */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />

        {/* if JS is disabled, apply "display: none" to all elements which the JS_REQUIRED class is applied to */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `
                  .${Classes.JS_REQUIRED} {
                    display: none !important;
                  }
                `,
            }}
          />
        </noscript>

        {/* Plausible analytics */}
        <script
          defer
          data-domain={config.canonicalTLDPlus1}
          data-api="/p.io/api/event"
          src="/p.io/js/script.js"
        />

        <style dangerouslySetInnerHTML={{ __html: cssReset }} />
        <style dangerouslySetInnerHTML={{ __html: cssBase }} />
        <style dangerouslySetInnerHTML={{ __html: cssPrismaTheme }} />

        {/* 
              Some critical CSS which will disable animations until some data attribute is set on the 
              root element. This will avoid running animations on mount of components.
          */}
        <style
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
              `,
          }}
        />

        {/* Some critical CSS defining keyframes animations */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
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
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: blockingSetInitialColorTheme }} />
        <script dangerouslySetInnerHTML={{ __html: blockingSetDocumentIsScrolled }} />

        <div id="__next">
          <EnableAnimationsAfterHydration />

          <RootContainer>
            <Header>
              <Nav />

              <AnchorAndButtonsArea>
                <RssFeedAnchor />

                <ToggleThemeButton />
              </AnchorAndButtonsArea>
            </Header>

            {children}

            <Footer />
          </RootContainer>
        </div>

        <Analytics />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: config.deploymentOrigin,
  openGraph: {
    type: 'website',
    images: [
      {
        url: '/favicons/favicon-32x32.png',
        height: 32,
        width: 32,
      },
      {
        url: '/favicons/android-chrome-512x512.png',
        height: 512,
        width: 512,
      },
    ],
    siteName: config.canonicalTLDPlus1,
    url: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const RootContainer = styled.div`
  --app-padding-inline: calc(2 * var(--spacing-base));
  --app-box-width: var(--box-width-md);
  --app-max-width: calc(var(--app-box-width) + 2 * var(--app-padding-inline));

  /* stylelint-disable-next-line media-query-no-invalid -- works */
  @media ${TOC_QUERY} {
    --app-box-width: var(--box-width-lg);
  }

  display: flex;
  flex-direction: column;
  gap: calc(2 * var(--spacing-base));
  align-items: stretch;

  max-width: var(--app-max-width);
  min-height: 100%;
  padding-block-start: calc(2 * var(--spacing-base));
  padding-block-end: calc(3 * var(--spacing-base));
  padding-inline: var(--app-padding-inline);
  margin: 0 auto;
`;

const AnchorAndButtonsArea = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: calc(3 * var(--spacing-base));
`;

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
