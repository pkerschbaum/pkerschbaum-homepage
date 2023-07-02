import { css } from '@linaria/core';
import { styled } from '@linaria/react';
import Image from 'next/image.js';
import type React from 'react';

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

const Thumbnail: React.FC<React.ComponentProps<typeof Image>> = ({
  className,
  alt,
  ...delegated
}) => {
  return <Image alt={alt} className={`${className ?? ''} ${thumbnailCss}`} {...delegated} />;
};

const thumbnailCss = css`
  object-fit: cover;
  object-position: top center;
`;

const StyledTileContent = styled(TileContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
