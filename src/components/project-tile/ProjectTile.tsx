import Link from 'next/link';
import type React from 'react';

import { Tile, TileAnchor } from '~/components/blog-post-tile';
import type { Project } from '~/types';

type ProjectTileProps = {
  project: Project;
};

export const ProjectTile: React.FC<ProjectTileProps> = ({ project }) => {
  return (
    <Link key={project.slug} href={`/project/${encodeURIComponent(project.slug)}`} passHref>
      <TileAnchor>
        <Tile>TODO implement</Tile>
      </TileAnchor>
    </Link>
  );
};
