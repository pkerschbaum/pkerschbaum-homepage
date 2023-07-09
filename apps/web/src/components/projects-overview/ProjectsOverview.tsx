import { styled } from '@linaria/react';
import type React from 'react';

import { ProjectTile } from '#pkg/components/project-tile/index.js';
import { QUERIES } from '#pkg/constants-browser.js';

type ProjectsOverviewProps = {};

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = () => {
  return (
    <ProjectsOverviewContainer>
      <ProjectTile
        project={{
          segment: 'file-explorer',
          title: 'File Explorer',
          description: 'Description of file explorer',
          thumbnailUrl: '/file-explorer-thumbnail.png',
        }}
      />
    </ProjectsOverviewContainer>
  );
};

const ProjectsOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: calc(2 * var(--spacing-base));
  grid-column-gap: calc(2 * var(--spacing-base));

  width: 100%;

  /* stylelint-disable-next-line media-query-no-invalid */
  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: 1fr 1fr;
  }
`;
