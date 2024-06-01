module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/test'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    moduleNameMapper: {
        "^@action-update-version/(.*)$": "<rootDir>/src/$1"
    }
};
