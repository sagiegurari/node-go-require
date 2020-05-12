'use strict';

const chai = require('chai');
const assert = chai.assert;
require('../../');

describe('Index', function () {
    it('require setup', function () {
        assert.isFunction(require.extensions['.go']);
    });
});
