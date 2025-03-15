// @ts-check
const baseEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-ecma.cjs');
const reactEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-react.cjs');
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
let reactNoRestrictedSyntax = reactEslintConfig.rules?.['no-restricted-syntax']?.slice(1) ?? [];
let nextNoRestrictedSyntax = nextEslintConfig.rules?.['no-restricted-syntax']?.slice(1) ?? [];
let baseCodeImportPatternsZones =
  baseEslintConfig.rules?.['code-import-patterns/patterns']?.slice(1)?.zones ?? [];
let reactCodeImportPatternsZones =
  reactEslintConfig.rules?.['code-import-patterns/patterns']?.slice(1)?.zones ?? [];
let nextCodeImportPatternsZones =
  nextEslintConfig.rules?.['code-import-patterns/patterns']?.slice(1)?.zones ?? [];

module.exports = {
  ...baseEslintConfig,
  ...reactEslintConfig,
  ...nextEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    ...reactEslintConfig.parserOptions,
    ...nextEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    ...(baseEslintConfig.plugins ?? []),
    ...(reactEslintConfig.plugins ?? []),
    ...(nextEslintConfig.plugins ?? []),
  ],
  extends: [
    ...(baseEslintConfig.extends ?? []),
    ...(reactEslintConfig.extends ?? []),
    ...(nextEslintConfig.extends ?? []),
    '../../node_modules/@pkerschbaum-homepage/config-eslint/eslint-config-next-core-web-vitals-fixed.cjs',
  ],
  ignorePatterns: [
    ...(baseEslintConfig.ignorePatterns ?? []),
    ...(reactEslintConfig.ignorePatterns ?? []),
    ...(nextEslintConfig.ignorePatterns ?? []),
    'next-sitemap.cjs',
    'stylelint.config.cjs',
  ],
  rules: {
    ...baseEslintConfig.rules,
    ...reactEslintConfig.rules,
    ...nextEslintConfig.rules,
    'no-restricted-syntax': [
      'error',
      ...baseNoRestrictedSyntax,
      ...reactNoRestrictedSyntax,
      ...nextNoRestrictedSyntax,
      ...noRestrictedSyntax_preferElements,
    ],
    'code-import-patterns/patterns': [
      'error',
      {
        zones: [
          ...baseCodeImportPatternsZones,
          ...reactCodeImportPatternsZones,
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
    'unicorn/prefer-global-this': 'off',
  },
  overrides: [
    ...(baseEslintConfig.overrides ?? []),
    ...(reactEslintConfig.overrides ?? []),
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
    ...reactEslintConfig.settings,
    ...nextEslintConfig.settings,
    next: {
      ...baseEslintConfig.settings?.next,
      ...reactEslintConfig.settings?.next,
      ...nextEslintConfig.settings?.next,
      rootDir: 'apps/web/',
    },
  },
};
