import { styled } from '@pigment-css/react';
import type React from 'react';

import { Image } from '#pkg/elements/Image.jsx';
import { Description, Tile, TileAnchor, TileContent, Title } from '#pkg/elements/index.js';
import type { Project } from '#pkg/schema.js';

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
  grid-template-areas: 'thumbnail description';
  grid-template-rows: 1fr;
  grid-template-columns: 200px 1fr;
  align-items: stretch;
`;

const ThumbnailWrapper = styled.span`
  position: relative;
  grid-area: thumbnail;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
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
