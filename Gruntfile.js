'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.config.init({
        BuildConfig: {
            libDirectory: 'lib',
            testDirectory: 'test',
            targetDirectory: 'target'
        },

        clean: {
            options: {
                force: true
            },
            dot: 'true',
            target: {
                src: [
                    '<%=BuildConfig.targetDirectory%>/**'
                ]
            }
        },

        jsonlint: {
            full: {
                src: [
                    '<%=BuildConfig.libDirectory%>/**/*.json',
                    '*.json'
                ]
            }
        },

        jshint: {
            full: {
                files: {
                    src: [
                        '*.js',
                        '<%=BuildConfig.libDirectory%>/**/*.js'
                    ]
                }
            },
            options: {
                jshintrc: true
            }
        },

        jslint: {
            full: {
                src: [
                    '*.js',
                    '<%=BuildConfig.libDirectory%>/**/*.js'
                ],
                options: {
                    edition: 'latest',
                    failOnError: true
                },
                directives: grunt.file.readJSON('.jslintrc')
            }
        },

        eslint: {
            full: {
                options: {
                    config: '.eslintrc.json'
                },
                src: [
                    '*.js',
                    '<%=BuildConfig.libDirectory%>/**/*.js'
                ]
            }
        },

        jscs: {
            full: {
                options: {
                    config: '.jscs.json'
                },
                files: {
                    src: [
                        '*.js',
                        '<%=BuildConfig.libDirectory%>/**/*.js'
                    ]
                }
            }
        },

        todos: {
            options: {
                priorities: {
                    high: /(todo|TODO|fixme|FIXME)/
                }
            },
            full: {
                src: [
                    'index.js',
                    '<%=BuildConfig.libDirectory%>/**/*.js',
                    '<%=BuildConfig.testDirectory%>/**/*.js'
                ]
            }
        },

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
        },

        blanket: {
            full: {
                files: {
                    'target/coverage/lib': ['<%=BuildConfig.libDirectory%>/']
                }
            }
        },

        mochaTest: {
            full: {
                options: {
                    reporter: 'spec'
                },
                src: ['./<%=BuildConfig.testDirectory%>/**/*spec.js']
            },
            coverageLCOV: {
                options: {
                    require: 'blanket',
                    reporter: 'mocha-lcov-reporter',
                    quiet: true,
                    captureFile: '<%=BuildConfig.targetDirectory%>/coverage/report/coverage.info'
                },
                src: ['./<%=BuildConfig.targetDirectory%>/coverage/test/**/*spec.js']
            },
            coverageHTML: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: '<%=BuildConfig.targetDirectory%>/coverage/report/coverage.html'
                },
                src: ['./<%=BuildConfig.targetDirectory%>/coverage/test/**/*spec.js']
            }
        },

        coveralls: {
            options: {
                force: true
            },
            full: {
                src: '<%=BuildConfig.targetDirectory%>/coverage/report/*.info'
            }
        },

        jsdoc2md: {
            api: {
                options: {
                    index: true,
                    private: true
                },
                src: '<%=BuildConfig.libDirectory%>/**/*.js',
                dest: 'docs/api.md'
            }
        }
    });

    grunt.registerTask('cleanup', 'Cleanups', [
        'clean:target'
    ]);

    grunt.registerTask('lint', 'Linting tasks.', [
        'jsonlint:full',
        'jshint:full',
        'jslint:full',
        'eslint:full',
        'jscs:full',
        'todos:full'
    ]);

    grunt.registerTask('coverage-prepare', 'Pre test tasks', [
        'cleanup',
        'copy:coverage',
        'blanket:full'
    ]);

    grunt.registerTask('test', 'Continues integration related tasks.', [
        'lint',
        'coverage-ci'
    ]);

    grunt.registerTask('docs', 'Generate docs.', [
        'jsdoc2md:api'
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
};
