module.exports = (config) => {
    const conf = {
        basePath: 'test/frontend',
        frameworks: ['mocha'],
        files: ['all_tests.js'],

        preprocessors: {
            "all_tests.js": ["webpack"]
        },
        webpack: require("./webpack.config"),
        webpackMiddleware: {
            stats: "errors-only"
        },
        node: {
            fs: "empty"
        },

        reporters: ['mocha'],
        mochaReporter: {output: 'full'},
        browserConsoleLogOptions: {
            level: 'log', format: '%b %T: %m', terminal: true
        },
        port: 9876,
        browsers: ['Chrome'],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        singleRun: true,
    }

    if (process.env.TRAVIS) {
        conf.browsers = ['Chrome_travis_ci'];
    }

    config.set(conf)
}
