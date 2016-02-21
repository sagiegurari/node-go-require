'use strict';

module.exports = function (grunt) {
    grunt.registerTask('coverage-prepare', 'Pre test tasks', [
        'cleanup'
    ]);

    grunt.registerTask('coverage', 'Test for standalone builds.', [
        'coverage-prepare',
        'mocha_istanbul:coverage'
    ]);

    grunt.registerTask('coverage-ci', 'Test for continues integration.', [
        'coverage',
        'coveralls:full'
    ]);

    grunt.registerTask('build', 'Run all build steps.', [
        'lint',
        'docs',
        'coverage'
    ]);

    return {};
};
