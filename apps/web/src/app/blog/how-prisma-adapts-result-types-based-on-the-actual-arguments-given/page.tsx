import type { Metadata } from 'next';
import path from 'path';
import type React from 'react';
import invariant from 'tiny-invariant';

import { MDXContentClientComponent } from '#pkg/app/blog/how-prisma-adapts-result-types-based-on-the-actual-arguments-given/mdx-content-client-component.jsx';
import styles from '#pkg/app/blog/how-prisma-adapts-result-types-based-on-the-actual-arguments-given/styles.module.css';
import { ArticleContainerBlogPost } from '#pkg/components/article-container-blog-post/index.js';
import { ClassesAliases } from '#pkg/constants-browser.js';
import { PATHS } from '#pkg/constants-server.js';
import { mapMDXParseResultToMetadata, parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];

const SEGMENT = path.parse(__dirname).name;

async function BlogPostPage() {
  invariant(faviconsClassName);

  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.POSTS, `${SEGMENT}.mdx`),
  );

  return (
    <ArticleContainerBlogPost
      mdxContent={<MDXContentClientComponent />}
      mdxParseResult={mdxParseResult}
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

export { BLOG_REFETCH_INTERVAL_SECONDS as revalidate } from '#pkg/constants-server.js';
