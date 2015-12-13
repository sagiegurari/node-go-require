'use strict';

module.exports.tasks = {
    eslint: {
        full: {
            options: {
                config: '.eslintrc.json'
            },
            src: [
                '*.js',
                '<%=BuildConfig.libDirectory%>/**/*.js',
                '<%=BuildConfig.buildDirectory%>/**/*.js'
            ]
        }
    }
};
