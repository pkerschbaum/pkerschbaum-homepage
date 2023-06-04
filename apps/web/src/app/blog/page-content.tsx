'use client';

import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Main } from '#pkg/components/main/index.js';

type BlogOverviewPageProps = {
  posts: MDXFile[];
};

export const BlogOverviewPageContent: React.FC<BlogOverviewPageProps> = ({ posts }) => {
  return (
    <Main>
      <h1>All Posts</h1>

      <ArticlesList pathPrefix="/blog" articles={posts} />
    </Main>
  );
};
