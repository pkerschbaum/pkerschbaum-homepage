import { getMDXComponent } from 'mdx-bundler/client';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';
import invariant from 'tiny-invariant';

import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles, parseAndBundleMDXFile } from '~/mdx';
import type { MDXParseResult } from '~/types';

type BlogPostPageProps = {
  mdxParseResult: MDXParseResult;
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ mdxParseResult }) => {
  const Component = React.useMemo(
    () => getMDXComponent(mdxParseResult.code),
    [mdxParseResult.code],
  );

  return (
    <>
      <Head>
        <title>{mdxParseResult.frontmatter.title} - Patrick Kerschbaum</title>
        <meta name="description" content={mdxParseResult.frontmatter.description} />
      </Head>

      <Container>
        <h1>{mdxParseResult.frontmatter.title}</h1>
        <Component />
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: var(--box-width-medium);
  align-self: center;

  & p {
    margin-bottom: var(--spacing-base);
  }
  & h1 {
    margin-bottom: calc(2 * var(--spacing-base));
  }
`;

export const getStaticProps: GetStaticProps<BlogPostPageProps, { slug?: string }> = async ({
  params,
}) => {
  invariant(params?.slug);

  const mdxParseResult = await parseAndBundleMDXFile(POSTS_PATH, params.slug);

  return {
    props: { mdxParseResult },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogPostPage;
