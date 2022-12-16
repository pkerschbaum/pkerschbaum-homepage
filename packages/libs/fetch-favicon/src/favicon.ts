import type * as pptr from 'puppeteer';

const PUPPETEER_NAVIGATION_TIMEOUT = 30 * 1000; // 30 seconds

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

  const relativeIconURL = await page
    .$("link[rel='icon']")
    .then((handle) => handle?.getProperty('href'))
    .then((jsHandle) => jsHandle?.jsonValue());

  let absoluteIconURL;
  if (typeof relativeIconURL === 'string') {
    // If we have an <link> element with rel='icon', return the URL for that
    absoluteIconURL = new URL(relativeIconURL, website);
  } else {
    // As an alternative, return just /favicon.ico
    absoluteIconURL = new URL('/favicon.ico', website);
  }

  return absoluteIconURL;
}
