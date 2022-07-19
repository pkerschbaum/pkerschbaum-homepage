import { refractor } from 'refractor/lib/all.js';

import { jsonc } from '#/prism/lang-jsonc.js';
import { prisma } from '#/prism/lang-prisma.js';

refractor.register(jsonc);
refractor.register(prisma);

export { refractor };
