import type { ArrayElement } from '@pkerschbaum/commons-ecma/util/types';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'node:fs';
// @ts-expect-error -- it seems like typings of "rehype-prism-plus" are broken if TS is configured with "module": "node16" (ESM modules)
import rehypePrismGenerator from 'rehype-prism-plus/generator';

import { refractor } from '#pkg/prism/refractor.js';
import { createCollectAndAugmentHeadingsPlugin } from '#pkg/rehype-plugins.js';
import { createCollectHrefsFromJsxElementsPlugin } from '#pkg/remark-plugins.js';
import { Heading, MDXParseResult, schema_frontmatterData } from '#pkg/schema.js';

type BundlerRehypePlugin = ArrayElement<
  Exclude<
    Exclude<Parameters<typeof serialize>[1], undefined>['mdxOptions'],
    undefined
  >['rehypePlugins']
>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-call -- typings of "rehype-prism-plus" are broken
const rehypePrismPlugin = rehypePrismGenerator(refractor) as BundlerRehypePlugin;

export async function parseMDXFileAndCollectHrefs(
  fileAbsolutePath: string,
): Promise<MDXParseResult> {
  const source = await fs.promises.readFile(fileAbsolutePath, 'utf8');

  const collectedHrefs: string[] = [];
  const collectedHeadings: Heading[] = [];
  const bundleMDXResult = await serialize(source, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [createCollectHrefsFromJsxElementsPlugin({ hrefs: collectedHrefs })],
      rehypePlugins: [
        rehypePrismPlugin,
        createCollectAndAugmentHeadingsPlugin({ headings: collectedHeadings }),
      ],
    },
  });

  const frontmatter = schema_frontmatterData.parse(bundleMDXResult.frontmatter);
  const code = bundleMDXResult.compiledSource;
  const mdxParseResult: MDXParseResult = {
    frontmatter,
    code,
    collectedHrefs,
    collectedHeadings,
  };

  return mdxParseResult;
}
