const baseEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-ecma.cjs');

module.exports = {
  ...baseEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  rules: {
    ...baseEslintConfig.rules,
    'no-console': 'off',
  },
};
