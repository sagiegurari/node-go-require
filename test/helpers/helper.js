'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
    modifyTestLoader: function (goLoader) {
        var goPath = process.env.GOPATH || '';
        var gopherjs = path.join(goPath, 'bin/gopherjs');
        var isWin = /^win/.test(process.platform);
        if (isWin) {
            gopherjs = gopherjs + '.exe';
        }
        if ((!process.env.GOPATH) || (!fs.existsSync(gopherjs))) {
            console.log('Running tests without GO/gopherjs installed.');
            goLoader.runGopherJS = function(goFile) {
                if (goFile.indexOf('error.go') !== -1) {
                    return {
                        code: 1,
                        output: 'mock error'
                    };
                }

                var jsPath = path.join(__dirname, 'pet.js');
                var jsString = fs.readFileSync(jsPath, {
                    encoding: 'utf8'
                });

                //get output JS file
                var tempPath = '.';
                var jsFile = goFile.substring(0, goFile.length - 'go'.length) + 'js';
                jsFile = path.basename(jsFile);
                jsPath = path.join(tempPath, jsFile);

                fs.writeFileSync(jsPath, jsString, {
                    encoding: 'utf8'
                });

                return {
                    code: 0
                };
            };
        }
    }
};
