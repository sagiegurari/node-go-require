'use strict';

var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var chai = require('chai');
var assert = chai.assert;

module.exports = {
    modifyTestLoader: function () {
        var gopherjs;
        if (process.env.GOPATH) {
            var goPath = process.env.GOPATH || '';
            gopherjs = path.join(goPath, 'bin/gopherjs');
            var isWin = (/^win/).test(process.platform);
            if (isWin) {
                gopherjs = gopherjs + '.exe';
            }
        } else {
            process.env.GOPATH = '';
        }

        /*jslint stupid: true */
        if ((!gopherjs) || (!fs.existsSync(gopherjs))) {
            console.log('Running tests without GO/gopherjs installed.');

            childProcess.spawnSync = function (cmd, args) {
                assert.isTrue(cmd.indexOf('gopherjs') !== -1);
                var goFile = args[args.length - 1];

                if (goFile.indexOf('error.go') !== -1) {
                    return {
                        status: 1,
                        stdio: 'mock error'
                    };
                }

                /*jslint nomen: true */
                var jsPath = path.join(__dirname, 'pet-helper.js');
                /*jslint nomen: false */
                var jsString = fs.readFileSync(jsPath, {
                    encoding: 'utf8'
                });

                //get output JS file
                var tempPath = '.';
                var jsFile = goFile.substring(0, goFile.length - 'go'.length) + 'js';
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
