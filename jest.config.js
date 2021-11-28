module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["dotenv/config"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
};