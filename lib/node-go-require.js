'use strict';
/*eslint no-sync:0*/

/**
 * Extends the require capabilities to allow loading of google go
 * script files as JS files.
 *
 * @author Sagie Gur-Ari
 * @namespace NodeGoRequire
 */

var goLoader = require('./go-loader');

/**
 * The node require implementation for google go scripts.
 *
 * @function
 * @memberof! NodeGoRequire
 * @public
 * @param {object} goModule - The module for the go script
 * @param {string} fileName - The go script file name
 */
var requireGo = function (goModule, fileName) {
    goLoader.loadGoScript(fileName, goModule);
};

//use go loader to return a JS module
require.extensions['.go'] = requireGo;

module.exports = {
    requireGo: requireGo,
    goLoader: goLoader
};
