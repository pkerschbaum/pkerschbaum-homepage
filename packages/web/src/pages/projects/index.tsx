import Head from 'next/head';
import type React from 'react';

import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Patrick Kerschbaum - Projects</title>
        <meta name="description" content="Projects of Patrick Kerschbaum" />
      </Head>

      <h1>All Projects</h1>

      <ProjectsOverview />
    </>
  );
};

export default ProjectsPage;
