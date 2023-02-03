import type { GetStaticProps } from 'next';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Main } from '#pkg/components/main/index.js';
import { MetadataTags } from '#pkg/components/metadata-tags/index.js';
import { PATHS } from '#pkg/constants.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

type BlogOverviewPageProps = {
  posts: MDXFile[];
};

const BlogOverviewPage: React.FC<BlogOverviewPageProps> = ({ posts }) => {
  return (
    <>
      <MetadataTags title="Blog Posts" description="Blog of Patrick Kerschbaum" />

      <Main>
        <h1>All Posts</h1>

        <ArticlesList pathPrefix="/blog" articles={posts} />
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
