module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/base',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  env: {
    browser: true,
    node: true,
  },
  ignorePatterns: ['node_modules/'],
  rules: {
    'no-param-reassign': [2, { props: false }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
  },
};
