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

const BREAKPOINTS = {
  tabletMin: 600,
  laptopMin: 900,
  desktopMin: 1150,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
  desktopAndUp: `(min-width: ${BREAKPOINTS.desktopMin / 16}rem)`,
};

export const TOC_QUERY = QUERIES.desktopAndUp;

export const BLOG_REFETCH_INTERVAL_SECONDS = 60;

export enum DataAttribute {
  THEME = 'data-theme',
  IS_SCROLLED = 'data-is-scrolled',
  IS_ANIMATION_ENABLED = 'data-is-animation-enabled',
}

export enum LocalStorageKey {
  THEME = 'theme',
}

export enum ColorTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum IsScrolled {
  YES = 'yes',
  NO = 'no',
}

export enum IsAnimationEnabled {
  YES = 'yes',
  NO = 'no',
}

export enum Classes {
  JS_REQUIRED = 'js-required',
  STYLED_ANCHOR = 'styled-anchor',
  FANCY_ANCHOR_ICON = 'fancy-anchor-icon',
}

export enum ClassesAliases {
  FAVICONS = 'favicons',
}

export enum Animations {
  HIDE = 'hide',
  SLIDE_LEFT = 'slide-left',
  SLIDE_RIGHT = 'slide-right',
}
