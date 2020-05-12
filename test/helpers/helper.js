'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const chai = require('chai');
const assert = chai.assert;

module.exports = {
    modifyTestLoader() {
        let gopherjs = 'gopherjs';
        const isWin = (/^win/).test(process.platform);
        if (isWin) {
            gopherjs = `${gopherjs}.exe`;
        }
        if (process.env.GOPATH) {
            const goPath = process.env.GOPATH || '';
            gopherjs = path.join(goPath, 'bin', gopherjs);
        } else {
            process.env.GOPATH = '';
        }

        /*jslint stupid: true */
        if ((!gopherjs) || (!fs.existsSync(gopherjs))) {
            const processOutput = childProcess.spawnSync(gopherjs, ['-help'], {
                windowsHide: true
            });

            if (processOutput.status !== 0) {
                gopherjs = null;
            }
        }

        if (!gopherjs) {
            console.log('Running tests without GO/gopherjs installed.');

            childProcess.spawnSync = function (cmd, args) {
                assert.isTrue(cmd.indexOf('gopherjs') !== -1);
                const goFile = args[args.length - 1];

                if (goFile.indexOf('error.go') !== -1) {
                    return {
                        status: 1,
                        stdio: 'mock error'
                    };
                }

                /*jslint nomen: true */
                let jsPath = path.join(__dirname, 'pet-helper.js');
                /*jslint nomen: false */
                let jsString = fs.readFileSync(jsPath, {
                    encoding: 'utf8'
                });

                //get output JS file
                const tempPath = '.';
                let jsFile = goFile.substring(0, goFile.length - 'go'.length) + 'js';
                jsFile = path.basename(jsFile);
                jsPath = path.join(tempPath, jsFile);

                if (args[1] === '-m') {
                    jsString = jsString.split('\n').join('');
                }

                fs.writeFileSync(jsPath, jsString, {
                    encoding: 'utf8'
                });

                return {
                    status: 0
                };
            };
        }
        /*jslint stupid: false */
    }
};
