import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Main } from '#pkg/components/main/index.js';

type TidbitsOverviewPageProps = {
  tidbits: MDXFile[];
};

export const TidbitsOverviewPageContent: React.FC<TidbitsOverviewPageProps> = ({ tidbits }) => {
  return (
    <Main>
      <h1>Tidbits</h1>

      <ArticlesList pathPrefix="/tidbits" articles={tidbits} />
    </Main>
  );
};
