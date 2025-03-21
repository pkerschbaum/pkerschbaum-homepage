import type { Metadata } from 'next';
import type React from 'react';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Main } from '#pkg/components/main/index.js';
import { PATHS } from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

async function BlogOverviewPage() {
  const posts = await getAllMarkdownFiles(PATHS.POSTS);
  return (
    <Main>
      <h1>All Posts</h1>

      <ArticlesList pathPrefix="/blog" articles={posts} />
    </Main>
  );
}

export const metadata: Metadata = {
  title: 'Blog Posts',
  description: 'Blog of Patrick Kerschbaum',
  openGraph: {
    title: 'Blog Posts',
    description: 'Blog of Patrick Kerschbaum',
  },
};

export default BlogOverviewPage;
