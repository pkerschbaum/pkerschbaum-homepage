import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type React from 'react';

import { BlogOverview } from '~/components/blog-overview';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';
import type { MDXFile } from '~/schema';

type BlogOverviewPageProps = {
  posts: MDXFile[];
};

const BlogOverviewPage: React.FC<BlogOverviewPageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Patrick Kerschbaum - Blog</title>
        <meta name="description" content="Blog of Patrick Kerschbaum" />
      </Head>

      <h1>All Posts</h1>

      <BlogOverview posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogOverviewPageProps> = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);

  return {
    props: { posts },
  };
};

export default BlogOverviewPage;
