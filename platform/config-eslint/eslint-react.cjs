module.exports = {
  root: true,
  extends: ['plugin:react/recommended'],
  rules: {
    'no-restricted-syntax': [
      'error',
      /**
       * Forbids `useEffect`/`React.useEffect` using an arrow function or anonymous function expression.
       */
      {
        selector:
          "CallExpression[callee.type='Identifier'][callee.name='useEffect'] > ArrowFunctionExpression, FunctionExpression:not([id])",
        message:
          'Use a named function expression for functions passed to `useEffect` to document its intent (https://x.com/housecor/status/1750980809874436431).',
      },
    ],
    'react/jsx-curly-brace-presence': 'error',
  },
};
