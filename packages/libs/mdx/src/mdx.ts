import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';

import { createCollectHrefsFromJsxElementsPlugin } from '~/plugins.js';

export async function parseMDXFileAndCollectHrefs(
  absolutePathToDirectory: string,
  slug: string,
): Promise<{ collectedHrefs: string[] }> {
  const source = await fs.promises.readFile(path.join(absolutePathToDirectory, slug), 'utf8');

  const collectedHrefs: string[] = [];
  const collectHrefsFromJsxElementsPlugin = await createCollectHrefsFromJsxElementsPlugin({
    hrefs: collectedHrefs,
  });
  await bundleMDX({
    source,
    cwd: absolutePathToDirectory,
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), collectHrefsFromJsxElementsPlugin];

      return options;
    },
  });

  return { collectedHrefs };
}
