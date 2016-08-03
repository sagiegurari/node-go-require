'use strict';

/*jslint nomen: true*/

module.exports = function (grunt) {
    var path = require('path');

    grunt.registerTask('integration-test', 'Run integration tests', [
        'docker-integration-test'
    ]);

    grunt.registerTask('docker-integration-test', function runTask() {
        if (String(global.build.options.BuildConfig.nodeMajorVersion) === process.env.DOCKER_INTEGRATION_TEST_NODE_VERSION) {
            grunt.log.writeln('Integration test requested.');

            grunt.task.run('shell:docker');
        } else {
            grunt.log.writeln('Skipping integration test.');
        }
    });

    return {
        tasks: {
            shell: {
                options: {
                    stdout: true,
                    stderr: true,
                    stdin: false,
                    failOnError: true
                },
                docker: {
                    command: 'build.sh',
                    execOptions: {
                        cwd: path.join(__dirname, 'integration'),
                        encoding: 'utf8',
                        maxBuffer: 1024000000
                    }
                }
            }
        }
    };
};
