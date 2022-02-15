import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

import { Description, Tile, TileAnchor, TileContent, Title } from '~/elements/Tile';
import type { Project } from '~/types';

type ProjectTileProps = {
  project: Project;
};

export const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  return (
    <Link key={project.slug} href={`/project/${encodeURIComponent(project.slug)}`} passHref>
      <TileAnchor>
        <StyledTile>
          <Thumbnail src={project.thumbnailUrl} alt="" />
          <StyledTileContent>
            <Title>{project.title}</Title>
            <Description>{project.description}</Description>
          </StyledTileContent>
        </StyledTile>
      </TileAnchor>
    </Link>
  );
};

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  align-items: stretch;
`;

const Thumbnail = styled.img`
  object-fit: cover;
`;

const StyledTileContent = styled(TileContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
