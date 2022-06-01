import { logger } from '@pkerschbaum-homepage/commons/observability/logger';
import { binaryUtils } from '@pkerschbaum-homepage/commons-node/utils/binary.utils';

const PUPPETEER_NAVIGATION_TIMEOUT = 2 * 60 * 1000; // 2 minutes

type FetchFaviconDataURLsOptions = { browser: any };
export type FetchFaviconDataURLsResult = {
  lightIconDataURL: any;
  darkIconDataURL: any;
};
export async function fetchFaviconDataURLs(
  href: string,
  options: FetchFaviconDataURLsOptions,
): Promise<FetchFaviconDataURLsResult> {
  // Open two pages, one for light/dark color scheme each
  const [pageLight, pageDark] = await Promise.all([
    options.browser.newPage(),
    options.browser.newPage(),
  ]);
  await pageDark.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // Fetch Favicons in parallel
  const [lightIconDataURL, darkIconDataURL] = await Promise.all([
    gotoPageAndExtractFaviconFromPage(pageLight, href),
    gotoPageAndExtractFaviconFromPage(pageDark, href),
  ]);

  return { lightIconDataURL, darkIconDataURL };
}

async function gotoPageAndExtractFaviconFromPage(page: any, href: string) {
  // Goto given href
  await page.goto(href, { waitUntil: 'networkidle0', timeout: PUPPETEER_NAVIGATION_TIMEOUT });

  // Extract iconHref from html
  const iconHref = await page
    .$("link[rel='icon']")
    .then((handle: any) => handle?.getProperty('href'))
    .then((jsHandle: any) => jsHandle?.jsonValue());
  if (typeof iconHref !== 'string') {
    logger.warn(`could not fetch icon from url`);
    return;
  }

  // Construct URL for iconHref
  const iconUrl = new URL(iconHref, href);

  // Fetch URL and convert response to data URL
  const dataURL = await binaryUtils.fetchUrlAndConvertToDataURL(iconUrl);

  return dataURL;
}
