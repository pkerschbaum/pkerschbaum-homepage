import path from 'node:path';
import url from 'node:url';

const PATH_TO_APP = path.join(
  url.fileURLToPath(import.meta.url),
  '..',
  '..',
  '..',
  '..',
  'apps',
  'pkerschbaum.com',
);

export const PATHS = {
  FAVICONS_FOR_WEBSITES: path.join(PATH_TO_APP, 'generated', 'favicons-for-websites.json'),
  POSTS: path.join(PATH_TO_APP, 'src', 'writing', 'posts'),
  TIDBITS: path.join(PATH_TO_APP, 'src', 'writing', 'tidbits'),
  POSTS_PAGES_DIR: path.join(PATH_TO_APP, 'src', 'app', 'blog'),
  TIDBITS_PAGES_DIR: path.join(PATH_TO_APP, 'src', 'app', 'tidbits'),
  PUBLIC_DIR: path.join(PATH_TO_APP, 'public'),
};
export const RSS_FEED_XML_SLUG = 'rss.xml';
export const RSS_FEED_JSON_SLUG = 'rss.json';
export const RSS_FEED_XML_PATH = path.join(PATHS.PUBLIC_DIR, RSS_FEED_XML_SLUG);
export const RSS_FEED_JSON_PATH = path.join(PATHS.PUBLIC_DIR, RSS_FEED_JSON_SLUG);
