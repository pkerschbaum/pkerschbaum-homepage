import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');

const BREAKPOINTS = {
  tabletMin: 600,
  laptopMin: 900,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
  laptopAndUp: `(min-width: ${BREAKPOINTS.laptopMin / 16}rem)`,
};
