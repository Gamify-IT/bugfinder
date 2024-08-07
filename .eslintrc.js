module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },

  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended'],

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
