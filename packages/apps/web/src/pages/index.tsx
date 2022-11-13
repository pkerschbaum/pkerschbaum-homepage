import { Feed } from 'feed';
import fs from 'fs';
import type { GetStaticProps } from 'next';
import * as React from 'react';
import { PenTool } from 'react-feather';
import styled from 'styled-components';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { ArticlesList } from '#/components/articles-list';
import { Cookie, Topic } from '#/components/icon-library';
import { Introduction } from '#/components/introduction';
import { Main } from '#/components/main';
import { MetadataTags } from '#/components/metadata-tags';
import { ProjectsOverview } from '#/components/projects-overview/ProjectsOverview';
import { config } from '#/config';
import {
  PATHS,
  RSS_FEED_JSON_PATH,
  RSS_FEED_JSON_SLUG,
  RSS_FEED_XML_PATH,
  RSS_FEED_XML_SLUG,
} from '#/constants';
import { getAllMarkdownFiles } from '#/mdx';

type HomePageProps = {
  posts: MDXFile[];
  tidbits: MDXFile[];
};

const HomePage: React.FC<HomePageProps> = ({ posts, tidbits }) => {
  return (
    <>
      <MetadataTags
        title="Homepage of Patrick Kerschbaum"
        description="Homepage of Patrick Kerschbaum"
      />

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
    </>
  );
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

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [posts, tidbits] = await Promise.all([
    getAllMarkdownFiles(PATHS.POSTS),
    getAllMarkdownFiles(PATHS.TIDBITS),
  ]);

  await generateAndStoreRssFeed(posts);

  return {
    props: { posts, tidbits },
  };
};

async function generateAndStoreRssFeed(posts: MDXFile[]) {
  const imageUrl = new URL('/favicons/android-chrome-512x512.png', config.deploymentOrigin);
  const faviconUrl = new URL('/favicons/favicon.ico', config.deploymentOrigin);
  const rssFeedXmlUrl = new URL(RSS_FEED_XML_SLUG, config.deploymentOrigin);
  const rssFeedJsonUrl = new URL(RSS_FEED_JSON_SLUG, config.deploymentOrigin);

  const today = new Date();
  const author = {
    name: 'Patrick Kerschbaum',
    link: config.deploymentOrigin.href,
  };

  const feed = new Feed({
    title: "Patrick Kerschbaum's blog",
    description:
      'I write blog posts on JavaScript, TypeScript, Testing, and the web platform in general.',
    id: config.deploymentOrigin.href,
    link: config.deploymentOrigin.href,
    language: 'en',
    image: imageUrl.href,
    favicon: faviconUrl.href,
    copyright: `All rights reserved ${today.getFullYear()}, Patrick Kerschbaum`,
    updated: today,
    feedLinks: {
      rss2: rssFeedXmlUrl.href,
      json: rssFeedJsonUrl.href,
    },
    author,
  });

  for (const post of posts) {
    const blogPostUrl = new URL(`/blog/${post.segment}`, config.deploymentOrigin);
    feed.addItem({
      title: post.frontmatter.title,
      id: blogPostUrl.href,
      link: blogPostUrl.href,
      description: post.frontmatter.description,
      author: [author],
      contributor: [author],
      date: new Date(post.frontmatter.publishedAtISO),
    });
  }

  await Promise.all([
    fs.promises.writeFile(RSS_FEED_XML_PATH, feed.rss2()),
    fs.promises.writeFile(RSS_FEED_JSON_PATH, feed.json1()),
  ]);
}

export default HomePage;
