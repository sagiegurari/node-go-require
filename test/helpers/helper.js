'use strict';

var fs = require('fs');
var path = require('path');

module.exports = {
    modifyTestLoader: function (goLoader) {
        if (!process.env.GOPATH) {
            console.log('Running tests without GO installed.');
            goLoader.runGopherJS = function(goFile) {
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
            }
        }
    }
};
