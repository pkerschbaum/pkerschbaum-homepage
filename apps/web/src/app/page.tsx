import type { Metadata } from 'next';
import type React from 'react';

import { PageContent } from '#pkg/app/page-content';
import { PATHS } from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

async function HomePage() {
  const [posts, tidbits] = await Promise.all([
    getAllMarkdownFiles(PATHS.POSTS),
    getAllMarkdownFiles(PATHS.TIDBITS),
  ]);

  return <PageContent posts={posts} tidbits={tidbits} />;
}

export const metadata: Metadata = {
  title: 'Homepage of Patrick Kerschbaum',
  description: 'Homepage of Patrick Kerschbaum',
  openGraph: {
    title: 'Homepage of Patrick Kerschbaum',
    description: 'Homepage of Patrick Kerschbaum',
  },
};

export default HomePage;
