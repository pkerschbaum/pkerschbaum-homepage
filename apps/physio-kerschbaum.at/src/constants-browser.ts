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

export enum DataAttribute {
  IS_ANIMATION_ENABLED = 'data-is-animation-enabled',
}

export enum LocalStorageKey {
  THEME = 'theme',
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
