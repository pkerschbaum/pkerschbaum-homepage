import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type React from 'react';

import { ProjectsPageContent } from '#pkg/app/projects/page-content';
import { config } from '#pkg/config.js';

const ProjectsPage: React.FC = () => {
  if (!config.featureFlags.projects) {
    notFound();
  }

  return <ProjectsPageContent />;
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
