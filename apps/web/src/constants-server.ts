import path from 'path';

export const PATHS = {
  FAVICONS_FOR_WEBSITES: path.join(process.cwd(), 'generated', 'favicons-for-websites.json'),
  POSTS: path.join(process.cwd(), 'src', 'writing', 'posts'),
  TIDBITS: path.join(process.cwd(), 'src', 'writing', 'tidbits'),
  POSTS_PAGES_DIR: path.join(process.cwd(), 'src', 'app', 'blog'),
  TIDBITS_PAGES_DIR: path.join(process.cwd(), 'src', 'app', 'tidbits'),
  PUBLIC_DIR: path.join(process.cwd(), 'public'),
};
export const RSS_FEED_XML_SLUG = 'rss.xml';
export const RSS_FEED_JSON_SLUG = 'rss.json';
export const RSS_FEED_XML_PATH = path.join(PATHS.PUBLIC_DIR, RSS_FEED_XML_SLUG);
export const RSS_FEED_JSON_PATH = path.join(PATHS.PUBLIC_DIR, RSS_FEED_JSON_SLUG);

export const BLOG_REFETCH_INTERVAL_SECONDS = 60;
