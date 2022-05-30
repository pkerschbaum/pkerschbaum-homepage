import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

import { BlogOverview } from '~/components/blog-overview';
import { Introduction } from '~/components/introduction';
import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';

type HomePageProps = {
  posts: MDXFile[];
};

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Patrick Kerschbaum</title>
        <meta name="description" content="Homepage of Patrick Kerschbaum" />
      </Head>

      <Introduction />

      <HomepageSection>
        <SectionHeading>Latest posts</SectionHeading>
        <BlogOverview posts={posts} />
      </HomepageSection>

      <HomepageSection>
        <SectionHeading>Projects</SectionHeading>
        <ProjectsOverview />
      </HomepageSection>
    </>
  );
};

const HomepageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(1.5 * var(--spacing-base));
`;

const SectionHeading = styled.h2`
  font-size: var(--font-size-xxl);
`;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);

  return {
    props: { posts },
  };
};

export default HomePage;
