module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.project.json',
    sourceType: 'module',
  },
  plugins: [
    /**
     * add "only-warn" plugin to change all errors to warnings.
     * ESLint is executed via Git hooks with --max-warnings 0 anyways. Transforming all errors to warnings
     * allows to distinguish ESLint warnings from other errors (e.g. TypeScript compile errors) in the
     * code editor (e.g. VS Code).
     */
    'only-warn',
    '@typescript-eslint/eslint-plugin',
    'n',
    'regexp',
    'code-import-patterns',
    'jsdoc',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:regexp/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:n/recommended',
    'plugin:unicorn/recommended',
    'plugin:eslint-comments/recommended',
    'prettier',
  ],
  ignorePatterns: ['.eslintrc.cjs', 'dist/**/*', 'sentry.*.config.js'],
  rules: {
    curly: 'error',
    'multiline-comment-style': ['error', 'starred-block'],
    'no-console': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-promise-executor-return': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-computed-key': 'error',
    'object-shorthand': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-template': 'error',
    'require-atomic-updates': 'error',
    'code-import-patterns/patterns': [
      'error',
      {
        zones: [
          {
            target: /.+/,
            forbiddenPatterns: [
              {
                // forbid relative imports except for .png, .jpg, .svg, .css
                pattern: /^\.(?!.+png$|.+jpg$|.+svg$|.+css$)/,
                errorMessage:
                  'Use absolute paths (beginning with "#pkg/") instead of relative paths.',
              },
            ],
          },
        ],
      },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    // disable "import/namespace" --> covered by TypeScript
    'import/namespace': 'off',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    // disable "import/no-unresolved" --> covered by TypeScript
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': 'error',
    // "import/order": external dependencies first, workspace dependencies second, internal stuff third
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        groups: [['builtin', 'external'], ['parent', 'sibling'], 'index'],
        pathGroups: [
          {
            pattern: '@pkerschbaum-homepage/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '#pkg/**',
            group: 'parent',
          },
        ],
      },
    ],
    'n/handle-callback-err': 'error',
    'n/no-callback-literal': 'error',
    // disable "n/no-extraneous-import" --> thanks to "isolated mode" of node_modules of pnpm and "public-hoist-pattern" being disabled of this monorepo, there is no possibilty for extraneous imports
    'n/no-extraneous-import': 'off',
    // disable "n/no-missing-import" and "n/no-missing-require" --> covered by TypeScript
    'n/no-missing-import': 'off',
    'n/no-missing-require': 'off',
    'n/no-process-env': 'error',
    'n/no-sync': 'error',
    // disable "n/no-unpublished-import" and "n/no-unpublished-require" --> wrong positive for "@vercel/analytics" for whatever reason
    'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
    'n/no-unpublished-require': 'off',
    // disable "n/no-unsupported-features/es-builtins" --> covered by TypeScript
    'n/no-unsupported-features/es-builtins': 'off',
    // disable "n/no-unsupported-features/es-syntax" --> covered by TypeScript
    'n/no-unsupported-features/es-syntax': 'off',
    // disable "n/no-unsupported-features/node-builtins" --> covered by TypeScript
    'n/no-unsupported-features/node-builtins': 'off',
    'regexp/no-unused-capturing-group': ['error', { allowNamed: true }],
    'unicorn/better-regex': 'off',
    'unicorn/consistent-destructuring': 'off',
    'unicorn/consistent-function-scoping': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-negated-condition': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prefer-dom-node-dataset': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-string-replace-all': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/prevent-abbreviations': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          // empty objects can be useful for Conditional Types
          '{}': false,
        },
        extendDefaults: true,
      },
    ],
    '@typescript-eslint/class-literal-property-style': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: { constructors: 'off' },
      },
    ],
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-base-to-string': ['error', { ignoredTypeNames: ['Error', 'Moment'] }],
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: { attributes: false } },
    ],
    '@typescript-eslint/no-namespace': [
      'error',
      {
        // namespace can be useful to group related typings
        allowDeclarations: true,
      },
    ],
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-condition': ['error', { allowConstantLoopConditions: true }],
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/parameter-properties': [
      'error',
      {
        allow: ['private readonly', 'protected readonly', 'public readonly'],
        prefer: 'parameter-property',
      },
    ],
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      {
        allowBoolean: true,
      },
    ],
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/unified-signatures': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx', '**/*.ctsx', '**/*.mtsx'],
      extends: ['plugin:jsdoc/recommended-typescript-error'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-returns-description': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx', '**/*.cjsx', '**/*.mjsx'],
      extends: ['plugin:jsdoc/recommended-typescript-flavor-error'],
      rules: {
        'jsdoc/require-jsdoc': 'off',
        'jsdoc/require-param': 'off',
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-returns': 'off',
        'jsdoc/require-returns-description': 'off',
      },
    },
  ],
};
