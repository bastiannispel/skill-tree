/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import base from 'skill-tree/jest.config.base.js';
import tsconfig from './tsconfig.json';

const moduleNameMapper = require('tsconfig-paths-jest')(tsconfig);

export default {
  ...base,
  name: '@skill-tree/base',
  displayName: 'skill-tree/base',
  moduleNameMapper,
  verbose: true,
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
