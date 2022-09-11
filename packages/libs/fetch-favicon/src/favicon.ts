import type * as pptr from 'puppeteer';

import { logger } from '@pkerschbaum-homepage/commons/observability/logger';

const PUPPETEER_NAVIGATION_TIMEOUT = 2 * 60 * 1000; // 2 minutes

type FetchFaviconURLsOptions = { browser: pptr.Browser };
export type FetchFaviconURLsResult = {
  icons: {
    light: undefined | URL;
    dark: undefined | URL;
  };
};
export async function fetchFaviconURLs(
  website: URL,
  options: FetchFaviconURLsOptions,
): Promise<FetchFaviconURLsResult> {
  // Open two pages, one for light/dark color scheme each
  const [pageLight, pageDark] = await Promise.all([
    options.browser.newPage(),
    options.browser.newPage(),
  ]);
  await pageDark.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // Fetch URLs of Favicons in parallel
  const [light, dark] = await Promise.all([
    gotoPageAndExtractFaviconURLFromPage(pageLight, website),
    gotoPageAndExtractFaviconURLFromPage(pageDark, website),
  ]);

  // Close the pages
  await Promise.all([pageLight.close(), pageDark.close()]);

  return { icons: { light, dark } };
}

async function gotoPageAndExtractFaviconURLFromPage(page: pptr.Page, website: URL) {
  // Goto given url
  await page.goto(website.href, {
    waitUntil: 'networkidle0',
    timeout: PUPPETEER_NAVIGATION_TIMEOUT,
  });

  // Extract href of icon from html
  const maybeRelativeIconURL = await page
    .$("link[rel='icon']")
    .then((handle) => handle?.getProperty('href'))
    .then((jsHandle) => jsHandle?.jsonValue());
  if (typeof maybeRelativeIconURL !== 'string') {
    logger.warn(`could not fetch icon from website! website.href=${website.href}`);
    return;
  }

  // Construct absolute URL (based on the website URL)
  const absoluteIconURL = new URL(maybeRelativeIconURL, website);

  return absoluteIconURL;
}
