import type { AppProps } from 'next/app';
import Head from 'next/head';
import * as React from 'react';

import { CSSReset } from '~/styles/css-reset';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Index</title>
        <meta name="description" content="Index page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CSSReset />

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
