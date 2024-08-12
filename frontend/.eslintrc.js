module.exports = {
  extends: [
    "next",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "comma-dangle": ["error", "never"],
    "no-trailing-spaces": ["error"]
  },
  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["./**/*.js"]
    }
  ],
  ignorePatterns: ['.eslintrc.js'],
};
