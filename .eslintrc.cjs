module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "plugin:jest/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  ignorePatterns: [
    "!**/*",
    "*.config.js",
    ".eslintrc.js",
    ".prettierrc.js",
    "tsconfig.json",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: "./",
    project: ["./tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint",
    "react-hooks",
    "jest",
    "@tanstack/query",
    "import",
  ],
  globals: {
    JSX: true,
  },
  settings: {
    jest: {
      version: 27,
    },
    "import/resolver": {
      typescript: {},
      typescript: true,
      node: {
        extensions: [".ts", ".tsx"],
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@tanstack/query/exhaustive-deps": "error",
        "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
        "@typescript-eslint/func-call-spacing": "warn",
        "@typescript-eslint/keyword-spacing": "warn",
        "@typescript-eslint/member-delimiter-style": "warn",
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "function",
            format: ["StrictPascalCase", "strictCamelCase"],
          },
          {
            selector: ["variable", "parameter"],
            format: ["PascalCase", "camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            trailingUnderscore: "allow",
          },
          // {
          // 	selector: ["interface", "enum"],
          // 	format: ["StrictPascalCase"],
          // },
        ],
        "@typescript-eslint/no-shadow": "off",
        "@typescript-eslint/no-undef": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/restrict-plus-operands": ["error"],
        "@typescript-eslint/semi": "warn",
        "arrow-spacing": ["warn", { before: true, after: true }],
        "block-spacing": ["warn", "always"],
        "func-call-spacing": "off", // conflict
        "import/default": ["off"],
        "import/no-duplicates": ["error"],
        "import/no-named-as-default-member": ["off"],
        "jsx-quotes": ["warn", "prefer-double"],
        "key-spacing": "warn",
        "keyword-spacing": "off", // conflict
        "no-bitwise": "off",
        "no-lonely-if": "warn",
        "no-multiple-empty-lines": ["warn", { max: 2 }],
        "no-shadow": "off",
        "no-trailing-spaces": "warn",
        "no-unneeded-ternary": "warn",
        "no-unused-vars": "off", // conflict
        "no-useless-escape": "warn",
        "no-var": "error",
        "no-void": "off",
        "prefer-const": "error",
        quotes: [
          "warn",
          "double",
          { avoidEscape: true, allowTemplateLiterals: true },
        ],
        "react/no-unstable-nested-components": [
          "error",
          { allowAsProps: true },
        ],
        "react/self-closing-comp": ["off"],
        semi: "off",
        eqeqeq: "error",
        radix: "error",
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/no-named-as-default-member": "off",
        indent: "off",
        "@typescript-eslint/indent": "off",
      },
    },
  ],
};
