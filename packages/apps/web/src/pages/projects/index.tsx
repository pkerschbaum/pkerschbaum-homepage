import type { GetStaticProps } from 'next';
import type React from 'react';

import { Main } from '#/components/main';
import { MetadataTags } from '#/components/metadata-tags';
import { ProjectsOverview } from '#/components/projects-overview/ProjectsOverview';
import { config } from '#/config';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <MetadataTags title="Projects" description="Projects of Patrick Kerschbaum" />

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
