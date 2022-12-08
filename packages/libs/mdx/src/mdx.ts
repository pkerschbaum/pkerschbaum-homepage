import type { ArrayElement } from '@pkerschbaum/ts-utils';
import fs from 'fs';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
// @ts-expect-error -- it seems like typings of "rehype-prism-plus" are broken if TS is configured with "module": "node16" (ESM modules)
import rehypePrismGenerator from 'rehype-prism-plus/generator';

import { createCollectHrefsFromJsxElementsPlugin } from '#/plugins.js';
import { refractor } from '#/prism/refractor.js';
import { MDXParseResult, schema_frontmatterData } from '#/schema.js';

type BundlerRehypePlugin = ArrayElement<
  Parameters<Exclude<Parameters<typeof bundleMDX>[0]['mdxOptions'], undefined>>[0]['rehypePlugins']
>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- typings of "rehype-prism-plus" are broken
const rehypePrismPlugin = rehypePrismGenerator(refractor) as BundlerRehypePlugin;

export async function parseMDXFileAndCollectHrefs(
  fileAbsolutePath: string,
): Promise<MDXParseResult> {
  const source = await fs.promises.readFile(fileAbsolutePath, 'utf8');

  const collectedHrefs: string[] = [];
  const bundleMDXResult = await bundleMDX({
    source,
    cwd: path.parse(fileAbsolutePath).dir,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        createCollectHrefsFromJsxElementsPlugin({ hrefs: collectedHrefs }),
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrismPlugin];

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
