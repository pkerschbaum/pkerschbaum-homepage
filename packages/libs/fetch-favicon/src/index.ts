import { arrays, check } from '@pkerschbaum/ts-utils';
import pptr from 'puppeteer';
import invariant from 'tiny-invariant';

import { binaryUtils } from '@pkerschbaum-homepage/commons-node/utils/binary.utils';
import { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';
import type { FaviconsForWebsites } from '@pkerschbaum-homepage/shared-node/schema';

import { fetchFaviconURLs } from '#/favicon.js';

export async function fetchFaviconsForAllHrefs(
  filesAbsolutePaths: string[],
): Promise<FaviconsForWebsites> {
  // Preparation: start browser
  const browser = await initializeBrowserInstance();

  // Step #1: Collect all hrefs of all posts (with duplicates removed)
  let hrefsOfAllPosts: string[] = [];
  await Promise.all(
    filesAbsolutePaths.map(async (fileAbsolutePath) => {
      const { collectedHrefs } = await parseMDXFileAndCollectHrefs(fileAbsolutePath);
      hrefsOfAllPosts.push(...collectedHrefs);
    }),
  );
  hrefsOfAllPosts = arrays.uniqueValues(hrefsOfAllPosts);

  // Step #2: Use puppeteer to go to every href and fetch the URLs for both its light favicon and dark favicon
  const websites: FaviconsForWebsites['websites'] = {};
  for (const href of hrefsOfAllPosts) {
    // we fetch favicon URLs one after another so that we do not overwhelm the pptr browser instance
    const faviconURLs = await fetchFaviconURLs(new URL(href), { browser });
    websites[href] = {
      iconURLs: {
        light: faviconURLs.icons.light?.href,
        dark: faviconURLs.icons.dark?.href,
      },
    };
  }

  // Step #3: Gather a list of favicon URLs we need to fetch (with duplicates removed)
  let allIconURLs: URL[] = [];
  for (const entry of Object.values(websites)) {
    invariant(entry);
    if (check.isNonEmptyString(entry.iconURLs.light)) {
      allIconURLs.push(new URL(entry.iconURLs.light));
    }
    if (check.isNonEmptyString(entry.iconURLs.dark)) {
      allIconURLs.push(new URL(entry.iconURLs.dark));
    }
  }
  allIconURLs = arrays.uniqueValues(allIconURLs);

  // Step #4: Go to every favicon URL and store the favicon as a data URL
  const icons: FaviconsForWebsites['icons'] = {};
  await Promise.all(
    allIconURLs.map(async (url) => {
      icons[url.href] = { dataURL: await binaryUtils.fetchUrlAndConvertToDataURL(url) };
    }),
  );

  // Step #5: Close the puppeteer browser and return the favicons
  await browser.close();
  return {
    websites,
    icons,
  };
}

async function initializeBrowserInstance() {
  const launchOptions: Parameters<typeof pptr.launch>[0] = {
    headless: true,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
  };
  return await pptr.launch(launchOptions);
}
