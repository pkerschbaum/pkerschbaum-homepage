import { logger } from '@pkerschbaum-homepage/commons/observability/logger';
import type { NextApiRequest, NextApiResponse } from 'next';

import { POSTS_PATH } from '~/constants';
import { getAllMarkdownFiles } from '~/mdx';

async function loadURLsOfBlogPosts() {
  const redirectMap: { [shortenedPath: string]: string } = {
    'playwright-api-test-coverage': '/blog/playwright-api-test-coverage-redirected',
  };
  const posts = await getAllMarkdownFiles(POSTS_PATH);

  for (const post of posts) {
    redirectMap[post.frontmatter.shortenedURL] = `/blog/${post.segment}`;
  }

  return redirectMap;
}

const redirectMapPromise = loadURLsOfBlogPosts();

async function handleRequest(req: NextApiRequest) {
  const redirectMap = await redirectMapPromise;

  const originalpath = req.query.originalpath;
  if (typeof originalpath !== 'string') {
    throw new Error(`invalid path format`);
  }

  const pathToRedirectTo = redirectMap[originalpath];
  if (!pathToRedirectTo) {
    throw new Error(`shortened URL not found`);
  }

  return {
    status: 301,
    location: pathToRedirectTo,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const responseData = await handleRequest(req);
    res.status(responseData.status).setHeader('Location', responseData.location).send(null);
  } catch (err) {
    logger.error('error occured', err);
    res.status(500).send(null);
  }
}
