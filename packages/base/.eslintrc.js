module.exports = {
  root: true,
  extends: ['airbnb-base', 'airbnb-typescript/base', '../../.eslintrc'],
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
