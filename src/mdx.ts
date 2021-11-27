import fs from 'fs';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';

import type { FrontmatterData, MDXFile, MDXParseResult } from '~/types';

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
      const frontmatter = matter(source).data as FrontmatterData;
      const markdownFile: MDXFile = {
        frontmatter,
        slug,
      };

      return markdownFile;
    }),
  );

  return markdownFiles;
}

export async function parseAndBundleMDXFile(
  absolutePathToDirectory: string,
  slug: string,
): Promise<MDXParseResult> {
  const source = await fs.promises.readFile(
    path.join(absolutePathToDirectory, `${slug}.mdx`),
    'utf8',
  );

  const bundleMDXResult = await bundleMDX({
    source,
    cwd: absolutePathToDirectory,
  });

  const frontmatter = bundleMDXResult.frontmatter as FrontmatterData;
  const code = bundleMDXResult.code;
  const mdxParseResult: MDXParseResult = {
    frontmatter,
    code,
  };

  return mdxParseResult;
}
