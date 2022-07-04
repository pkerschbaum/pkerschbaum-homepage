import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const WEB_SRC_PATH = path.join(__dirname, '..', '..', '..', 'apps', 'web', 'src');
export const PATHS = {
  POSTS: path.join(WEB_SRC_PATH, 'posts'),
  FAVICONS_FOR_WEBSITES: path.join(WEB_SRC_PATH, 'static', 'favicons-for-websites.json'),
};
