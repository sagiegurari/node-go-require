'use strict';

module.exports.tasks = {
    jsdoc2md: {
        api: {
            options: {
                index: true,
                private: true
            },
            src: '<%=BuildConfig.libDirectory%>/**/*.js',
            dest: 'docs/api.md'
        }
    }
};
