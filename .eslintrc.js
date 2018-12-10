module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    "eslint:recommended",
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'vue/require-v-for-key': false,
    'no-useless-escape': 1,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
