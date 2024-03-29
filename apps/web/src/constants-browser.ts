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

export enum DataAttribute {
  THEME = 'data-theme',
  IS_SCROLLED = 'data-is-scrolled',
  IS_ANIMATION_ENABLED = 'data-is-animation-enabled',
  SECTION_HEADING_ID = 'data-section-heading-id',
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
