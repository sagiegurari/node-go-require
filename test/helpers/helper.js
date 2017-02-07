'use strict';

var fs = require('fs');
var path = require('path');

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

            var shell = require('shelljs');
            shell.exec = function (cmd) {
                cmd = cmd.substring(cmd.indexOf(' build '));
                var start = cmd.indexOf('"');
                var goFile = cmd.substring(start + 1, cmd.indexOf('"', start + 2));

                if (goFile.indexOf('error.go') !== -1) {
                    return {
                        code: 1,
                        output: 'mock error'
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

                if (cmd.indexOf('-m') !== -1) {
                    jsString = jsString.split('\n').join('');
                }

                fs.writeFileSync(jsPath, jsString, {
                    encoding: 'utf8'
                });

                return {
                    code: 0
                };
            };
        }
        /*jslint stupid: false */
    }
};
