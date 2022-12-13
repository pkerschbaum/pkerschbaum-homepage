import fs from 'fs';
import path from 'path';

import { jsonUtil } from '@pkerschbaum-homepage/commons/util/json.util';
import { fetchFaviconsForAllHrefs } from '@pkerschbaum-homepage/fetch-favicon';

// eslint-disable-next-line code-import-patterns/patterns -- this file is executed with ts-node, but ts-node does not support path aliases OOTB
import { PATHS } from '../src/constants.js';

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  const [postsFileBasenames, tidbitsFileBasenames] = await Promise.all([
    fs.promises.readdir(PATHS.POSTS),
    fs.promises.readdir(PATHS.TIDBITS),
  ]);
  const postsWithAbsolutePaths = postsFileBasenames
    .filter((path) => path.endsWith('.mdx'))
    .map((basename) => path.join(PATHS.POSTS, basename));
  const tidbitsWithAbsolutePaths = tidbitsFileBasenames
    .filter((path) => path.endsWith('.mdx'))
    .map((basename) => path.join(PATHS.TIDBITS, basename));
  const filesWithAbsolutePaths = [...postsWithAbsolutePaths, ...tidbitsWithAbsolutePaths];

  const finalResult = await fetchFaviconsForAllHrefs(filesWithAbsolutePaths);
  await fs.promises.writeFile(
    PATHS.FAVICONS_FOR_WEBSITES,
    jsonUtil.safeStringify(finalResult, null, 2),
    { encoding: 'utf-8' },
  );
}

void fetchFaviconsForAllHrefsAndWriteToFile();
