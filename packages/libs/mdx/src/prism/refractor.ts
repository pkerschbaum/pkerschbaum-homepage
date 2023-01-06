import { refractor } from 'refractor/lib/all.js';

import { jsonc } from '#pkg/prism/lang-jsonc.js';
import { prisma } from '#pkg/prism/lang-prisma.js';

refractor.register(jsonc);
refractor.register(prisma);

export { refractor };
