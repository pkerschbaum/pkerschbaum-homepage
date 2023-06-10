'use client';

import dayjs from 'dayjs';
import Link from 'next/link.js';
import type React from 'react';
import { styled } from 'styled-components';

import { EnableAnimationsAfterHydration } from '#pkg/components/enable-animations-after-hydration/EnableAnimationsAfterHydration';
import { Header } from '#pkg/components/header';
import { Nav } from '#pkg/components/nav';
import { RssFeedAnchor } from '#pkg/components/rss-feed-anchor';
import { SocialMediaLinks } from '#pkg/components/social-media-links';
import { ToggleThemeButton } from '#pkg/components/toggle-theme-button';
import { TOC_QUERY } from '#pkg/constants';
import { ColorThemeProvider } from '#pkg/context/color-theme';
import { CSSReset } from '#pkg/styles/css-reset.styles';
import { GlobalAppStyles } from '#pkg/styles/global-app.styles';
import { PrismStyles } from '#pkg/styles/prism.styles';

type RootLayoutContainerProps = {
  children: React.ReactNode;
};

export const RootLayoutContainer = ({ children }: RootLayoutContainerProps) => {
  return (
    <ColorThemeProvider>
      <CSSReset />
      <PrismStyles />
      <GlobalAppStyles />
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
  );
};

const RootContainer = styled.div`
  --app-padding-inline: calc(2 * var(--spacing-base));
  --app-box-width: var(--box-width-md);
  --app-max-width: calc(var(--app-box-width) + 2 * var(--app-padding-inline));

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
