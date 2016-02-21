'use strict';

//jscs:disable requireCamelCaseOrUpperCaseIdentifiers
/*eslint-disable camelcase*/

module.exports.tasks = {
    mocha_istanbul: {
        coverage: {
            src: './<%=BuildConfig.testDirectory%>/**/*spec.js',
            options: {
                coverageFolder: '<%=BuildConfig.targetDirectory%>/coverage/report',
                mask: '*spec.js',
                root: './<%=BuildConfig.libDirectory%>',
                check: {
                    lines: 100,
                    statements: 100,
                    branches: 100,
                    functions: 100
                },
                reportFormats: ['html', 'lcovonly', 'text-summary']
            }
        }
    }
};
