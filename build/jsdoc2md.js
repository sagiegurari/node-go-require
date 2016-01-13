'use strict';

module.exports.tasks = {
    jsdoc2md: {
        api: {
            options: {
                index: true,
                private: false
            },
            src: '<%=BuildConfig.libDirectory%>/**/*.js',
            dest: 'docs/api.md'
        }
    }
};
