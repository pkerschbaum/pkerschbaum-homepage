import '@fontsource/rubik/variable.css';

import localFont from '@next/font/local';
import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import styled from 'styled-components';

import { Header } from '#/components/header';
import { Nav } from '#/components/nav';
import { RssFeedAnchor } from '#/components/rss-feed-anchor';
import { SocialMediaLinks } from '#/components/social-media-links';
import { ToggleThemeButton } from '#/components/toggle-theme-button';
import { config } from '#/config';
import { DataAttribute, IsAnimationEnabled } from '#/constants';
import { ColorThemeProvider } from '#/context/color-theme';
import { CSSReset } from '#/styles/css-reset.styles';
import { GlobalAppStyles } from '#/styles/global-app.styles';
import { PrismStyles } from '#/styles/prism.styles';
import { useIsMounted } from '#/utils/react.utils';

const cascadiaMono = localFont({
  src: [
    {
      path: '../static/fonts/CascadiaMono.woff2',
      style: 'normal',
      weight: '200 700',
    },
    {
      path: '../static/fonts/CascadiaMonoItalic.woff2',
      style: 'italic',
      weight: '200 700',
    },
  ],
});

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const isMounted = useIsMounted();

  React.useEffect(
    /**
     * For whatever reason, in Firefox, some elements using keyframe animations flicker on page load.
     * Specifically, the "home link" on the navigation bar. There are animations in place to replace
     * the home link "Patrick Kerschbaum" by the logo "PK", but that should only happen on scroll.
     * Firefox animates them on load. Very fast, but still this flickering is noticable.
     *
     * That's why we enable animations only after client-side hydration and some small timeout.
     * We do so by setting a specific data attribute on the root element (<html> element).
     * That attribute will enable animations for the whole website.
     *
     * This means that animations will not be active if the website is rendered without javascript.
     * This is absolutely OK since animations are just a "progressive enhancement".
     *
     * We do not care if this effect runs multiple times because the operation in question - setting
     * a data attribute to a fixed value - is idempotent.
     */
    function enableAnimationsAfterHydration() {
      if (isMounted) {
        setTimeout(() => {
          document.documentElement.setAttribute(
            DataAttribute.IS_ANIMATION_ENABLED,
            IsAnimationEnabled.YES,
          );
        }, 500);
      }
    },
    [isMounted],
  );

  let pageUrl = config.deploymentOrigin;
  pageUrl = new URL(router.basePath, pageUrl);
  pageUrl = new URL(router.asPath, pageUrl);
  const pageHref = pageUrl.href;

  const imageUrl = new URL('/favicons/android-chrome-512x512.png', config.deploymentOrigin);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="canonical" href={pageHref} key="canonical" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageUrl.href} />
        <meta property="og:site_name" content="pkerschbaum.com" />
        <meta property="og:url" content={pageHref} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@pkerschbaum" />
        <meta name="twitter:creator" content="@pkerschbaum" />
      </Head>

      <ColorThemeProvider>
        <CSSReset />
        <PrismStyles />
        <GlobalAppStyles cascadiaMonoFontFamily={cascadiaMono.style.fontFamily} />

        <RootContainer>
          <Header>
            <Nav />

            <AnchorAndButtonsArea>
              <RssFeedAnchor />

              <ToggleThemeButton />
            </AnchorAndButtonsArea>
          </Header>

          <Component {...pageProps} />

          <Footer>
            <SocialMediaLinks />

            <YearAndContact>
              <span>{dayjs().year()}</span>
              <span>-</span>
              <Link href="/">pkerschbaum</Link>
            </YearAndContact>
          </Footer>
        </RootContainer>
      </ColorThemeProvider>
    </>
  );
};

const RootContainer = styled.div`
  --app-padding-inline: calc(1.5 * var(--spacing-base));
  --app-max-width: calc(var(--box-width-md) + 2 * var(--app-padding-inline));

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

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: calc(2 * var(--spacing-base));
  align-items: center;

  padding-block-start: calc(4 * var(--spacing-base));
`;

const YearAndContact = styled.div`
  display: flex;
  gap: calc(1 * var(--spacing-base));
  align-items: center;
  justify-content: center;
`;

export default MyApp;
