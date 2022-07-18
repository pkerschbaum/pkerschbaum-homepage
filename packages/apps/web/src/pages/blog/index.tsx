import type { GetStaticProps } from 'next';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { BlogOverview } from '#/components/blog-overview';
import { Main } from '#/components/main';
import { MetadataTags } from '#/components/metadata-tags';
import { PATHS } from '#/constants';
import { getAllMarkdownFiles } from '#/mdx';

type BlogOverviewPageProps = {
  posts: MDXFile[];
};

const BlogOverviewPage: React.FC<BlogOverviewPageProps> = ({ posts }) => {
  return (
    <>
      <MetadataTags title="Blog Posts" description="Blog of Patrick Kerschbaum" />

      <Main>
        <h1>All Posts</h1>

        <BlogOverview posts={posts} />
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps<BlogOverviewPageProps> = async () => {
  const posts = await getAllMarkdownFiles(PATHS.POSTS);

  return {
    props: { posts },
  };
};

export default BlogOverviewPage;
