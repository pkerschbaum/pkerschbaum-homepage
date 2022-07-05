import { refractor } from 'refractor/lib/all.js';
// @ts-expect-error -- it seems like typings of "rehype-prism-plus" are broken if TS is configured with "module": "node16" (ESM modules)
import rehypePrismGenerator from 'rehype-prism-plus/generator';

// Prisma language configuration for Prism.js taken from https://github.com/prisma/docs/blob/c72eb087fcf57f3c00d153f86c549ef28b3d0f44/src/components/customMdx/prism/prism-prisma.js
const prisma = (arg: unknown) => {
  const Prism = arg as typeof refractor;
  Prism.languages.prisma = Prism.languages.extend('clike', {
    keyword: /\b(?:datasource|enum|generator|model|type)\b/,
    'type-class-name': /(\b()\s+)[\w.\\]+/,
  });

  Prism.languages.insertBefore('prisma', 'function', {
    annotation: {
      pattern: /(^|[^.])@+\w+/,
      lookbehind: true,
      alias: 'punctuation',
    },
  });

  Prism.languages.insertBefore('prisma', 'punctuation', {
    'type-args': /\b(?:references|fields|onDelete|onUpdate):/,
  });
};
prisma.displayName = 'prisma';

refractor.register(prisma);
export const myPrismPlugin = rehypePrismGenerator(refractor);
