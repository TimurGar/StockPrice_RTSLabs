export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/__tests__/**/*.test.js"],
  collectCoverageFrom: ["api/**/*.js", "!api/index.js"],
  coveragePathIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json"],
  testTimeout: 10000,
};
