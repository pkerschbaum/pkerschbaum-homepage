import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');
const PUBLIC_DIR_PATH = path.join(process.cwd(), 'public');
export const RSS_FEED_XML_SLUG = 'rss.xml';
export const RSS_FEED_JSON_SLUG = 'rss.json';
export const RSS_FEED_XML_PATH = path.join(PUBLIC_DIR_PATH, RSS_FEED_XML_SLUG);
export const RSS_FEED_JSON_PATH = path.join(PUBLIC_DIR_PATH, RSS_FEED_JSON_SLUG);

const BREAKPOINTS = {
  tabletMin: 600,
  laptopMin: 900,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
};

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
}

export enum Animations {
  HIDE = 'hide',
  SLIDE_LEFT = 'slide-left',
  SLIDE_RIGHT = 'slide-right',
}
