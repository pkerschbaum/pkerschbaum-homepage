import type React from 'react';
import styled from 'styled-components';

import fileExplorerThumbnailUrl from '../../../public/file-explorer-thumbnail.png';
import { ProjectTile } from '~/components/project-tile';
import { QUERIES } from '~/constants';

type ProjectsOverviewProps = {};

export const ProjectsOverview: React.FC<ProjectsOverviewProps> = () => {
  return (
    <ProjectsOverviewContainer>
      <ProjectTile
        project={{
          slug: 'file-explorer',
          title: 'File Explorer',
          description: 'Description of file explorer',
          thumbnailUrl: fileExplorerThumbnailUrl,
        }}
      />
    </ProjectsOverviewContainer>
  );
};

const ProjectsOverviewContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: calc(2 * var(--spacing-base));
  grid-column-gap: calc(2 * var(--spacing-base));

  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: 1fr 1fr;
  }
`;
