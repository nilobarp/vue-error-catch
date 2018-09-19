module.exports = {
  verbose: false,
  automock: false,
  modulePathIgnorePatterns: ["/node_modules/"],
  transformIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  testRegex: "\\.(test|spec)\\.ts?$",
  roots: ["src"],
  collectCoverage: false,
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
    "!src/**/*.d.ts",
    "!**/node_modules/**"
  ],
  coverageReporters: ["lcov", "text-summary", "html"],
  moduleFileExtensions: ["ts", "js", "json", "node"]
};
