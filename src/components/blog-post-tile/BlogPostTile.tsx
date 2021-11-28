import dayjs from 'dayjs';
import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

import type { MDXFile } from '~/types';

type BlogPostTileProps = {
  post: MDXFile;
};

export const BlogPostTile: React.FC<BlogPostTileProps> = ({ post }) => {
  const formattedPublishedAt = dayjs(post.frontmatter.publishedAtISO).format('MMMM D, YYYY');

  return (
    <Link key={post.slug} href={`/blog/${encodeURIComponent(post.slug)}`} passHref>
      <TileAnchor>
        <Tile>
          <Title>{post.frontmatter.title}</Title>
          <Description>{post.frontmatter.description}</Description>
          <PublishedAt>{formattedPublishedAt}</PublishedAt>
          <TagsArea>
            {post.frontmatter.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsArea>
        </Tile>
      </TileAnchor>
    </Link>
  );
};

export const TileAnchor = styled.a`
  color: var(--color-fg);
  text-decoration: none;
`;

export const Tile = styled.article`
  height: 100%;

  padding: calc(2 * var(--spacing-base)) calc(1.5 * var(--spacing-base));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: calc(0.5 * var(--spacing-base));

  border-radius: 4px;
  box-shadow: var(--shadow-elevation-medium);
`;

const Title = styled.h3``;

const Description = styled.p`
  flex-grow: 1;

  text-align: justify;
`;

const PublishedAt = styled.p`
  color: var(--color-fg-less-emphasized);
  font-style: italic;
`;

const TagsArea = styled.ul`
  /* some margin-top for optical alignment */
  margin-top: 4px;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: calc(1 * var(--spacing-base));
`;

const Tag = styled.li`
  padding: calc(0.5 * var(--spacing-base)) calc(1.5 * var(--spacing-base));

  white-space: pre;
  border-radius: 4px;
  background-color: var(--color-bg-emphasized);
`;
