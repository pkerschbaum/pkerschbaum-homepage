import fs from 'fs';
import puppeteer from 'puppeteer';
// @ts-expect-error -- safe-stable-stringify does not provide typings for its esm wrapper...
import safeStringify from 'safe-stable-stringify';

import { fetchFaviconURLs } from '~/favicon.js';
import { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';
import { arrays, check } from '@pkerschbaum/ts-utils';
import { binaryUtils } from '@pkerschbaum-homepage/commons-node/utils/binary.utils';
import { PATHS } from '@pkerschbaum-homepage/shared-node/constants';
import type { FaviconsForWebsites } from '@pkerschbaum-homepage/shared-node/schema';
import { default as invariant } from 'tiny-invariant';

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  // Preparation: fetch list of posts and start browser
  let fileNamesOfPosts = await fs.promises.readdir(PATHS.POSTS);
  fileNamesOfPosts = fileNamesOfPosts.filter((path) => path.endsWith('.mdx'));

  const browser = await initializeBrowserInstance();

  // Step #1: Collect all hrefs of all posts (with duplicates removed)
  let hrefsOfAllPosts: string[] = [];
  await Promise.all(
    fileNamesOfPosts.map(async (fileNameOfPost) => {
      const { collectedHrefs } = await parseMDXFileAndCollectHrefs(PATHS.POSTS, fileNameOfPost);
      hrefsOfAllPosts.push(...collectedHrefs);
    }),
  );
  hrefsOfAllPosts = arrays.uniqueValues(hrefsOfAllPosts);

  // Step #2: Use puppeteer to go to every href and fetch the URLs for both its light favicon and dark favicon
  const websites: FaviconsForWebsites['websites'] = {};
  await Promise.all(
    hrefsOfAllPosts.map(async (href) => {
      const faviconURLs = await fetchFaviconURLs(new URL(href), { browser });
      websites[href] = {
        iconURLs: {
          light: faviconURLs.icons.light?.href,
          dark: faviconURLs.icons.dark?.href,
        },
      };
    }),
  );

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

  // Step #5: Close the puppeteer browser and store the favicons as JSON
  await browser.close();
  const finalResult: FaviconsForWebsites = {
    websites,
    icons,
  };
  await fs.promises.writeFile(PATHS.FAVICONS_FOR_WEBSITES, safeStringify(finalResult, null, 2), {
    encoding: 'utf-8',
  });
}

async function initializeBrowserInstance() {
  const launchOptions: Parameters<typeof puppeteer.launch>[0] = {
    headless: true,
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
  };
  return await puppeteer.launch(launchOptions);
}

void fetchFaviconsForAllHrefsAndWriteToFile();
