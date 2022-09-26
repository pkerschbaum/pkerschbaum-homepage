import type { GetStaticProps } from 'next';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#/components/articles-list';
import { Main } from '#/components/main';
import { MetadataTags } from '#/components/metadata-tags';
import { PATHS } from '#/constants';
import { getAllMarkdownFiles } from '#/mdx';

type TidbitsOverviewPageProps = {
  tidbits: MDXFile[];
};

const TidbitsOverviewPage: React.FC<TidbitsOverviewPageProps> = ({ tidbits }) => {
  return (
    <>
      {/* TODO description? */}
      <MetadataTags title="Tidbits" description="" />

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
