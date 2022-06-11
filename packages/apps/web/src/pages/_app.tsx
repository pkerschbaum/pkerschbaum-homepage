import { assertIsUnreachable } from '@pkerschbaum/ts-utils';
import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import * as React from 'react';
import { Moon, Sun } from 'react-feather';
import styled from 'styled-components';

import { Header } from '~/components/header';
import { Nav } from '~/components/nav';
import { SocialMediaLinks } from '~/components/social-media-links';
import { ColorTheme } from '~/constants';
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
);

const SwitchThemeButton: React.FC = () => {
  const { activeColorTheme, toggleColorTheme } = useColorTheme();

  let iconToRender;
  switch (activeColorTheme) {
    case ColorTheme.LIGHT: {
      iconToRender = <Moon aria-label="Switch to dark mode" />;
      break;
    }
    case ColorTheme.DARK: {
      iconToRender = <Sun aria-label="Switch to light mode" />;
      break;
    }
    default:
      assertIsUnreachable(activeColorTheme);
  }

  return <Button onClick={toggleColorTheme}>{iconToRender}</Button>;
};

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

const ToggleColorThemeButtonContainer = styled.div`
  flex-shrink: 0;
  display: flex;
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
