import fs from 'fs';

import { jsonUtil } from '@pkerschbaum-homepage/commons/util/json.util';
import { fetchFaviconsForAllHrefs } from '@pkerschbaum-homepage/fetch-favicon';

// eslint-disable-next-line code-import-patterns/patterns -- this file is executed with ts-node, but ts-node does not support path aliases OOTB
import { PATHS } from '../src/constants.js';

async function fetchFaviconsForAllHrefsAndWriteToFile() {
  const finalResult = await fetchFaviconsForAllHrefs(PATHS.POSTS);
  await fs.promises.writeFile(
    PATHS.FAVICONS_FOR_WEBSITES,
    jsonUtil.safeStringify(finalResult, null, 2),
    { encoding: 'utf-8' },
  );
}

void fetchFaviconsForAllHrefsAndWriteToFile();
