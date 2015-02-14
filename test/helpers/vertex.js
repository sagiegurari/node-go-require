'use strict';

require('../..');

var jsModule = require('./main/vertex.go');

var vertex = jsModule.vertex.New(2, 6);

console.log(vertex.Abs());
