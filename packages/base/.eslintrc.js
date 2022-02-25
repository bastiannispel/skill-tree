module.exports = {
  root: true,
  extends: ['airbnb-base', 'airbnb-typescript/base', '../../.eslintrc'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
