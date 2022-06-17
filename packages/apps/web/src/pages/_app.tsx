import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

import { Header } from '~/components/header';
import { Nav } from '~/components/nav';
import { RssFeedAnchor } from '~/components/rss-feed-anchor';
import { SocialMediaLinks } from '~/components/social-media-links';
import { ToggleThemeButton } from '~/components/toggle-theme-button';
import { ColorThemeProvider } from '~/context/color-theme';
import { CSSReset } from '~/styles/css-reset.styles';
import { GlobalAppStyles } from '~/styles/global-app.styles';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <ColorThemeProvider>
      <CSSReset />
      <GlobalAppStyles />

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
            <Link href="/">
              <a>pkerschbaum</a>
            </Link>
          </YearAndContact>
        </Footer>
      </RootContainer>
    </ColorThemeProvider>
  </>
);

const RootContainer = styled.div`
  min-height: 100%;
  --app-padding-inline: calc(1.5 * var(--spacing-base));
  --app-max-width: calc(var(--box-width-md) + 2 * var(--app-padding-inline));
  max-width: var(--app-max-width);
  margin: 0 auto;

  padding-block-start: calc(2 * var(--spacing-base));
  padding-block-end: calc(3 * var(--spacing-base));
  padding-inline: var(--app-padding-inline);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(2 * var(--spacing-base));
`;

const AnchorAndButtonsArea = styled.div`
  flex-shrink: 0;

  display: flex;
  gap: calc(3 * var(--spacing-base));
`;

const Footer = styled.footer`
  padding-block-start: calc(4 * var(--spacing-base));
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(2 * var(--spacing-base));
`;

const YearAndContact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(1 * var(--spacing-base));
`;

export default MyApp;
