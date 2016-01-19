'use strict';

module.exports.tasks = {
    jshint: {
        full: {
            files: {
                src: [
                    '*.js',
                    '<%=BuildConfig.libDirectory%>/**/*.js',
                    '<%=BuildConfig.buildDirectory%>/**/*.js'
                ]
            }
        },
        options: {
            jshintrc: true
        }
    }
};
