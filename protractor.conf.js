exports.config = {
  framework: 'mocha',
  mochaOpts: {
     timeout: 30000,
  },
  onPrepare: function () {
    require("babel-register");
  },
  specs: ['test/e2e/dashboard.test.js']
};
