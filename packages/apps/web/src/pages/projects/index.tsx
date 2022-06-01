import Head from 'next/head';
import type React from 'react';

import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';
import { SeoHead } from '~/components/seo-head';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <Head>
        <SeoHead title="Projects" description="Projects of Patrick Kerschbaum" />
      </Head>

      <h1>All Projects</h1>

      <ProjectsOverview />
    </>
  );
};

export default ProjectsPage;
