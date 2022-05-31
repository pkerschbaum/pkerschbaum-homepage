import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');
export const HREFS_TO_FAVICONS_PATH = path.join(
  process.cwd(),
  'src',
  'static',
  'href-to-favicons.json',
);

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

export enum Classes {
  JS_REQUIRED = 'js-required',
}
