'use strict';

require('../..');

var mainGo = require('./main/main.go');

var pet = mainGo.pet.New('my pet');

console.log(pet.Name());

pet.SetName('new name...');

console.log(pet.Name());
