import fs from 'fs';
import path from 'path';
import url from 'url';
import puppeteer from 'puppeteer';
// @ts-expect-error -- safe-stable-stringify does not provide typings for its esm wrapper...
import safeStringify from 'safe-stable-stringify';

import { fetchFaviconHrefs, FetchFaviconHrefsResult } from '~/favicon.js';
import { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';
import { arrays, check } from '@pkerschbaum/ts-utils';
import { binaryUtils } from '@pkerschbaum-homepage/commons-node/utils/binary.utils';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const WEB_SRC_PATH = path.join(__dirname, '..', '..', '..', 'apps', 'web', 'src');
const POSTS_PATH = path.join(WEB_SRC_PATH, 'posts');
const JSON_OUTPUT_PATH = path.join(WEB_SRC_PATH, 'static', 'href-to-favicons.json');

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  // Preparation: fetch list of posts and start browser
  let fileNamesOfPosts = await fs.promises.readdir(POSTS_PATH);
  fileNamesOfPosts = fileNamesOfPosts.filter((path) => path.endsWith('.mdx'));

  const browser = await initializeBrowserInstance();

  // Step #1: Collect all hrefs of all posts
  const hrefsOfAllPosts: string[] = [];
  await Promise.all(
    fileNamesOfPosts.map(async (fileNameOfPost) => {
      const { collectedHrefs } = await parseMDXFileAndCollectHrefs(POSTS_PATH, fileNameOfPost);
      hrefsOfAllPosts.push(...collectedHrefs);
    }),
  );

  // Step #2: Use puppeteer to go to every href and fetch the URLs for both its light favicon and dark favicon
  const hrefToFaviconHrefsMap: { [href: string]: FetchFaviconHrefsResult } = {};
  await Promise.all(
    hrefsOfAllPosts.map(async (href) => {
      const faviconHrefs = await fetchFaviconHrefs(href, { browser });
      hrefToFaviconHrefsMap[href] = faviconHrefs;
    }),
  );

  // Step #3: Gather a list of unique favicon hrefs we need to fetch then
  let allIconHrefs: string[] = [];
  for (const entry of Object.values(hrefToFaviconHrefsMap)) {
    if (check.isNonEmptyString(entry.lightIconHref)) {
      allIconHrefs.push(entry.lightIconHref);
    }
    if (check.isNonEmptyString(entry.darkIconHref)) {
      allIconHrefs.push(entry.darkIconHref);
    }
  }
  const uniqueIconHrefs = arrays.uniqueValues(allIconHrefs);

  // Step #4: Go to every favicon href and store the favicon as a data URL
  const iconHrefToDataURLsMap: { [iconHref: string]: string } = {};
  await Promise.all(
    uniqueIconHrefs.map(async (href) => {
      iconHrefToDataURLsMap[href] = await binaryUtils.fetchUrlAndConvertToDataURL(new URL(href));
    }),
  );

  // Step #5: Close the puppeteer browser and store the favicons as JSON
  await browser.close();
  const finalResult = {
    hrefToFaviconHrefsMap,
    iconHrefToDataURLsMap,
  };
  await fs.promises.writeFile(JSON_OUTPUT_PATH, safeStringify(finalResult, null, 2), {
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
