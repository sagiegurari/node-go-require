'use strict';

/*jslint stupid: true, nomen: true*/
/*global describe: false, it: false*/

var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var rimraf = require('rimraf');
var goLoader = require('../../lib/go-loader');

require('../helpers/helper').modifyTestLoader();

describe('Go Loader', function () {
    var tempPath = path.join(__dirname, '../../.temp');

    rimraf.sync(tempPath);

    describe('runGoScript2JS', function () {
        it('simple', function () {
            this.timeout(90000);

            delete process.env.NODE_GO_REQUIRE_MINIFY;

            var goFile = path.resolve(__dirname, '../helpers/main/main.go');
            var js = goLoader.runGoScript2JS(goFile);

            assert.isString(js);
            assert.isTrue(js.length > 0);
        });

        it('minified', function () {
            this.timeout(180000);

            var goFile = path.resolve(__dirname, '../helpers/main/main.go');

            process.env.NODE_GO_REQUIRE_MINIFY = 'FALSE';
            var unminified = goLoader.runGoScript2JS(goFile);
            assert.isString(unminified);
            assert.isTrue(unminified.length > 0);

            process.env.NODE_GO_REQUIRE_MINIFY = 'TRUE';
            var minified = goLoader.runGoScript2JS(goFile);
            assert.isString(minified);
            assert.isTrue(minified.length > 0);

            assert.isTrue(minified.length < unminified.length);
        });

        it('options', function () {
            this.timeout(180000);

            var goFile = path.resolve(__dirname, '../helpers/main/main.go');

            process.env.NODE_GO_REQUIRE_MINIFY = 'FALSE';
            var minified = goLoader.runGoScript2JS(goFile, {
                minify: true //opposite of env
            });
            assert.isString(minified);
            assert.isTrue(minified.length > 0);

            process.env.NODE_GO_REQUIRE_MINIFY = 'TRUE';
            var unminified = goLoader.runGoScript2JS(goFile, {
                minify: false //opposite of env
            });
            assert.isString(unminified);
            assert.isTrue(unminified.length > 0);

            assert.isTrue(minified.length < unminified.length);
        });

        it('error', function () {
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

    describe('createGopherJSCommand', function () {
        it('no minify', function () {
            var command = goLoader.createGopherJSCommand('./test.go', 'run');

            assert.strictEqual(command, '"run" build "./test.go"');
        });

        it('minify false', function () {
            var command = goLoader.createGopherJSCommand('./test.go', 'run', false);

            assert.strictEqual(command, '"run" build "./test.go"');
        });

        it('minify true', function () {
            var command = goLoader.createGopherJSCommand('./test.go', 'run', true);

            assert.strictEqual(command, '"run" build -m "./test.go"');
        });
    });
});
