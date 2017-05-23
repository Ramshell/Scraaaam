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
      }]
    },
    "parserOptions": {
      "sourceType": "module",
      "allowImportExportEverywhere": false,
      "codeFrame": false
    }
};
