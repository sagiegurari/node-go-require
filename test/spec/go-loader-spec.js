'use strict';

/*jslint stupid: true, nomen: true*/

const path = require('path');
const chai = require('chai');
const assert = chai.assert;
const rimraf = require('rimraf');
const goLoader = require('../../lib/go-loader');

require('../helpers/helper').modifyTestLoader();

describe('Go Loader', function () {
    const tempPath = path.join(__dirname, '../../.temp');

    rimraf.sync(tempPath);

    describe('runGoScript2JS', function () {
        it('simple', function () {
            this.timeout(90000);

            delete process.env.NODE_GO_REQUIRE_MINIFY;

            const goFile = path.resolve(__dirname, '../helpers/main/main.go');
            const js = goLoader.runGoScript2JS(goFile);

            assert.isString(js);
            assert.isTrue(js.length > 0);
        });

        it('minified', function () {
            this.timeout(180000);

            const goFile = path.resolve(__dirname, '../helpers/main/main.go');

            process.env.NODE_GO_REQUIRE_MINIFY = 'FALSE';
            const unminified = goLoader.runGoScript2JS(goFile);
            assert.isString(unminified);
            assert.isTrue(unminified.length > 0);

            process.env.NODE_GO_REQUIRE_MINIFY = 'TRUE';
            const minified = goLoader.runGoScript2JS(goFile);
            assert.isString(minified);
            assert.isTrue(minified.length > 0);

            assert.isTrue(minified.length < unminified.length);
        });

        it('options', function () {
            this.timeout(180000);

            const goFile = path.resolve(__dirname, '../helpers/main/main.go');

            process.env.NODE_GO_REQUIRE_MINIFY = 'FALSE';
            const minified = goLoader.runGoScript2JS(goFile, {
                minify: true //opposite of env
            });
            assert.isString(minified);
            assert.isTrue(minified.length > 0);

            process.env.NODE_GO_REQUIRE_MINIFY = 'TRUE';
            const unminified = goLoader.runGoScript2JS(goFile, {
                minify: false //opposite of env
            });
            assert.isString(unminified);
            assert.isTrue(unminified.length > 0);

            assert.isTrue(minified.length < unminified.length);
        });

        it('error', function () {
            this.timeout(90000);

            const goFile = path.resolve(__dirname, '../helpers/main/error.go');
            try {
                const js = goLoader.runGoScript2JS(goFile);
                assert.notOk(js);
            } catch (error) {
                assert.isDefined(error);
            }
        });
    });

    describe('createGopherJSCommandArgs', function () {
        it('no minify', function () {
            const args = goLoader.createGopherJSCommandArgs('./test.go');

            assert.deepEqual(args, [
                'build',
                './test.go'
            ]);
        });

        it('minify false', function () {
            const args = goLoader.createGopherJSCommandArgs('./test.go', false);

            assert.deepEqual(args, [
                'build',
                './test.go'
            ]);
        });

        it('minify true', function () {
            const args = goLoader.createGopherJSCommandArgs('./test.go', true);

            assert.deepEqual(args, [
                'build',
                '-m',
                './test.go'
            ]);
        });
    });
});
