'use strict';

/*jslint nomen: true, stupid: true*/

module.exports = function (grunt) {
    grunt.registerTask('integration-test', 'Run integration tests', [
        'docker-integration-test'
    ]);

    grunt.registerMultiTask('docker-integration-test', function runTask() {
        /*eslint-disable no-invalid-this*/
        if (String(global.build.options.BuildConfig.nodeMajorVersion) === process.env.DOCKER_INTEGRATION_TEST_NODE_VERSION) {
            grunt.log.writeln('Integration test requested.');

            var childProcess = require('child_process');
            var path = require('path');

            var directory = path.join(__dirname, 'integration');
            var file = path.join(directory, 'build.sh');

            /*eslint-disable no-sync*/
            grunt.log.writeln('Running integration test script.');
            childProcess.execFileSync(file, {
                cwd: directory,
                encoding: 'utf8'
            });
            /*eslint-enable no-sync*/
        } else {
            grunt.log.writeln('Skipping integration test.');
        }
        /*eslint-enable no-invalid-this*/
    });

    return {
        tasks: {
            'docker-integration-test': {
                full: {}
            }
        }
    };
};
