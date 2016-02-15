'use strict';
/*jslint stupid: true, nomen: true */
/*global describe: false, it: false */

var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var library = require('../../lib/node-go-require');

require('../helpers/helper').modifyTestLoader(library.goLoader);

describe('Node Go Tests', function () {
    it('require setup', function () {
        assert.isFunction(require.extensions['.go']);
    });

    it('require test', function () {
        this.timeout(90000);

        var goFile = path.resolve(__dirname, '../helpers/main/main.go');
        var jsModule = require(goFile);

        var pet = jsModule.pet.New('my pet');
        var output = pet.Name();
        assert.equal('my pet', output);
        pet.SetName('new name');
        output = pet.Name();
        assert.equal('new name', output);
    });
});
