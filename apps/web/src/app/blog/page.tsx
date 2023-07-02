import type { Metadata } from 'next';
import type React from 'react';

import { BlogOverviewPageContent } from '#pkg/app/blog/page-content';
import { PATHS } from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

async function BlogOverviewPage() {
  const posts = await getAllMarkdownFiles(PATHS.POSTS);
  return <BlogOverviewPageContent posts={posts} />;
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
