import { styled } from '@pigment-css/react';
import type { Metadata } from 'next';
import type React from 'react';
import { PenTool } from 'react-feather';

import { ArticlesList } from '#pkg/components/articles-list/index.js';
import { Cookie, Topic } from '#pkg/components/icon-library/index.js';
import { Introduction } from '#pkg/components/introduction/index.js';
import { Main } from '#pkg/components/main/index.js';
import { ProjectsOverview } from '#pkg/components/projects-overview/ProjectsOverview.jsx';
import { config } from '#pkg/config.js';
import { PATHS } from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

async function HomePage() {
  const [posts, tidbits] = await Promise.all([
    getAllMarkdownFiles(PATHS.POSTS),
    getAllMarkdownFiles(PATHS.TIDBITS),
  ]);

  return (
    <HomepageContainer>
      <Introduction />

      <HomepageSection>
        <SectionHeading>
          <PenTool size="1em" />
          Blog Posts
        </SectionHeading>
        <ArticlesList pathPrefix="/blog" articles={posts} />
      </HomepageSection>

      <HomepageSection>
        <SectionHeading>
          <Cookie size="1em" />
          Tidbits
        </SectionHeading>
        <ArticlesList pathPrefix="/tidbits" articles={tidbits} />
      </HomepageSection>

      {config.featureFlags.projects && (
        <HomepageSection>
          <SectionHeading>
            <Topic size="1em" />
            Projects
          </SectionHeading>
          <ProjectsOverview />
        </HomepageSection>
      )}
    </HomepageContainer>
  );
}

export const metadata: Metadata = {
  title: 'Homepage of Patrick Kerschbaum',
  description: 'Homepage of Patrick Kerschbaum',
  openGraph: {
    title: 'Homepage of Patrick Kerschbaum',
    description: 'Homepage of Patrick Kerschbaum',
  },
};

const HomepageContainer = styled(Main)`
  display: flex;
  flex-direction: column;
  gap: calc(8 * var(--spacing-base));
  align-items: stretch;
`;

const HomepageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: calc(1.5 * var(--spacing-base));
  align-items: center;
`;

const SectionHeading = styled.h2`
  display: flex;
  gap: calc(1 * var(--spacing-base));
  align-items: center;

  margin-block: 0;
  font-size: var(--font-size-xxl);
`;

export default HomePage;
