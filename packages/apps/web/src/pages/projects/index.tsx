import type { GetStaticProps } from 'next';
import Head from 'next/head';
import type React from 'react';

import { Main } from '~/components/main';
import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';
import { config } from '~/config';

const ProjectsPage: React.FC = () => {
  const title = 'Projects';
  const description = 'Projects of Patrick Kerschbaum';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <Main>
        <h1>All Projects</h1>

        <ProjectsOverview />
      </Main>
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {},
    // exclude page from production build
    notFound: !config.featureFlags.projects,
  };
};

export default ProjectsPage;
