// @ts-check
const baseEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-ecma.cjs');
const nextEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-next.cjs');

const noRestrictedSyntax_preferNextJsImage = [
  {
    selector: "MemberExpression[object.name='styled'][property.name='img']",
    message: 'Do not use the native <img> HTML element; use <Image> from "#pkg/elements" instead.',
  },
];
const noRestrictedSyntax_preferElements = [
  {
    selector: "MemberExpression[object.name='styled'][property.name='img']",
    message: 'Do not use the native <img> HTML element; use <Image> from "#pkg/elements" instead.',
  },
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
let nextNoRestrictedSyntax = nextEslintConfig.rules?.['no-restricted-syntax']?.slice(1) ?? [];
let baseCodeImportPatternsZones =
  baseEslintConfig.rules?.['code-import-patterns/patterns']?.slice(1)?.zones ?? [];
let nextCodeImportPatternsZones =
  nextEslintConfig.rules?.['code-import-patterns/patterns']?.slice(1)?.zones ?? [];

module.exports = {
  ...baseEslintConfig,
  ...nextEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    ...nextEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  extends: [
    ...(baseEslintConfig.extends ?? []),
    ...(nextEslintConfig.extends ?? []),
    './node_modules/@pkerschbaum-homepage/config-eslint/eslint-config-next-core-web-vitals-fixed.cjs',
  ],
  ignorePatterns: [
    ...(baseEslintConfig.ignorePatterns ?? []),
    ...(nextEslintConfig.ignorePatterns ?? []),
    'next-sitemap.cjs',
    'stylelint.config.cjs',
    'dist-tsc/**',
  ],
  rules: {
    ...baseEslintConfig.rules,
    ...nextEslintConfig.rules,
    'no-restricted-syntax': [
      'error',
      ...baseNoRestrictedSyntax,
      ...nextNoRestrictedSyntax,
      ...noRestrictedSyntax_preferElements,
    ],
    'code-import-patterns/patterns': [
      'error',
      {
        zones: [
          ...baseCodeImportPatternsZones,
          ...nextCodeImportPatternsZones,
          {
            target: /.+/,
            forbiddenPatterns: [
              {
                // forbid importing from next/image (should only be allowed in #pkg/elements/Image.tsx)
                pattern: /next\/image/,
                errorMessage:
                  'Don\'t use "Image" from "next/image"; use from "#pkg/elements" instead.',
              },
            ],
          },
        ],
      },
    ],
  },
  overrides: [
    ...(baseEslintConfig.overrides ?? []),
    ...(nextEslintConfig.overrides ?? []),
    {
      files: ['src/elements/**/*'],
      rules: {
        'no-restricted-syntax': ['error', ...noRestrictedSyntax_preferNextJsImage],
      },
    },
  ],
  settings: {
    ...baseEslintConfig.settings,
    ...nextEslintConfig.settings,
    next: {
      ...baseEslintConfig.settings?.next,
      ...nextEslintConfig.settings?.next,
      rootDir: 'apps/web/',
    },
  },
};
