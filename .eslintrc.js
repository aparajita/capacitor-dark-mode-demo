module.exports = {
  extends: ['@aparajita/vue'],
  rules: {
    '@typescript-eslint/naming-convention': 'off',
  },
  parserOptions: {
    ecmaVersion: 2022,
  },
  overrides: [
    {
      // Module js
      files: ['*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
}
