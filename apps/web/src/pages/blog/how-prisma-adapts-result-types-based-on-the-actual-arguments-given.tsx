import type { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';
import invariant from 'tiny-invariant';

import {
  PageContainerBlogPost,
  PageContainerBlogPostPropsBase,
} from '#pkg/components/page-container-blog-post/index.js';
import { config } from '#pkg/config.js';
import { BLOG_REFETCH_INTERVAL_SECONDS, ClassesAliases, PATHS } from '#pkg/constants.js';
import { createFaviconsMapping } from '#pkg/favicons/favicons.js';
import { parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';
import styles from '#pkg/pages/blog/how-prisma-adapts-result-types-based-on-the-actual-arguments-given.module.css';
import { fetchWebmentions } from '#pkg/webmentions/index.js';

const SEGMENT = path.parse(__filename).name;

const faviconsClassName = styles[ClassesAliases.FAVICONS];
invariant(faviconsClassName);

const BlogPostPage: React.FC<PageContainerBlogPostPropsBase> = (props) => {
  return <PageContainerBlogPost {...props} faviconsClassName={faviconsClassName} />;
};

export const getStaticProps: GetStaticProps<PageContainerBlogPostPropsBase> = async () => {
  const [{ mdxParseResult }, { webmentions }] = await Promise.all([
    fetchMDXFileAndFavicons(SEGMENT),
    fetchWebmentions(new URL(`/blog/${SEGMENT}`, `https://${config.canonicalTLDPlus1}`).href),
  ]);

  return {
    props: {
      mdxParseResult,
      webmentions,
    },
    revalidate: BLOG_REFETCH_INTERVAL_SECONDS,
  };
};

export default BlogPostPage;

async function fetchMDXFileAndFavicons(segment: string) {
  const mdxParseResult = await parseMDXFileAndCollectHrefs(
    path.join(PATHS.POSTS, `${segment}.mdx`),
  );

  const faviconDataURLsForWebsiteURLs = await createFaviconsMapping(mdxParseResult);

  return {
    mdxParseResult,
    faviconDataURLsForWebsiteURLs,
  };
}
