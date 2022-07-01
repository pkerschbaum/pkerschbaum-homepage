import { logger } from '@pkerschbaum-homepage/commons/observability/logger';

const PUPPETEER_NAVIGATION_TIMEOUT = 2 * 60 * 1000; // 2 minutes

type FetchFaviconHrefsOptions = { browser: any };
export type FetchFaviconHrefsResult = {
  lightIconHref: undefined | string;
  darkIconHref: undefined | string;
};
export async function fetchFaviconHrefs(
  href: string,
  options: FetchFaviconHrefsOptions,
): Promise<FetchFaviconHrefsResult> {
  // Open two pages, one for light/dark color scheme each
  const [pageLight, pageDark] = await Promise.all([
    options.browser.newPage(),
    options.browser.newPage(),
  ]);
  await pageDark.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // Fetch Favicons Hrefs in parallel
  const [lightIconHref, darkIconHref] = await Promise.all([
    gotoPageAndExtractFaviconHrefFromPage(pageLight, href),
    gotoPageAndExtractFaviconHrefFromPage(pageDark, href),
  ]);

  return { lightIconHref, darkIconHref };
}

async function gotoPageAndExtractFaviconHrefFromPage(page: any, href: string) {
  // Goto given href
  await page.goto(href, { waitUntil: 'networkidle0', timeout: PUPPETEER_NAVIGATION_TIMEOUT });

  // Extract iconHref from html
  const maybeRelativeIconHref = await page
    .$("link[rel='icon']")
    .then((handle: any) => handle?.getProperty('href'))
    .then((jsHandle: any) => jsHandle?.jsonValue());
  if (typeof maybeRelativeIconHref !== 'string') {
    logger.warn(`could not fetch icon from url`);
    return;
  }

  // Construct absolute URL for iconHref
  const absoluteIconURL = new URL(maybeRelativeIconHref, href);

  return absoluteIconURL.href;
}
