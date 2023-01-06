import type { GetStaticProps } from 'next';
import type React from 'react';

import { Main } from '#pkg/components/main';
import { MetadataTags } from '#pkg/components/metadata-tags';
import { ProjectsOverview } from '#pkg/components/projects-overview/ProjectsOverview';
import { config } from '#pkg/config';

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
