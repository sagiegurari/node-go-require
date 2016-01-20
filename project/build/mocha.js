'use strict';

module.exports.tasks = {
    mochaTest: {
        full: {
            options: {
                reporter: 'spec'
            },
            src: ['./<%=BuildConfig.testDirectory%>/**/*spec.js']
        },
        coverageLCOV: {
            options: {
                require: 'blanket',
                reporter: 'mocha-lcov-reporter',
                quiet: true,
                captureFile: '<%=BuildConfig.targetDirectory%>/coverage/report/coverage.info'
            },
            src: ['./<%=BuildConfig.targetDirectory%>/coverage/test/**/*spec.js']
        },
        coverageValidation: {
            options: {
                reporter: 'travis-cov'
            },
            src: ['./<%=BuildConfig.targetDirectory%>/coverage/test/**/*spec.js']
        },
        coverageHTML: {
            options: {
                reporter: 'html-cov',
                quiet: true,
                captureFile: '<%=BuildConfig.targetDirectory%>/coverage/report/coverage.html'
            },
            src: ['./<%=BuildConfig.targetDirectory%>/coverage/test/**/*spec.js']
        }
    }
};
