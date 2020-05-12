'use strict';

/*jslint nomen: true*/
//jscs:disable disallowDanglingUnderscores
/*eslint-disable no-underscore-dangle*/

module.exports = function (grunt) {
    const commons = require('js-project-commons');

    commons.grunt.config.initConfig(grunt, {
        buildConfig: {
            projectRoot: __dirname,
            nodeProject: true,
            skipSecurityCheck: true
        }
    });
};
