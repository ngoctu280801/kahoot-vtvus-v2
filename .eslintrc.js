module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "prettier/prettier": [
      "warn",
      {
        arrowParens: "avoid",
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        htmlWhitespaceSensitivity: "css",
        endOfLine: "auto",
      },
    ],
  },
};
