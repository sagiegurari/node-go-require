'use strict';

module.exports.tasks = {
    jsonlint: {
        full: {
            src: [
                '<%=BuildConfig.libDirectory%>/**/*.json',
                '*.json'
            ]
        }
    }
};
