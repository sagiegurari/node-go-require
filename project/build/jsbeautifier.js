'use strict';

module.exports.tasks = {
    jsbeautifier: {
        full: {
            options: {
                config: '.jsbeautifyrc'
            },
            src: [
                '*.js',
                '<%=BuildConfig.libDirectory%>/**/*.js',
                'project/build/**/*.js'
            ]
        }
    }
};
