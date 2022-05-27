import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';

import { createCollectHrefsFromJsxElementsPlugin } from '~/mdx/plugins';
import { MDXFile, MDXParseResult, schema_frontmatterData } from '~/schema';

export async function getAllMarkdownFiles(absolutePathToDirectory: string): Promise<MDXFile[]> {
  let files = await fs.promises.readdir(absolutePathToDirectory);
  files = files.filter((path) => path.endsWith('.mdx'));

  const markdownFiles = await Promise.all(
    files.map(async (fileName) => {
      const source = await fs.promises.readFile(
        path.join(absolutePathToDirectory, fileName),
        'utf8',
      );

      const slug = fileName.replace(/\.mdx$/, '');
      const frontmatter = schema_frontmatterData.parse(matter(source).data);
      const markdownFile: MDXFile = {
        frontmatter,
        slug,
      };

      return markdownFile;
    }),
  );

  const publishedFiles = markdownFiles.filter((file) => file.frontmatter.published);

  return publishedFiles;
}

export async function parseAndBundleMDXFile(
  absolutePathToDirectory: string,
  slug: string,
): Promise<MDXParseResult> {
  const source = await fs.promises.readFile(
    path.join(absolutePathToDirectory, `${slug}.mdx`),
    'utf8',
  );

  const collectedHrefs: string[] = [];
  const bundleMDXResult = await bundleMDX({
    source,
    cwd: absolutePathToDirectory,
    mdxOptions: (options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        createCollectHrefsFromJsxElementsPlugin({ hrefs: collectedHrefs }),
      ];

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
