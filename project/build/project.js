'use strict';

/*jslint nomen: true*/

module.exports = function (grunt) {
    var path = require('path');
    var integrationDirectory = path.join(__dirname, 'integration');

    grunt.registerTask('integration-test', 'Run integration tests', [
        'docker-integration-test'
    ]);

    grunt.registerTask('project-docs', 'Create project docs', [
        'empty'
    ]);

    grunt.registerTask('docker-integration-test', function runTask() {
        if (String(global.build.options.buildConfig.nodeMajorVersion) === process.env.DOCKER_INTEGRATION_TEST_NODE_VERSION) {
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
                    command: path.join(integrationDirectory, 'build.sh'),
                    execOptions: {
                        cwd: integrationDirectory,
                        encoding: 'utf8',
                        maxBuffer: 1024000000
                    }
                }
            }
        }
    };
};
