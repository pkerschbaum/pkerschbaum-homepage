import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';
import { Feed } from 'feed';
import fs from 'fs';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import styled from 'styled-components';

import { BlogOverview } from '~/components/blog-overview';
import { Introduction } from '~/components/introduction';
import { Main } from '~/components/main';
import { ProjectsOverview } from '~/components/projects-overview/ProjectsOverview';
import { config } from '~/config';
import {
  POSTS_PATH,
  RSS_FEED_JSON_PATH,
  RSS_FEED_JSON_SLUG,
  RSS_FEED_XML_PATH,
  RSS_FEED_XML_SLUG,
} from '~/constants';
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
          <SectionHeading>Blog Posts</SectionHeading>
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

  await generateAndStoreRssFeed(posts);

  return {
    props: { posts },
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
