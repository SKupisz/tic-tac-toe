import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: 'coverage', 
  coverageReporters: ['text', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ],
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  testPathIgnorePatterns: ['./dist']
}

export default config;