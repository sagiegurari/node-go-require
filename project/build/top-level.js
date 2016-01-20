'use strict';

module.exports = function (grunt) {
    grunt.registerTask('coverage-prepare', 'Pre test tasks', [
        'cleanup',
        'copy:coverage',
        'blanket:full',
        'mochaTest:coverageValidation'
    ]);

    grunt.registerTask('coverage-ci', 'Test for continues integration.', [
        'coverage-prepare',
        'mochaTest:coverageLCOV',
        'coveralls:full'
    ]);

    grunt.registerTask('coverage-html', 'Test for standalone builds.', [
        'coverage-prepare',
        'mochaTest:coverageHTML'
    ]);

    grunt.registerTask('build', 'Run all build steps.', [
        'lint',
        'docs',
        'coverage-html'
    ]);

    return {};
};
