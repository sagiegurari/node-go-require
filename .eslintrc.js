'use strict';

var config = require('./project/config/eslintrc-common.json');
config.env = {
    node: true
};
config.rules.strict = [
    2,
    'global'
];

module.exports = config;
