import fs from 'fs';
import path from 'path';

import { jsonUtil } from '@pkerschbaum-homepage/commons-ecma/util/json.util';
import { fetchFaviconsForAllHrefs } from '@pkerschbaum-homepage/fetch-favicon';

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

  const finalResult = await fetchFaviconsForAllHrefs(filesWithAbsolutePaths);
  await fs.promises.writeFile(
    PATHS.FAVICONS_FOR_WEBSITES,
    jsonUtil.safeStringify(finalResult, undefined, 2),
    { encoding: 'utf8' },
  );
}

void fetchFaviconsForAllHrefsAndWriteToFile();
