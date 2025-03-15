const baseEslintConfig = require('@pkerschbaum-homepage/config-eslint/eslint-ecma.cjs');

module.exports = {
  ...baseEslintConfig,
  parserOptions: {
    ...baseEslintConfig.parserOptions,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [...(baseEslintConfig.ignorePatterns ?? []), 'bin/**/*'],
};
