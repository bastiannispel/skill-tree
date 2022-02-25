const base = require('../../jest.config.base.js');

module.exports = {
  ...base,
  name: '@skill-tree/base',
  displayName: 'skill-tree/base',
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
