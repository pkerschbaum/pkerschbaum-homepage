import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const PATHS = {
  FAVICONS_FOR_WEBSITES: path.join(__dirname, 'favicons-for-websites.json'),
};
