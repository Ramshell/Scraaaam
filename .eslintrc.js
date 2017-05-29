module.exports = {
    "extends": "google",
    "parser": "babel-eslint",
    "rules": {
      "require-jsdoc": ["error", {
          "require": {
              "FunctionDeclaration": false,
              "MethodDefinition": false,
              "ClassDeclaration": false,
              "ArrowFunctionExpression": false
          }
      }],
      "quotes": "off",
      "semi": "off",
      "new-cap": "off",
      "comma-dangle": "off",
      "arrow-parens": ["error", "as-needed"],
      "object-curly-spacing": "off",
      "camelcase": "off",
      "max-len": ["error", 120],
      "array-bracket-spacing": "off",
      "space-before-blocks": "off",
      "space-before-function-paren": "off",
      "prefer-spread": "off",
      "no-invalid-this": "off"
    },
    "parserOptions": {
      "sourceType": "module",
      "allowImportExportEverywhere": false,
      "codeFrame": false
    }
};
