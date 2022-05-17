import type React from 'react';
import styled from 'styled-components';

import { BlogPostTile } from '~/components/blog-post-tile';
import { QUERIES } from '~/constants';
import type { MDXFile } from '~/schema';

type BlogOverviewProps = {
  posts: MDXFile[];
};

export const BlogOverview: React.FC<BlogOverviewProps> = ({ posts }) => {
  return (
    <BlogOverviewContainer>
      {posts.map((post) => (
        <BlogPostTile key={post.slug} post={post} />
      ))}
    </BlogOverviewContainer>
  );
};

const BlogOverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: calc(2 * var(--spacing-base));
  grid-column-gap: calc(2 * var(--spacing-base));
  align-items: stretch;

  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: 1fr 1fr;
  }
`;
