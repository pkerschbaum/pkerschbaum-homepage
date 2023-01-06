const baseEslintConfig = require('../../eslint-template.cjs');

const noRestrictedSyntax_noTestBadPatterns = [
  {
    selector:
      "MemberExpression[object.name='it'][property.name='only'], MemberExpression[object.name='test'][property.name='only']",
    message:
      'Do not check in spec files with tests using ".only" - the other tests of that spec file would be skipped!',
  },
  {
    selector:
      "MemberExpression[object.name='it'][property.name='skip'], MemberExpression[object.name='test'][property.name='skip']",
    message: 'Do not check in dead tests. Either fix or delete them.',
  },
];
const noRestrictedSyntax_preferNextJsImage = [
  {
    selector: "MemberExpression[object.name='styled'][property.name='img']",
    message: 'Do not use the native <img> HTML element; use <Image> from "next/image" instead.',
  },
];
const noRestrictedSyntax_preferElements = [
  {
    selector: "MemberExpression[object.name='styled'][property.name='a']",
    message: 'Do not use the native <a> HTML element; use <Anchor> from "#pkg/elements" instead.',
  },
  {
    selector: "MemberExpression[object.name='styled'][property.name='button']",
    message:
      'Do not use the native <button> HTML element; use <Button> from "#pkg/elements" instead.',
  },
];

let baseNoRestrictedSyntax = baseEslintConfig.rules?.['no-restricted-syntax']?.slice(1) ?? [];

module.exports = {
  ...baseEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  extends: [
    ...(baseEslintConfig.extends ?? []),
    './eslint-config-next-core-web-vitals-fixed.cjs',
    'plugin:@next/next/core-web-vitals',
  ],
  ignorePatterns: [
    ...(baseEslintConfig.ignorePatterns ?? []),
    'eslint-config-next-core-web-vitals-fixed.cjs',
    'next.config.js',
    'next-sitemap.cjs',
    'stylelint.config.cjs',
  ],
  rules: {
    ...baseEslintConfig.rules,
    'no-restricted-syntax': [
      'error',
      ...baseNoRestrictedSyntax,
      ...noRestrictedSyntax_noTestBadPatterns,
      ...noRestrictedSyntax_preferNextJsImage,
      ...noRestrictedSyntax_preferElements,
    ],
  },
  overrides: [
    ...(baseEslintConfig.overrides ?? []),
    {
      // allow default export for Next.js pages
      files: ['src/pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['src/elements/**/*'],
      rules: {
        'no-restricted-syntax': [
          'error',
          ...noRestrictedSyntax_noTestBadPatterns,
          ...noRestrictedSyntax_preferNextJsImage,
        ],
      },
    },
  ],
  settings: {
    ...baseEslintConfig.settings,
    next: {
      rootDir: 'packages/apps/web/',
    },
  },
};
