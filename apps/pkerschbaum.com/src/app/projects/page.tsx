import type { Metadata } from 'next';
import { notFound } from 'next/navigation.js';
import type React from 'react';

import { Main } from '#pkg/components/main/index.js';
import { ProjectsOverview } from '#pkg/components/projects-overview/ProjectsOverview.jsx';
import { config } from '#pkg/config.js';

const ProjectsPage: React.FC = () => {
  if (!config.featureFlags.projects) {
    notFound();
  }

  return (
    <Main>
      <h1>All Projects</h1>

      <ProjectsOverview />
    </Main>
  );
};

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Projects of Patrick Kerschbaum',
  openGraph: {
    title: 'Projects',
    description: 'Projects of Patrick Kerschbaum',
  },
};

export default ProjectsPage;
