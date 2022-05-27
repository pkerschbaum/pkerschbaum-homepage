import puppeteer from 'puppeteer';

import { logger } from '~/logger';
import { binaryUtils } from '~/utils/binary.utils';

let browserPromise: Promise<puppeteer.Browser> | undefined;
async function getBrowser() {
  if (!browserPromise) {
    browserPromise = initializeBrowserInstance();
  }

  return await browserPromise;
}

async function initializeBrowserInstance() {
  const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
    headless: true,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
  };
  return await puppeteer.launch(launchOptions);
}

export async function fetchFaviconDataURL(href: string) {
  // Open two pages, one for light/dark color scheme each
  const browser = await getBrowser();
  const [pageLight, pageDark] = await Promise.all([browser.newPage(), browser.newPage()]);
  await pageDark.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);

  // Fetch Favicons in parallel
  const [lightIconDataURL, darkIconDataURL] = await Promise.all([
    gotoPageAndExtractFaviconFromPage(pageLight, href),
    gotoPageAndExtractFaviconFromPage(pageDark, href),
  ]);

  return { lightIconDataURL, darkIconDataURL };
}

async function gotoPageAndExtractFaviconFromPage(page: puppeteer.Page, href: string) {
  // Goto given href
  await page.goto(href, { waitUntil: 'networkidle0' });

  // Extract iconHref from html
  const iconHref = await page
    .$("link[rel='icon']")
    .then((handle) => handle?.getProperty('href'))
    .then((jsHandle) => jsHandle?.jsonValue());
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
