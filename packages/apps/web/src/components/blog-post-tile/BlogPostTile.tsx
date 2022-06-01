import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';
import type React from 'react';
import styled from 'styled-components';

import { Description, Tile, TileAnchor, TileContent, Title } from '~/elements';

type BlogPostTileProps = {
  post: MDXFile;
};

export const BlogPostTile: React.FC<BlogPostTileProps> = ({ post }) => (
  <TileAnchor key={post.segment} href={`/blog/${encodeURIComponent(post.segment)}`}>
    <Tile>
      <PostTileContent>
        <Title>{post.frontmatter.title}</Title>
        <Description>{post.frontmatter.description}</Description>
        <TagsArea>
          {post.frontmatter.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsArea>
      </PostTileContent>
    </Tile>
  </TileAnchor>
);

const PostTileContent = styled(TileContent)`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TagsArea = styled.ul`
  /* some margin-block-start for optical alignment */
  margin-block-start: 4px;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: calc(1 * var(--spacing-base));
`;

const Tag = styled.li`
  padding: calc(0.5 * var(--spacing-base)) calc(1 * var(--spacing-base));

  white-space: pre;
  font-size: var(--font-size-sm);
  border-radius: 4px;
  background-color: var(--color-bg-emphasized);
`;
