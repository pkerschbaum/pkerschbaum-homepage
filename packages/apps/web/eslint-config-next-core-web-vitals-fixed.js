/**
 * Unfortunately, "eslint-config-next" defines "eslint-plugin-import" as a dependency, not peerDependency.
 * It conflicts with the version of "eslint-plugin-import" we get for this project, leading to an error
 * when running eslint.
 *
 * That's why we just remove "eslint-plugin-import" from "plugins". All "eslint-plugin-import" rules
 * defined by "eslint-config-next" will still get applied, just with our version of "eslint-plugin-import".
 */
const eslintConfigNext = require('eslint-config-next');
module.exports = {
  ...eslintConfigNext,
  plugins: eslintConfigNext.plugins.filter((plugin) => plugin !== 'import'),
};
