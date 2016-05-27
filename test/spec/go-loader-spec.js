'use strict';
/*jslint stupid: true, nomen: true */
/*global describe: false, it: false */

var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var rimraf = require('rimraf');
var goLoader = require('../../lib/go-loader');

require('../helpers/helper').modifyTestLoader();

describe('Go Loader Tests', function () {
    /*jslint nomen: true*/
    var tempPath = path.join(__dirname, '../../.temp');
    /*jslint nomen: false*/

    rimraf.sync(tempPath);

    describe('runGoScript2JS Tests', function () {
        it('runGoScript2JS valid', function () {
            this.timeout(90000);

            var goFile = path.resolve(__dirname, '../helpers/main/main.go');
            var js = goLoader.runGoScript2JS(goFile);

            assert.isString(js);
            assert.isTrue(js.length > 0);
        });

        it('runGoScript2JS error', function () {
            this.timeout(90000);

            var goFile = path.resolve(__dirname, '../helpers/main/error.go');
            try {
                var js = goLoader.runGoScript2JS(goFile);
                assert.notOk(js);
            } catch (error) {
                assert.isDefined(error);
            }
        });
    });
});
