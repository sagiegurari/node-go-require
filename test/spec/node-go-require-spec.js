'use strict';

/*jslint stupid: true, nomen: true*/

const path = require('path');
const chai = require('chai');
const assert = chai.assert;
require('../../lib/node-go-require');

require('../helpers/helper').modifyTestLoader();

describe('Node Go', function () {
    it('require setup', function () {
        assert.isFunction(require.extensions['.go']);
    });

    it('require', function () {
        this.timeout(90000);

        const goFile = path.resolve(__dirname, '../helpers/main/main.go');
        const jsModule = require(goFile);

        const pet = jsModule.pet.New('my pet');
        let output = pet.Name();
        assert.equal('my pet', output);
        pet.SetName('new name');
        output = pet.Name();
        assert.equal('new name', output);
    });
});
