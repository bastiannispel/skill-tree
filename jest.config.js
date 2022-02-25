import base from './jest.config.base.js';

export default {
  ...base,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
