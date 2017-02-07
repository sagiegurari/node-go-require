'use strict';

/*jslint stupid: true, nomen: true*/
/*global describe: false, it: false*/

var path = require('path');
var chai = require('chai');
var assert = chai.assert;
require('../../lib/node-go-require');

require('../helpers/helper').modifyTestLoader();

describe('Node Go', function () {
    it('require setup', function () {
        assert.isFunction(require.extensions['.go']);
    });

    it('require', function () {
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
