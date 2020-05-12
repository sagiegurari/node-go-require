'use strict';

require('../..');

const jsModule = require('./main/vertex.go');

const vertex = jsModule.vertex.New(2, 6);

console.log(vertex.Abs());
