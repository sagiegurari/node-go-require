'use strict';

/**
 * Extends the require capabilities to allow loading of google go
 * script files as JS files.
 *
 * @author Sagie Gur-Ari
 * @namespace NodeGoRequire
 * @example
 * In order to use google go scripts under node, you need to first require this library as follows
 * ```js
 * require('node-go-require');
 * ```
 * Now you can require your google go files like any other javascript files, for example:
 * ```js
 * var petGo = require('./pet.go');
 *
 * var pet = petGo.pet.New('my pet');
 * console.log(pet.Name());
 * pet.SetName('new name...');
 * console.log(pet.Name());
 * ```
 * Go source:
 * ```go
 * package main
 *
 * import "github.com/gopherjs/gopherjs/js"
 *
 * type Pet struct {
 *    name string
 * }
 *
 * func New(name string) *js.Object {
 *    return js.MakeWrapper(&Pet{name})
 * }
 *
 * func (p *Pet) Name() string {
 *    return p.name
 * }
 *
 * func (p *Pet) SetName(name string) {
 *    p.name = name
 * }
 *
 * func main() {
 *    js.Module.Get("exports").Set("pet", map[string]interface{}{
 *       "New": New,
 *    })
 * }
 * ```
 */

var goLoader = require('./go-loader');

/**
 * The node require implementation for google go scripts.
 *
 * @function
 * @alias NodeGoRequire.requireGo
 * @memberof! NodeGoRequire
 * @public
 * @param {Object} goModule - The module for the go script
 * @param {String} fileName - The go script file name
 */
var requireGo = function (goModule, fileName) {
    goLoader.loadGoScript(fileName, goModule);
};

//use go loader to return a JS module
require.extensions['.go'] = requireGo;

module.exports = {
    requireGo: requireGo,
    /**
     * The GO loader instance.
     *
     * @member {GoLoader}
     * @alias NodeGoRequire.goLoader
     * @memberof! NodeGoRequire
     * @public
     */
    goLoader: goLoader
};
