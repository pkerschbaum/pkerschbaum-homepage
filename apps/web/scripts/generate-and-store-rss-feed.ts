import { type Author, Feed } from 'feed';
import fs from 'fs';

import type { MDXFile } from '@pkerschbaum-homepage/mdx/schema';

import { config } from '#pkg/config.js';
import {
  PATHS,
  RSS_FEED_JSON_PATH,
  RSS_FEED_JSON_SLUG,
  RSS_FEED_XML_PATH,
  RSS_FEED_XML_SLUG,
} from '#pkg/constants-server.js';
import { getAllMarkdownFiles } from '#pkg/mdx/index.js';

const [posts, tidbits] = await Promise.all([
  getAllMarkdownFiles(PATHS.POSTS),
  getAllMarkdownFiles(PATHS.TIDBITS),
]);

const imageUrl = new URL('/favicons/android-chrome-512x512.png', config.deploymentOrigin);
const faviconUrl = new URL('/favicons/favicon.ico', config.deploymentOrigin);
const rssFeedXmlUrl = new URL(RSS_FEED_XML_SLUG, config.deploymentOrigin);
const rssFeedJsonUrl = new URL(RSS_FEED_JSON_SLUG, config.deploymentOrigin);

const today = new Date();
const author: Author = {
  name: 'Patrick Kerschbaum',
  link: config.deploymentOrigin.href,
};

const feed = new Feed({
  title: 'Patrick Kerschbaum',
  description:
    'I write articles about JavaScript, TypeScript, Testing, and the web platform in general.',
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
  const baseUrl = new URL(`/blog`, config.deploymentOrigin);
  addArticleToFeed(post, feed, author, baseUrl);
}

for (const tidbit of tidbits) {
  const baseUrl = new URL(`/tidbit`, config.deploymentOrigin);
  addArticleToFeed(tidbit, feed, author, baseUrl);
}

await Promise.all([
  fs.promises.writeFile(RSS_FEED_XML_PATH, feed.rss2()),
  fs.promises.writeFile(RSS_FEED_JSON_PATH, feed.json1()),
]);

function addArticleToFeed(article: MDXFile, feed: Feed, author: Author, baseUrl: URL) {
  const articleUrl = new URL(`${baseUrl.href}/${article.segment}`);
  feed.addItem({
    title: article.frontmatter.title,
    id: articleUrl.href,
    link: articleUrl.href,
    description: article.frontmatter.description,
    author: [author],
    contributor: [author],
    date: new Date(article.frontmatter.publishedAtISO),
  });
}
