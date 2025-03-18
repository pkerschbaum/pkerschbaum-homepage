const baseEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-ecma.cjs');
const reactEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-react.cjs');

module.exports = {
  ...baseEslintConfig,
  ...reactEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    ...reactEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  plugins: [...(baseEslintConfig.plugins ?? []), ...(reactEslintConfig.plugins ?? [])],
  extends: [...(baseEslintConfig.extends ?? []), ...(reactEslintConfig.extends ?? [])],
  ignorePatterns: [
    ...(baseEslintConfig.ignorePatterns ?? []),
    ...(reactEslintConfig.ignorePatterns ?? []),
  ],
  rules: {
    ...baseEslintConfig.rules,
    ...reactEslintConfig.rules,
    'unicorn/prefer-global-this': 'off',
  },
  overrides: [...(baseEslintConfig.overrides ?? []), ...(reactEslintConfig.overrides ?? [])],
  settings: {
    ...baseEslintConfig.settings,
    ...reactEslintConfig.settings,
    next: {
      ...baseEslintConfig.settings?.next,
      ...reactEslintConfig.settings?.next,
    },
  },
};
