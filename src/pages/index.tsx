import type { GetStaticProps } from 'next';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';

import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';
import type { MDXFile } from '~/types';

type HomeProps = {
  posts: MDXFile[];
};

const Home: React.FC<HomeProps> = ({ posts }) => {
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

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);

  return {
    props: { posts },
  };
};

export default Home;
