// based on https://github.com/styled-components/styled-components/issues/3607#issuecomment-1193181332
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'comment-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'declaration-empty-line-before': null,
    'no-duplicate-selectors': null,
    'rule-empty-line-before': null,
    'selector-id-pattern': null,
    'no-empty-source': null,
    'no-descending-specificity': null,
  },
  overrides: [
    {
      files: ['*.ts', '*.cts', '*.mts', '*.tsx', '*.ctsx', '*.mtsx'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};
