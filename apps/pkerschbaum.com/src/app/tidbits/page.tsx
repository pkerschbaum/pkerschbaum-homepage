import type { Metadata } from 'next';
import type React from 'react';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Main } from '#pkg/components/main/index.js';
import { PATHS } from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

async function TidbitsOverviewPage() {
  const tidbits = await getAllMarkdownFiles(PATHS.TIDBITS);
  return (
    <Main>
      <h1>Tidbits</h1>

      <ArticlesList pathPrefix="/tidbits" articles={tidbits} />
    </Main>
  );
}

export const metadata: Metadata = {
  title: 'Tidbits',
  description: 'Short always-up-to-date articles written by Patrick Kerschbaum',
  openGraph: {
    title: 'Tidbits',
    description: 'Short always-up-to-date articles written by Patrick Kerschbaum',
  },
};

export default TidbitsOverviewPage;
