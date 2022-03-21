module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended'
  ],
  
  rules: {
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
