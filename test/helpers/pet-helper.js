'use strict';

function Pet(name) {
    this.name = name;
}

Pet.prototype.Name = function () {
    return this.name;
};

Pet.prototype.SetName = function (name) {
    this.name = name;
};

module.exports = {
    pet: {
        New(name) {
            return new Pet(name);
        }
    }
};
