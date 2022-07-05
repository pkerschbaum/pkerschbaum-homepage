import type { refractor } from 'refractor/lib/all.js';

// Prisma language configuration for Prism.js taken from https://github.com/prisma/docs/blob/c72eb087fcf57f3c00d153f86c549ef28b3d0f44/src/components/customMdx/prism/prism-prisma.js
export const prisma = (arg: unknown) => {
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
