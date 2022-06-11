import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

import { BlogOverview } from '~/components/blog-overview';
import { Introduction } from '~/components/introduction';
import { Main } from '~/components/main';
import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';
import { config } from '~/config';
import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';

type HomePageProps = {
  posts: MDXFile[];
};

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  const title = 'Patrick Kerschbaum';
  const description = 'Homepage of Patrick Kerschbaum';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} key="desc" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <HomepageContainer>
        <Introduction />

        <HomepageSection>
          <SectionHeading>Latest posts</SectionHeading>
          <BlogOverview posts={posts} />
        </HomepageSection>

        {config.featureFlags.projects && (
          <HomepageSection>
            <SectionHeading>Projects</SectionHeading>
            <ProjectsOverview />
          </HomepageSection>
        )}
      </HomepageContainer>
    </>
  );
};

const HomepageContainer = styled(Main)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: calc(8 * var(--spacing-base));
`;

const HomepageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(1.5 * var(--spacing-base));
`;

const SectionHeading = styled.h2`
  margin-block: 0;
  font-size: var(--font-size-xxl);
`;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const posts = await getAllMarkdownFiles(POSTS_PATH);

  return {
    props: { posts },
  };
};

export default HomePage;
