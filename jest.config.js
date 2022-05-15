/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  moduleFileExtensions: ["ts", "tsx","js"],
  transform: {
    "^.+\\.(ts|tsx|js)$": "ts-jest",
  },
  testMatch: [
    "**/tests/**/*.spec.ts",
    "**/tests/**/*.test.ts",
    "**/tests/**/*.test.js",
  ],
  testEnvironment: "node",
};