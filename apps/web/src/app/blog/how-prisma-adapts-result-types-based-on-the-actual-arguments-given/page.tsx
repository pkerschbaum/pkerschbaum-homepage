import type { Metadata } from 'next';
import path from 'path';
import type React from 'react';

import { BlogPostPageContent } from '#pkg/app/blog/how-prisma-adapts-result-types-based-on-the-actual-arguments-given/page-content';
import { config } from '#pkg/config.js';
import { PATHS } from '#pkg/constants.js';
import { mapMDXParseResultToMetadata, parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';
import { fetchWebmentions } from '#pkg/webmentions/index.js';

const SEGMENT = path.parse(__dirname).name;

async function BlogPostPage() {
  const [mdxParseResult, { webmentions }] = await Promise.all([
    parseMDXFileAndCollectHrefs(path.join(PATHS.POSTS, `${SEGMENT}.mdx`)),
    fetchWebmentions(new URL(`/blog/${SEGMENT}`, `https://${config.canonicalTLDPlus1}`).href),
  ]);
  return <BlogPostPageContent mdxParseResult={mdxParseResult} webmentions={webmentions} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.POSTS, `${SEGMENT}.mdx`),
  );

  return mapMDXParseResultToMetadata(mdxParseResult);
}

export default BlogPostPage;

export { BLOG_REFETCH_INTERVAL_SECONDS as revalidate } from '#pkg/constants.js';
