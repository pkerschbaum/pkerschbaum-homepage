import * as React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import styled from 'styled-components';

import type { FrontMatterData } from '../components/types';

type HomeProps = {
  posts: Post[];
};

type Post = {
  slug: string;
  frontMatter: FrontMatterData;
};

const Home: React.FC<HomeProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${encodeURIComponent(post.slug)}`} passHref>
          <PostTileAnchor>
            <h5>{post.frontMatter.title}</h5>
            <p>{post.frontMatter.description}</p>
            <p>
              <small>{post.frontMatter.date}</small>
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

const POSTS_PATH = 'posts';

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const files = await fs.promises.readdir(POSTS_PATH);
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(POSTS_PATH, filename), 'utf-8');
    const frontMatter = matter(markdownWithMeta).data as FrontMatterData;
    const filenameWithoutExtension = filename.split('.').slice(0, -1).join('');
    return {
      frontMatter,
      slug: filenameWithoutExtension,
    };
  });
  return {
    props: {
      posts,
    },
  };
};

export default Home;
