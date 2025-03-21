import { styled } from '@pigment-css/react';
import type React from 'react';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { Description, Tile, TileAnchor, TileContent, Title } from '#pkg/elements/index.js';

type ArticleTileProps = {
  article: MDXFile;
  href: string;
};

export const ArticleTile: React.FC<ArticleTileProps> = ({ article, href }) => (
  <TileAnchor key={article.segment} href={href}>
    <Tile>
      <ArticleTileContent>
        <Title>{article.frontmatter.title}</Title>
        <Description>{article.frontmatter.description}</Description>
        <TagsArea>
          {article.frontmatter.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </TagsArea>
      </ArticleTileContent>
    </Tile>
  </TileAnchor>
);

const ArticleTileContent = styled(TileContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`;

const TagsArea = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: calc(1 * var(--spacing-base));
  align-items: center;

  /* some margin-block-start for optical alignment */
  margin-block-start: 4px;
`;

const Tag = styled.li`
  padding: calc(0.5 * var(--spacing-base)) calc(1 * var(--spacing-base));

  font-size: var(--font-size-sm);
  white-space: pre;
  background-color: var(--color-bg-emphasized);
  border-radius: 4px;
`;
