'use strict';

require('../..');

var jsModule = require('./main/main.go');

var pet = jsModule.pet.New('my pet');

console.log(pet.Name());

pet.SetName('new name...');

console.log(pet.Name());
