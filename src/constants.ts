import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');

const BREAKPOINTS = {
  tabletMin: 600,
};

export const QUERIES = {
  tabletAndUp: `(min-width: ${BREAKPOINTS.tabletMin / 16}rem)`,
};
