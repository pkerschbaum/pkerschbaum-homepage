import { compile } from '@mdx-js/mdx';
import type { Root } from 'hast';
import fs from 'node:fs';
import rehypePrismGenerator from 'rehype-prism-plus/generator';
import remarkFrontmatter from 'remark-frontmatter';
import { VFile } from 'vfile';
import { matter } from 'vfile-matter';

import { refractor } from '#pkg/prism/refractor.js';
import { createCollectAndAugmentHeadingsPlugin } from '#pkg/rehype-plugins.js';
import { createCollectHrefsFromJsxElementsPlugin } from '#pkg/remark-plugins.js';
import type { Heading, MDXParseResult } from '#pkg/schema.js';
import { schema_frontmatterData } from '#pkg/schema.js';

const rehypePrismPlugin = rehypePrismGenerator(refractor) as (tree: Root) => void;

export function createMdxOptions({
  collectedHrefs,
  collectedHeadings,
}: {
  collectedHrefs: string[];
  collectedHeadings: Heading[];
}) {
  return {
    remarkPlugins: [
      /*
       * We just add the 'remark-frontmatter' plugin here to get rid of the frontmatter in the HTML output.
       * Parsing the frontmatter is actualy done with 'vfile' and 'vfile-matter'.
       */
      remarkFrontmatter,
      createCollectHrefsFromJsxElementsPlugin({ hrefs: collectedHrefs }),
    ],
    rehypePlugins: [
      rehypePrismPlugin,
      createCollectAndAugmentHeadingsPlugin({ headings: collectedHeadings }),
    ],
  };
}

export async function parseMDXFileAndCollectHrefs(
  fileAbsolutePath: string,
): Promise<MDXParseResult> {
  const source = await fs.promises.readFile(fileAbsolutePath, 'utf8');

  // parse frontmatter (taken from https://github.com/hashicorp/next-mdx-remote/blob/5ca106487cae7dfdb96af636d7c316c40f079108/src/serialize.ts)
  const vfile = new VFile(source);
  matter(vfile, { strip: true });
  const frontmatter = schema_frontmatterData.parse(vfile.data['matter']);

  const collectedHrefs: string[] = [];
  const collectedHeadings: Heading[] = [];
  await compile(vfile, createMdxOptions({ collectedHrefs, collectedHeadings }));

  const mdxParseResult: MDXParseResult = {
    frontmatter,
    collectedHrefs,
    collectedHeadings,
  };

  return mdxParseResult;
}
