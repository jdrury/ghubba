module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:relay/recommended",
    "prettier", // disable eslint rules that prettier will auto-correct, see https://prettier.io/docs/en/integrating-with-linters.html
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react-refresh", "react", "@typescript-eslint", "relay"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "relay/generated-flow-types": "off",

    // This rule ensures proper component exports for React Fast Refresh (hot reloading):
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
