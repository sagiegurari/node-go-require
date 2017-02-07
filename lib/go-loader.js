'use strict';

/*global root: false*/

var fs = require('fs');
var path = require('path');
var vm = require('vm');
var extend = require('node.extend');
var shell = require('shelljs');

/*jslint debug: true*/
/*eslint-disable no-empty-function*/
/**
 * The GoLoader enables to load google go script files and to load them into the
 * node runtime as JS files.
 *
 * @author Sagie Gur-Ari
 * @class GoLoader
 * @public
 */
function GoLoader() {}
/*eslint-enable no-empty-function*/
/*jslint debug: false*/

/**
 * Runs the gopherjs converter process.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {String} goFile - The google go script file path
 * @param {String} gopherjs - The gopherjs executable file location
 * @param {Boolean} [minify=false] - True to minify the generated code
 * @returns {String} The generate command
 */
GoLoader.prototype.createGopherJSCommand = function (goFile, gopherjs, minify) {
    var flags = '';
    if (minify) {
        flags = '-m ';
    }

    return '"' + gopherjs + '" build ' + flags + '"' + goFile + '"';
};

/**
 * Runs the gopherjs converter process.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {String} goFile - The google go script file path
 * @param {String} gopherjs - The gopherjs executable file location
 * @param {Boolean} [minify=false] - True to minify the generated code
 * @returns {Object} The process execution output (see shelljs for more information)
 */
GoLoader.prototype.runGopherJS = function (goFile, gopherjs, minify) {
    var command = this.createGopherJSCommand(goFile, gopherjs, minify);

    return shell.exec(command, {
        silent: true
    });
};

/**
 * Converts the provided go file into JS script text.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {String} goFile - The google go script file path
 * @param {Object} [options] - Optional runtime options
 * @param {Boolean} [options.minify=process.env.NODE_GO_REQUIRE_MINIFY] - True to minify the generated code
 * @returns {String} The JS string of the converted go script
 */
GoLoader.prototype.runGoScript2JS = function (goFile, options) {
    options = options || {};
    if (options.minify === undefined) {
        options.minify = (String(process.env.NODE_GO_REQUIRE_MINIFY).toLowerCase() === 'true');
    }

    //get current working directory
    var cwd = process.cwd();

    /*jslint nomen: true*/
    var tempPath = path.join(__dirname, '../.temp');
    /*jslint nomen: false*/

    //get output JS file
    var jsFile = goFile.substring(0, goFile.length - 'go'.length) + 'js';
    jsFile = path.basename(jsFile);
    var jsPath = path.join(tempPath, jsFile);

    /*eslint-disable no-sync*/
    /*jslint stupid: true*/
    //set to a temp folder
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath);
    } else if (fs.existsSync(jsPath)) {
        fs.unlinkSync(jsPath);
    }
    process.chdir(tempPath);

    var gopherjs = path.join(process.env.GOPATH, 'bin/gopherjs');
    var output = this.runGopherJS(goFile, gopherjs, options.minify);

    process.chdir(cwd);

    if (output.code !== 0) {
        throw new Error('Failed to convert Go file to JS\n' + output.output);
    }

    //read JS file
    return fs.readFileSync(jsPath, {
        encoding: 'utf8'
    });
};
/*jslint stupid: false*/
/*eslint-enable no-sync*/

/**
 * Converts the provided google go file into JS script and loads it into
 * the node runtime.
 *
 * @function
 * @memberof! GoLoader
 * @public
 * @param {String} goFile - The go script file path
 * @param {Object} goModule - The module for the go script
 * @param {Object} [options] - Optional runtime options
 * @param {Boolean} [options.minify=process.env.NODE_GO_REQUIRE_MINIFY] - True to minify the generated code
 * @returns {Object} The JS module
 */
GoLoader.prototype.loadGoScript = function (goFile, goModule, options) {
    var jsString = this.runGoScript2JS(goFile, options);

    /*jslint nomen: true*/
    var context = extend({}, global, {
        root: root,
        module: goModule,
        require: goModule.require.bind(goModule),
        exports: goModule.exports,
        __filename: goFile + '.js',
        __dirname: path.resolve(goFile, '..')
    });
    /*jslint nomen: false*/
    context.global = context;

    return vm.runInNewContext(jsString, context, {
        filename: goFile + '.js'
    });
};

var goLoader = new GoLoader(); //singleton

module.exports = goLoader;
