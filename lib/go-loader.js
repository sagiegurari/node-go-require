'use strict';
/*eslint no-sync:0*/
/*jslint debug: true, stupid: true */
/*global root: false */

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var extend = require('node.extend');
var shell = require('shelljs');

//private constants
var modulePrefix = '$module.';
var modulePrefixLength = modulePrefix.length;

/**
 * The GoLoader enables to load google go script files and to load them into the
 * node runtime as JS files.
 *
 * @author Sagie Gur-Ari
 * @class GoLoader
 * @private
 */
function GoLoader() {
}

/**
 * Runs the gopherjs converter process.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {string} goFile - The google go script file path
 * @param {string} gopherjs - The gopherjs executable file location
 * @returns {object} The process execution output (see shelljs for more information)
 */
GoLoader.prototype.runGopherJS = function (goFile, gopherjs) {
    return shell.exec('"' + gopherjs + '" build "' + goFile + '"');
};

/**
 * Converts the provided go file into JS script text.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {string} goFile - The google go script file path
 * @returns {string} The JS string of the converted go script
 */
GoLoader.prototype.runGoScript2JS = function (goFile) {
    //get current working directory
    var cwd = process.cwd();

    //get output JS file
    var tempPath = './.temp';
    var jsFile = goFile.substring(0, goFile.length - 'go'.length) + 'js';
    jsFile = path.basename(jsFile);
    var jsPath = path.join(tempPath, jsFile);

    //set to a temp folder
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath);
    } else if (fs.existsSync(jsPath)) {
        fs.unlinkSync(jsPath);
    }
    process.chdir(tempPath);

    var gopherjs = path.join(process.env.GOPATH, 'bin/gopherjs');
    var output = this.runGopherJS(goFile, gopherjs);

    process.chdir(cwd);

    if (output.code !== 0) {
        throw new Error('Failed to convert Go file to JS\n' + output.output);
    }

    //read JS file
    var jsString = fs.readFileSync(jsPath, {
        encoding: 'utf8'
    });

    var continueLoop = false;
    var index1 = null;
    var index2 = null;
    var buffer = null;
    do {
        continueLoop = false;

        index1 = jsString.indexOf(modulePrefix);
        if (index1 !== -1) {
            index2 = jsString.indexOf('=', index1 + modulePrefixLength);
            if (index2 !== -1) {
                buffer = [];
                buffer.push(jsString.substring(0, index1));
                buffer.push('module.exports.');
                buffer.push(jsString.substring(index1 + modulePrefixLength, index2));
                buffer.push(' = ');
                buffer.push(jsString.substring(index2 + 1));

                jsString = buffer.join('');
                continueLoop = true;
            }
        }
    } while (continueLoop);

    return jsString;
};

/**
 * Converts the provided google go file into JS script and loads it into
 * the node runtime.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {string} goFile - The go script file path
 * @param {object} goModule - The module for the go script
 * @returns {object} The JS module
 */
GoLoader.prototype.loadGoScript = function (goFile, goModule) {
    var jsString = this.runGoScript2JS(goFile);

    /*jslint nomen: true */
    var context = extend({}, global, {
        root: root,
        module: goModule,
        require: goModule.require.bind(goModule),
        exports: goModule.exports,
        __filename: goFile + '.js',
        __dirname: path.resolve(goFile, '..')
    });
    /*jslint nomen: false */
    context.global = context;

    return vm.runInNewContext(jsString, context, {
        filename: goFile + '.js'
    });
};

var goLoader = new GoLoader();  //singleton

module.exports = goLoader;
