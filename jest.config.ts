import type { Config } from '@jest/types';

export default {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/tests/**/*.test.(ts|tsx)'
  ],
} as Config.InitialOptions;
