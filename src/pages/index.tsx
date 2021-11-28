import type { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';

import { BlogOverview } from '~/components/blog-overview';
import { WelcomeMessage } from '~/components/welcome-message';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';
import type { MDXFile } from '~/types';

type HomePageProps = {
  posts: MDXFile[];
};

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Patrick Kerschbaum</title>
        <meta name="description" content="Homepage of Patrick Kerschbaum" />
      </Head>

      <WelcomeMessage />
      <BlogOverview posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);

  return {
    props: { posts },
  };
};

export default HomePage;
