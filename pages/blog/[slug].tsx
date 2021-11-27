import * as React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import invariant from 'tiny-invariant';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import type { GetStaticPaths, GetStaticProps } from 'next';

import type { FrontMatterData } from '../../components/types';

type PostPageProps = {
  frontMatter: FrontMatterData;
  mdxSource: MDXRemoteSerializeResult;
};

const PostPage: React.FC<PostPageProps> = ({ frontMatter: { title }, mdxSource }) => {
  return (
    <>
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.mdx', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

const POSTS_PATH = 'posts';

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> = async ({
  params,
}) => {
  invariant(params?.slug);
  const markdownWithMeta = await fs.promises.readFile(
    path.join(POSTS_PATH, params.slug + '.mdx'),
    'utf-8',
  );
  const frontMatterFile = matter(markdownWithMeta);
  const frontMatter = frontMatterFile.data as FrontMatterData;
  const content = frontMatterFile.content;
  const mdxSource = await serialize(content);
  return {
    props: {
      frontMatter,
      slug: params.slug,
      mdxSource,
    },
  };
};

export default PostPage;
