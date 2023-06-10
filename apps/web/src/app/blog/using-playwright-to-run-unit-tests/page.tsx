import type { Metadata } from 'next';
import path from 'path';
import type React from 'react';
import invariant from 'tiny-invariant';

import styles from '#pkg/app/blog/using-playwright-to-run-unit-tests/styles.module.css';
import { ArticleContainerBlogPost } from '#pkg/components/article-container-blog-post/index.js';
import { config } from '#pkg/config.js';
import { PATHS, ClassesAliases } from '#pkg/constants.js';
import { mapMDXParseResultToMetadata, parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';
import { fetchWebmentions } from '#pkg/webmentions/index.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];

const SEGMENT = path.parse(__dirname).name;

async function BlogPostPage() {
  invariant(faviconsClassName);

  const [mdxParseResult, { webmentions }] = await Promise.all([
    parseMDXFileAndCollectHrefs(path.join(PATHS.POSTS, `${SEGMENT}.mdx`)),
    fetchWebmentions(new URL(`/blog/${SEGMENT}`, `https://${config.canonicalTLDPlus1}`).href),
  ]);
  return (
    <ArticleContainerBlogPost
      mdxParseResult={mdxParseResult}
      webmentions={webmentions}
      faviconsClassName={faviconsClassName}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.POSTS, `${SEGMENT}.mdx`),
  );

  return mapMDXParseResultToMetadata(mdxParseResult);
}

export default BlogPostPage;

export { BLOG_REFETCH_INTERVAL_SECONDS as revalidate } from '#pkg/constants.js';
