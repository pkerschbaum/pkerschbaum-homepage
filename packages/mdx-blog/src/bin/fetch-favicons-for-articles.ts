import { arrays } from '@pkerschbaum/commons-ecma/util/arrays';
import { jsonUtil } from '@pkerschbaum/commons-ecma/util/json';
import { fetchFavicons } from '@pkerschbaum/fetch-favicon';
import fs from 'node:fs';
import path from 'node:path';

import { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';

import { PATHS } from '#pkg/constants-server.js';

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  const [postsBasenames, tidbitBasenames] = await Promise.all([
    fs.promises.readdir(PATHS.POSTS),
    fs.promises.readdir(PATHS.TIDBITS),
  ]);
  const postsWithAbsolutePaths = postsBasenames
    .filter((path) => path.endsWith('.mdx'))
    .map((basename) => path.join(PATHS.POSTS, basename));
  const tidbitsWithAbsolutePaths = tidbitBasenames
    .filter((path) => path.endsWith('.mdx'))
    .map((basename) => path.join(PATHS.TIDBITS, basename));
  const filesWithAbsolutePaths = [...postsWithAbsolutePaths, ...tidbitsWithAbsolutePaths];

  // Collect all hrefs of all posts (with duplicates removed)
  let hrefsOfAllPosts: string[] = [];
  await Promise.all(
    filesWithAbsolutePaths.map(async (fileAbsolutePath) => {
      const { collectedHrefs } = await parseMDXFileAndCollectHrefs(fileAbsolutePath);
      hrefsOfAllPosts.push(...collectedHrefs);
    }),
  );
  hrefsOfAllPosts = arrays.uniqueValues(hrefsOfAllPosts);

  const finalResult = await fetchFavicons(hrefsOfAllPosts);
  await fs.promises.writeFile(
    PATHS.FAVICONS_FOR_WEBSITES,
    jsonUtil.safeStringify(finalResult, undefined, 2),
    { encoding: 'utf8' },
  );
}

void fetchFaviconsForAllHrefsAndWriteToFile();
