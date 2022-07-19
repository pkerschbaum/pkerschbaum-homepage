import type { refractor } from 'refractor/lib/all.js';

export const jsonc = (arg: unknown) => {
  const Prism = arg as typeof refractor;
  Prism.languages.jsonc = Prism.languages.extend('json', {});
};
jsonc.displayName = 'jsonc';
