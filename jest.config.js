module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    '<rootDir>/jest.setup.js',  // Додайте цей рядок, якщо у вас є файл налаштувань
  ],
};