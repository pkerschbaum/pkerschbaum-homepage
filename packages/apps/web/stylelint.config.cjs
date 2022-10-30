// based on https://github.com/styled-components/styled-components/issues/3607#issuecomment-1193181332
module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
    'stylelint-config-prettier-scss',
    'stylelint-config-styled-components',
    'stylelint-config-recess-order',
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'declaration-empty-line-before': null,
    'comment-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'rule-empty-line-before': null,
    'custom-property-empty-line-before': null,
  },
};
