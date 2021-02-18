module.exports = {
  extends: [
    "node",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "prettier"
  ],
  rules: {
    "import/no-commonjs": 0,
    "import/no-nodejs-modules": 0,
    "prettier/prettier": [
      "warn",
      {
        "singleQuote": true,
        "trailingComma": "all"
      }
    ]
  }
};
