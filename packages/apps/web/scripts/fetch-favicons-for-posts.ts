import fs from 'fs';
import safeStringify from 'safe-stable-stringify';

import { fetchFaviconsForAllHrefs } from '@pkerschbaum-homepage/fetch-favicon';

// eslint-disable-next-line code-import-patterns/patterns -- this file is executed with ts-node, but ts-node does not support path aliases OOTB
import { PATHS } from '../src/constants.js';

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  const finalResult = await fetchFaviconsForAllHrefs(PATHS.POSTS);
  await fs.promises.writeFile(
    PATHS.FAVICONS_FOR_WEBSITES,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
    safeStringify(finalResult, null, 2),
    { encoding: 'utf-8' },
  );
}

void fetchFaviconsForAllHrefsAndWriteToFile();
