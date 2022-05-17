import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';
import invariant from 'tiny-invariant';

import { CommentsSection } from '~/components/comments-section';
import { MDXViewer } from '~/components/mdx-client';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles, parseAndBundleMDXFile } from '~/mdx';
import type { MDXParseResult } from '~/schema';

type BlogPostPageProps = {
  mdxParseResult: MDXParseResult;
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ mdxParseResult }) => (
  <>
    <Head>
      <title>{mdxParseResult.frontmatter.title} - Patrick Kerschbaum</title>
      <meta name="description" content={mdxParseResult.frontmatter.description} />
    </Head>

    <Container>
      <h1>{mdxParseResult.frontmatter.title}</h1>
      <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
      <CommentsSection />
    </Container>
  </>
);

const Container = styled.div`
  width: 100%;
  max-width: var(--box-width-medium);
  align-self: center;

  & h2,
  & h3 {
    margin-block: 1.5em;
  }
  & p {
    margin-block: 1em;
  }
  & ul {
    margin-block: 0.75em;
  }
  & li {
    margin-block: 0.25em;
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
