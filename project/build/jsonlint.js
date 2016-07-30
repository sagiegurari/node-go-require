'use strict';

module.exports.tasks = {
    jsonlint: {
        full: {
            src: [
                '*.json',
                '<%=BuildConfig.libDirectory%>/**/*.json',
                'project/**/*.json'
            ]
        },
        format: {
            src: [
                '*.json',
                '<%=BuildConfig.libDirectory%>/**/*.json',
                'project/**/*.json'
            ],
            options: {
                format: true,
                indent: 2
            }
        }
    }
};
