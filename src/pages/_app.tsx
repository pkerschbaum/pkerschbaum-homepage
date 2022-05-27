import { assertIsUnreachable } from '@pkerschbaum/ts-utils';
import dayjs from 'dayjs';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import * as React from 'react';
import { Moon, Sun } from 'react-feather';
import { DehydratedState, Hydrate, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

import { Nav } from '~/components/nav';
import { SocialMediaLinks } from '~/components/social-media-links';
import { ColorTheme } from '~/constants';
import { ColorThemeProvider, useColorTheme } from '~/context/color-theme';
import { Button } from '~/elements';
import { createQueryClient } from '~/global-cache';
import { AppGlobalStyle } from '~/styles/app-global-style';
import { CSSReset } from '~/styles/css-reset';

type MyAppProps = Omit<AppProps, 'pageProps'> & {
  pageProps: {
    dehydratedState: DehydratedState;
  };
};

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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

            <Main>
              <Component {...(pageProps as any)} />
            </Main>

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
      </Hydrate>
    </QueryClientProvider>
  );
};

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
