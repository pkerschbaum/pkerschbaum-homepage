import Image from 'next/image';
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
          <ThumbnailWrapper>
            <Thumbnail
              src={project.thumbnailUrl}
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="top center"
            />
          </ThumbnailWrapper>
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

const Thumbnail = styled(Image)``;

const StyledTileContent = styled(TileContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
