import * as React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { GetStaticPaths, GetStaticProps } from 'next';

import Button from '../../components/Button';
import type { FrontMatterData } from '../../components/types';

type PostPageProps = {
  frontMatter: FrontMatterData;
  mdxSource: MDXRemoteSerializeResult;
};

const PostPage: React.FC<PostPageProps> = ({ frontMatter: { title }, mdxSource }) => {
  return (
    <div className="mt-4">
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={{ Button, SyntaxHighlighter }} />
    </div>
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

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> = async ({
  params,
}) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts', params?.slug + '.mdx'), 'utf-8');
  const frontMatterFile = matter(markdownWithMeta);
  const frontMatter = frontMatterFile.data as FrontMatterData;
  const content = frontMatterFile.content;
  const mdxSource = await serialize(content);
  return {
    props: {
      frontMatter,
      slug: params?.slug,
      mdxSource,
    },
  };
};

export default PostPage;
