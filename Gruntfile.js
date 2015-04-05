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
                directives: {
                    node: true,
                    vars: true,
                    plusplus: true
                }
            }
        },

        eslint: {
            full: {
                options: {
                    config: '.eslintrc'
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
                    'private': true
                },
                src: '<%=BuildConfig.libDirectory%>/**/*.js',
                dest: 'docs/api.md'
            }
        }
    });

    grunt.registerTask('full', 'Run all build steps.', [
        'clean:target',
        'jsonlint:full',
        'jshint:full',
        'jslint:full',
        'eslint:full',
        'jscs:full',
        'todos:full',
        'jsdoc2md:api',
        'copy:coverage',
        'blanket:full',
        'mochaTest:coverageHTML'
    ]);

    grunt.registerTask('coverage', 'Run all module tests cases.', [
        'clean:target',
        'copy:coverage',
        'blanket:full',
        'mochaTest:coverageLCOV'
    ]);

    grunt.registerTask('continuesIntegration', 'Run all module tests cases.', [
        'jsonlint:full',
        'jshint:full',
        'jslint:full',
        'eslint:full',
        'jscs:full',
        'todos:full',
        'coverage',
        'coveralls:full'
    ]);

    grunt.registerTask('test', 'Run all module tests cases.', [
        'mochaTest:full'
    ]);
};
