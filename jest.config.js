module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: {
    '^hooks/(.*)$': '<rootDir>/hooks/$1',
    '^components/(.*)$': '<rootDir>/components/$1',
    '^app/(.*)$': '<rootDir>/app/$1',
    '^constants/(.*)$': '<rootDir>/constants/$1',
    '^assets/(.*)$': '<rootDir>/assets/$1',
  },
};
