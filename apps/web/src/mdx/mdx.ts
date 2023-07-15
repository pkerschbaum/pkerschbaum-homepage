import fs from 'fs';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import path from 'path';

import {
  type MDXFile,
  type MDXParseResult,
  schema_frontmatterData,
} from '@pkerschbaum-homepage/mdx/schema';

export { parseMDXFileAndCollectHrefs } from '@pkerschbaum-homepage/mdx/mdx';
export type { MDXParseResult } from '@pkerschbaum-homepage/mdx/schema';

export async function getAllMarkdownFiles(absolutePathToDirectory: string): Promise<MDXFile[]> {
  let files = await fs.promises.readdir(absolutePathToDirectory);
  files = files.filter((path) => path.endsWith('.mdx'));

  const markdownFiles = await Promise.all(
    files.map(async (fileName) => {
      const source = await fs.promises.readFile(
        path.join(absolutePathToDirectory, fileName),
        'utf8',
      );

      const segment = fileName.replace(/\.mdx$/, '');
      const frontmatter = schema_frontmatterData.parse(matter(source).data);
      const markdownFile: MDXFile = {
        frontmatter,
        segment,
      };

      return markdownFile;
    }),
  );

  const publishedFiles = markdownFiles.filter((file) => file.frontmatter.published);

  return publishedFiles;
}

export function mapMDXParseResultToMetadata(mdxParseResult: MDXParseResult): Metadata {
  return {
    title: mdxParseResult.frontmatter.title,
    description: mdxParseResult.frontmatter.description,
    openGraph: {
      title: mdxParseResult.frontmatter.title,
      description: mdxParseResult.frontmatter.description,
    },
  };
}
