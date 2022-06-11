import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type React from 'react';

import { BlogOverview } from '~/components/blog-overview';
import { Main } from '~/components/main';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';

type BlogOverviewPageProps = {
  posts: MDXFile[];
};

const BlogOverviewPage: React.FC<BlogOverviewPageProps> = ({ posts }) => {
  const title = 'Blog Posts';
  const description = 'Blog of Patrick Kerschbaum';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Main>
        <h1>All Posts</h1>

        <BlogOverview posts={posts} />
      </Main>
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
