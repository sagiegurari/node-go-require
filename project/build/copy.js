'use strict';

module.exports.tasks = {
    copy: {
        coverage: {
            files: [
                {
                    expand: true,
                    src: ['index.js'],
                    dest: '<%=BuildConfig.targetDirectory%>/coverage'
                },
                {
                    expand: true,
                    src: ['<%=BuildConfig.testDirectory%>/spec/**'],
                    dest: '<%=BuildConfig.targetDirectory%>/coverage'
                },
                {
                    expand: true,
                    src: ['<%=BuildConfig.testDirectory%>/helpers/**/*'],
                    dest: '<%=BuildConfig.targetDirectory%>/coverage'
                }
            ]
        }
    }
};
