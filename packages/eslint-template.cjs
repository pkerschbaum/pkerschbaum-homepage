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
    'node',
    'regexp',
    'code-import-patterns',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:regexp/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'plugin:eslint-comments/recommended',
  ],
  ignorePatterns: ['.eslintrc.cjs', 'dist/**/*'],
  rules: {
    curly: 'error',
    'no-console': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-promise-executor-return': 'error',
    'no-unneeded-ternary': 'error',
    'no-useless-computed-key': 'error',
    'object-shorthand': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-template': 'error',
    'require-atomic-updates': 'error',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
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
                errorMessage: 'Use absolute paths (beginning with "#/") instead of relative paths.',
              },
            ],
          },
        ],
      },
    ],
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-self-import': 'error',
    'import/no-unresolved': 'off',
    'import/no-useless-path-segments': 'error',
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
            pattern: '#/**',
            group: 'parent',
          },
        ],
      },
    ],
    'node/handle-callback-err': 'error',
    'node/no-callback-literal': 'error',
    'node/no-extraneous-import': 'off',
    'node/no-missing-import': 'off',
    'node/no-process-env': 'error',
    'node/no-sync': 'error',
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unsupported-features/node-builtins': 'off',
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
      { overrides: { constructors: 'off' } },
    ],
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-base-to-string': ['error', { ignoredTypeNames: ['Error'] }],
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
    '@typescript-eslint/promise-function-async': 'error',
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
};
