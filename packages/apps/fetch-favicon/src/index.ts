import fs from 'fs';
import path from 'path';
import url from 'url';
import puppeteer from 'puppeteer';
// @ts-expect-error -- safe-stable-stringify does not provide typings for its esm wrapper...
import safeStringify from 'safe-stable-stringify';

import { fetchFaviconDataURLs, FetchFaviconDataURLsResult } from '~/favicon.js';
import { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const WEB_SRC_PATH = path.join(__dirname, '..', '..', '..', 'apps', 'web', 'src');
const POSTS_PATH = path.join(WEB_SRC_PATH, 'posts');
const JSON_OUTPUT_PATH = path.join(WEB_SRC_PATH, 'static', 'href-to-favicons.json');

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  let fileNamesOfPosts = await fs.promises.readdir(POSTS_PATH);
  fileNamesOfPosts = fileNamesOfPosts.filter((path) => path.endsWith('.mdx'));

  const browser = await initializeBrowserInstance();
  const hrefToFaviconsMap: { [href: string]: FetchFaviconDataURLsResult } = {};
  await Promise.all(
    fileNamesOfPosts.map(async (fileNameOfPost) => {
      const { collectedHrefs } = await parseMDXFileAndCollectHrefs(POSTS_PATH, fileNameOfPost);
      await Promise.all(
        collectedHrefs.map(async (href) => {
          const favicons = await fetchFaviconDataURLs(href, { browser });
          hrefToFaviconsMap[href] = favicons;
        }),
      );
    }),
  );

  await browser.close();
  await fs.promises.writeFile(JSON_OUTPUT_PATH, safeStringify(hrefToFaviconsMap, null, 2), {
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
