import Image from 'next/image';
import type React from 'react';
import styled from 'styled-components';

import { Description, Tile, TileAnchor, TileContent, Title } from '#/elements';
import type { Project } from '#/schema';

type ProjectTileProps = {
  project: Project;
};

export const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  return (
    <TileAnchor key={project.segment} href={`/projects/${encodeURIComponent(project.segment)}`}>
      <StyledTile>
        <ThumbnailWrapper>
          <Thumbnail src={project.thumbnailUrl} alt="" fill sizes="100vw" />
        </ThumbnailWrapper>
        <StyledTileContent>
          <Title>{project.title}</Title>
          <Description>{project.description}</Description>
        </StyledTileContent>
      </StyledTile>
    </TileAnchor>
  );
};

const StyledTile = styled(Tile)`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'thumbnail description';
  align-items: stretch;
`;

const ThumbnailWrapper = styled.span`
  grid-area: thumbnail;
  height: 100%;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  position: relative;
`;

const Thumbnail = styled(Image)`
  object-fit: cover;
  object-position: top center;
`;

const StyledTileContent = styled(TileContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
