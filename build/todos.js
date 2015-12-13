'use strict';

module.exports.tasks = {
    todos: {
        options: {
            priorities: {
                high: /(todo|TODO|fixme|FIXME)/
            }
        },
        full: {
            src: [
                'index.js',
                '<%=BuildConfig.libDirectory%>/**/*.js',
                '<%=BuildConfig.testDirectory%>/**/*.js'
            ]
        }
    }
};
