import Link from 'next/link';
import type React from 'react';
import styled from 'styled-components';

import type { MDXFile } from '~/types';

type BlogOverviewProps = {
  posts: MDXFile[];
};

export const BlogOverview: React.FC<BlogOverviewProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${encodeURIComponent(post.slug)}`} passHref>
          <PostTileAnchor>
            <h5>{post.frontmatter.title}</h5>
            <p>{post.frontmatter.description}</p>
            <p>
              <small>{post.frontmatter.date}</small>
            </p>
          </PostTileAnchor>
        </Link>
      ))}
    </>
  );
};

const PostTileAnchor = styled.a`
  color: var(--color-fg);
  text-decoration: none;
`;
