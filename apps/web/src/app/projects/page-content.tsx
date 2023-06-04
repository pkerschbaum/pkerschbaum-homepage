'use client';

import type React from 'react';

import { Main } from '#pkg/components/main/index.js';
import { ProjectsOverview } from '#pkg/components/projects-overview/ProjectsOverview.jsx';

export const ProjectsPageContent: React.FC = () => {
  return (
    <Main>
      <h1>All Projects</h1>

      <ProjectsOverview />
    </Main>
  );
};
