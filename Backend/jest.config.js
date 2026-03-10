module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
    collectCoverageFrom: [
        'routes/**/*.js',
        'models/**/*.js',
        'middleware/**/*.js',
        '!**/node_modules/**',
    ],
};
