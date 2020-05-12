'use strict';

require('../..');

const mainGo = require('./main/pet.go');

const pet = mainGo.pet.New('my pet');

console.log(pet.Name());

pet.SetName('new name...');

console.log(pet.Name());
