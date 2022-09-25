import type { GetStaticProps } from 'next';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#/components/articles-list';
import { Main } from '#/components/main';
import { MetadataTags } from '#/components/metadata-tags';
import { PATHS } from '#/constants';
import { getAllMarkdownFiles } from '#/mdx';

type NotesOverviewPageProps = {
  notes: MDXFile[];
};

const NotesOverviewPage: React.FC<NotesOverviewPageProps> = ({ notes }) => {
  return (
    <>
      {/* TODO description? */}
      <MetadataTags title="Notes" description="" />

      <Main>
        <h1>Notes</h1>

        <ArticlesList pathPrefix="/notes" articles={notes} />
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps<NotesOverviewPageProps> = async () => {
  const notes = await getAllMarkdownFiles(PATHS.NOTES);

  return {
    props: { notes },
  };
};

export default NotesOverviewPage;
