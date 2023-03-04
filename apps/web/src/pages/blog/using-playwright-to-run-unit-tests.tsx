import type { GetStaticProps } from 'next';
import path from 'path';
import * as React from 'react';
import invariant from 'tiny-invariant';

import {
  PageContainerBlogPost,
  PageContainerBlogPostPropsBase,
} from '#pkg/components/page-container-blog-post/index.js';
import { config } from '#pkg/config.js';
import { ClassesAliases, PATHS } from '#pkg/constants.js';
import { createFaviconsMapping } from '#pkg/favicons/favicons.js';
import { parseMDXFileAndCollectHrefs } from '#pkg/mdx/index.js';
import styles from '#pkg/pages/blog/using-playwright-to-run-unit-tests.module.css';
import { fetchWebmentions } from '#pkg/webmentions/index.js';

const faviconsClassName = styles[ClassesAliases.FAVICONS];
invariant(faviconsClassName);

const BlogPostPage: React.FC<PageContainerBlogPostPropsBase> = (props) => {
  return <PageContainerBlogPost {...props} faviconsClassName={faviconsClassName} />;
};

const segment = 'using-playwright-to-run-unit-tests';

export const getStaticProps: GetStaticProps<PageContainerBlogPostPropsBase> = async () => {
  const [{ mdxParseResult, faviconDataURLsForWebsiteURLs }, { webmentions }] = await Promise.all([
    fetchMDXFileAndFavicons(segment),
    fetchWebmentions(new URL(`/blog/${segment}`, `https://${config.canonicalTLDPlus1}`).href),
  ]);

  return {
    props: {
      mdxParseResult,
      faviconDataURLsForWebsiteURLs,
      webmentions,
    },
    revalidate: 60, // seconds
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
