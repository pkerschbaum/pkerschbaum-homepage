import { arrays, check } from '@pkerschbaum/ts-utils';
import playwright from 'playwright';
import invariant from 'tiny-invariant';

import { binaryUtils } from '@pkerschbaum-homepage/commons-node/utils/binary.utils';
import { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';
import type { FaviconsForWebsites } from '@pkerschbaum-homepage/shared-node/schema';

import { fetchFaviconURLs } from '#pkg/favicon.js';

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
      const response = await binaryUtils.fetchUrl(url);
      const blob = await response.blob();
      const dataURL = await binaryUtils.convertBlobToDataURL(blob);
      icons[url.href] = { dataURL };
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
  const launchOptions: playwright.LaunchOptions = {
    headless: true,
    args: ['--no-sandbox'],
  };
  return await playwright.chromium.launch(launchOptions);
}
