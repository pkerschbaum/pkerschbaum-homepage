import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';

import { createCollectHrefsFromJsxElementsPlugin } from '~/plugins.js';
import { myPrismPlugin } from '~/prism/lang-prisma.js';
import { MDXParseResult, schema_frontmatterData } from '~/schema.js';

export async function parseMDXFileAndCollectHrefs(
  absolutePathToDirectory: string,
  fileName: string,
): Promise<MDXParseResult> {
  const source = await fs.promises.readFile(path.join(absolutePathToDirectory, fileName), 'utf8');

  const collectedHrefs: string[] = [];
  const bundleMDXResult = await bundleMDX({
    source,
    cwd: absolutePathToDirectory,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        createCollectHrefsFromJsxElementsPlugin({ hrefs: collectedHrefs }),
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), myPrismPlugin];

      return options;
    },
  });

  const frontmatter = schema_frontmatterData.parse(bundleMDXResult.frontmatter);
  const code = bundleMDXResult.code;
  const mdxParseResult: MDXParseResult = {
    frontmatter,
    code,
    collectedHrefs,
  };

  return mdxParseResult;
}
