module.exports = {
  bail: 5,
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  maxWorkers: '50%',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  slowTestThreshold: 3,
  testEnvironment: 'jsdom',
};
