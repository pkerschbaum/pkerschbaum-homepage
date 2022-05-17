import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import * as React from 'react';
import { Moon } from 'react-feather';
import styled from 'styled-components';

import { Nav } from '~/components/nav';
import { SocialMediaLinks } from '~/components/social-media-links';
import { ColorThemeProvider, useColorTheme } from '~/context/color-theme';
import { Button } from '~/elements';
import { AppGlobalStyle } from '~/styles/app-global-style';
import { CSSReset } from '~/styles/css-reset';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ColorThemeProvider>
    <CSSReset />
    <AppGlobalStyle />

    <RootContainer>
      <Header>
        <Nav />

        <ToggleColorThemeButtonContainer>
          <SwitchThemeButton />
        </ToggleColorThemeButtonContainer>

        <SocialMediaLinks />
      </Header>

      <Main>
        <Component {...pageProps} />
      </Main>

      <Footer>
        <span>{dayjs().year()}</span>
        <span>-</span>
        <Link href="/">
          <a>pkerschbaum</a>
        </Link>
      </Footer>
    </RootContainer>
  </ColorThemeProvider>
);

const SwitchThemeButton: React.FC = () => {
  const { toggleColorTheme } = useColorTheme();

  return (
    <Button onClick={toggleColorTheme}>
      <Moon aria-label="Switch to dark mode" />
    </Button>
  );
};

const RootContainer = styled.div`
  min-height: 100%;
  max-width: 1000px;
  margin: 0 auto;

  padding: calc(3 * var(--spacing-base)) calc(2.5 * var(--spacing-base));
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(4 * var(--spacing-base));
`;

const Header = styled.header`
  flex-shrink: 0;
  align-self: stretch;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: calc(4 * var(--spacing-base));
`;

const ToggleColorThemeButtonContainer = styled.div`
  flex-shrink: 0;
  flex-grow: 1;

  display: flex;
`;

const Main = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(4 * var(--spacing-base));
`;

const Footer = styled.footer`
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: calc(1 * var(--spacing-base));
`;

export default MyApp;
