'use strict';

module.exports = {
  automock: true,
  setupTestFrameworkScriptFile: 'jest-extended',
  collectCoverageFrom: ['src/**/*.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
