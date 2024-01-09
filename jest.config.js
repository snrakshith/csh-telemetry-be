/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "./"],
  testTimeout: 15000,
};

// export const preset = "ts-jest";
// export const testEnvironment = "node";
// export const moduleDirectories = ["node_modules", "./"];
// export const testTimeout = 15000;
