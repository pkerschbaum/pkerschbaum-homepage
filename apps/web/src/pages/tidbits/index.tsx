import type { GetStaticProps } from 'next';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Main } from '#pkg/components/main/index.js';
import { MetadataTags } from '#pkg/components/metadata-tags/index.js';
import { PATHS } from '#pkg/constants.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

type TidbitsOverviewPageProps = {
  tidbits: MDXFile[];
};

const TidbitsOverviewPage: React.FC<TidbitsOverviewPageProps> = ({ tidbits }) => {
  return (
    <>
      <MetadataTags
        title="Tidbits"
        description="Short always-up-to-date articles written by Patrick Kerschbaum"
      />

      <Main>
        <h1>Tidbits</h1>

        <ArticlesList pathPrefix="/tidbits" articles={tidbits} />
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps<TidbitsOverviewPageProps> = async () => {
  const tidbits = await getAllMarkdownFiles(PATHS.TIDBITS);

  return {
    props: { tidbits },
  };
};

export default TidbitsOverviewPage;
