import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type React from 'react';

import { BlogOverview } from '~/components/blog-overview';
import { SeoHead } from '~/components/seo-head';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';

type BlogOverviewPageProps = {
  posts: MDXFile[];
};

const BlogOverviewPage: React.FC<BlogOverviewPageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <SeoHead title="Blog Posts" description="Blog of Patrick Kerschbaum" />
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
