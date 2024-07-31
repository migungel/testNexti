module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    "^.+\\.js$": "babel-jest"
  }
};