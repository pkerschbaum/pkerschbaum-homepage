import { refractor } from 'refractor/all';

import { jsonc } from '#pkg/prism/lang-jsonc.js';
import { prisma } from '#pkg/prism/lang-prisma.js';

refractor.register(jsonc);
refractor.register(prisma);

export { refractor } from 'refractor/all';
