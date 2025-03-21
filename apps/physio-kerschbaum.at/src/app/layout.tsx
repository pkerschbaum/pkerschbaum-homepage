import './cascade-layers-definition.css';
import '@pigment-css/react/styles.css';
import '@fontsource-variable/rubik';

import { styled } from '@pigment-css/react';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type React from 'react';

import { cssReset, cssBase } from '#pkg/app/global-styles.js';
import { Footer } from '#pkg/components/footer/index.js';
import { Header } from '#pkg/components/header/index.js';
import { config } from '#pkg/config.js';
import { Classes, DataAttribute, IsAnimationEnabled } from '#pkg/constants-browser.js';

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
    <html lang="en" className={fontMonospace.variable}>
      <head>
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
      </head>
      <body>
        <div id="__next">
          <RootContainer>
            <Header>TODO</Header>

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
