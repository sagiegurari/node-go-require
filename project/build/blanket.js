'use strict';

module.exports.tasks = {
    blanket: {
        full: {
            files: {
                'target/coverage/lib': ['<%=BuildConfig.libDirectory%>/']
            }
        }
    }
};
