module.exports = {
  root: true,
  extends: ['plugin:react/recommended', 'plugin:@next/next/core-web-vitals'],
  ignorePatterns: ['next.config.js', 'next-env.d.ts'],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: "MemberExpression[object.name='styled'][property.name='img']",
        message: 'Do not use the native <img> HTML element; use <Image> from "next/image" instead.',
      },
    ],
    'react/jsx-curly-brace-presence': 'error',
    // "node:path" etc. is not supported in Next.js projects (as of v13.4.5)
    'unicorn/prefer-node-protocol': 'off',
    '@next/next/no-html-link-for-pages': ['error', ['src/app/', 'src/pages/']],
  },
  overrides: [
    {
      // allow default export for Next.js layouts and pages
      files: ['src/pages/**/*', 'src/app/**/{layout,page}.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
