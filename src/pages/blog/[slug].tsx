import dayjs from 'dayjs';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { dehydrate } from 'react-query';
import styled from 'styled-components';
import invariant from 'tiny-invariant';

import { CommentsSection } from '~/components/comments-section';
import { MDXViewer } from '~/components/mdx-viewer';
import { POSTS_PATH } from '~/constants';
import { cacheKeys, createQueryClient } from '~/global-cache';
import { getAllMarkdownFiles, parseAndBundleMDXFile } from '~/mdx';
import { fetchFaviconDataURL } from '~/operations/favicon';
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

    <BlogPostContainer>
      <FrontMatter>
        <h1>{mdxParseResult.frontmatter.title}</h1>
        <Time dateTime={mdxParseResult.frontmatter.publishedAtISO}>
          Published on {dayjs(mdxParseResult.frontmatter.publishedAtISO).format('DD MMM, YYYY')}
        </Time>
      </FrontMatter>
      <div>
        <MDXViewer codeOfMdxParseResult={mdxParseResult.code} />
      </div>
      <CommentsSection />
    </BlogPostContainer>
  </>
);

const BlogPostContainer = styled.article`
  width: 100%;
  max-width: var(--box-width-medium);
  align-self: center;

  display: flex;
  flex-direction: column;
  gap: calc(2 * var(--spacing-base));

  & p {
    margin-block: 1em;
  }
  & ul {
    margin-block: 0.75em;
    padding-inline-start: 20px;
  }
  & ul li,
  & ul ul li {
    list-style-type: initial;
  }
  & li {
    margin-block: 0.25em;
  }

  & h1,
  & h2,
  & h3 {
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
`;

const FrontMatter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-base);

  text-align: center;
`;

const Time = styled.time`
  color: var(--color-fg-less-emphasized);
  text-transform: uppercase;
`;

export const getStaticProps: GetStaticProps<BlogPostPageProps, { slug?: string }> = async ({
  params,
}) => {
  invariant(params?.slug);

  const mdxParseResult = await parseAndBundleMDXFile(POSTS_PATH, params.slug);

  const queryClient = createQueryClient();
  await Promise.all(
    mdxParseResult.collectedHrefs.map(async (href) => {
      await queryClient.prefetchQuery(cacheKeys.favicon(href), async () => {
        return await fetchFaviconDataURL(href);
      });
    }),
  );

  return {
    props: {
      mdxParseResult,
      dehydratedState: dehydrate(queryClient),
    },
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
