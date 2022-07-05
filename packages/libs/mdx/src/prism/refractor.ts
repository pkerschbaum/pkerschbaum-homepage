import { refractor } from 'refractor/lib/all.js';

import { prisma } from '~/prism/lang-prisma.js';

refractor.register(prisma);

export { refractor };
