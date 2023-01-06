import type { GetStaticProps } from 'next';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#pkg/components/articles-list';
import { Main } from '#pkg/components/main';
import { MetadataTags } from '#pkg/components/metadata-tags';
import { PATHS } from '#pkg/constants';
import { getAllMarkdownFiles } from '#pkg/mdx';

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
