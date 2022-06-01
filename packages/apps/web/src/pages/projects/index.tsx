import Head from 'next/head';
import type React from 'react';

import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';

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

      <h1>All Projects</h1>

      <ProjectsOverview />
    </>
  );
};

export default ProjectsPage;
