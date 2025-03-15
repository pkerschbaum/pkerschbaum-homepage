import type { refractor } from 'refractor/all';

export const jsonc = (arg: unknown) => {
  const Prism = arg as typeof refractor;
  Prism.languages['jsonc'] = Prism.languages.extend('json', {});
};
jsonc.displayName = 'jsonc';
