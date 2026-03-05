module.exports = {
  env: {
    es6: true,
    browser: true
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": "off",
    "no-unused-vars": "warn"
  }
};
