# node-go-require

[![NPM Version](http://img.shields.io/npm/v/node-go-require.svg?style=flat)](https://www.npmjs.org/package/node-go-require) [![Build Status](https://img.shields.io/travis/sagiegurari/node-go-require.svg?style=flat)](http://travis-ci.org/sagiegurari/node-go-require) [![Dependencies](http://img.shields.io/david/sagiegurari/node-go-require.svg?style=flat)](https://david-dm.org/sagiegurari/node-go-require) [![Coverage Status](https://img.shields.io/coveralls/sagiegurari/node-go-require.svg?style=flat)](https://coveralls.io/r/sagiegurari/node-go-require)

> Load google go script as any javascript modules under nodeJS runtime.

## Overview
Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

See https://golang.org/ for more information.

## Usage
In order to use google go scripts under node, you need to first require this library as follows

```js
require('node-go-require');
```

Now you can require your google go files like any other javascript files, for example:

```js
var jsModule = require('./main/main.go');

var pet = jsModule.pet.New('my pet');
console.log(pet.Name());
pet.SetName('new name...');
console.log(pet.Name());
```

In your go file, instead of doing module.exports as in any JS file, use the gopherjs solution for exporting objects/functions.

Do not export to the global namespace, instead export to the module namespace.

For example:

```js
js.Module.Get("exports").Set("pet", map[string]interface{}{
    "New": New,
})
```

## Installation
In order to use this library, apart of installing the NPM modules, you will need to setup the following:

 * Install Google Go - https://golang.org/doc/install (make sure that GOPATH env variable is defined)
 * Install gopherjs - https://github.com/gopherjs/gopherjs by running
```
go get -u github.com/gopherjs/gopherjs
```

## Limitations
The Google Go to javascript conversion is done by gopherjs and there are some limitations of running the gopherjs generated code under node runtime.

To see exact limitations please see gopherjs project at: https://github.com/gopherjs/gopherjs

## Release History

 * 2014-12-03   v0.0.9   No need to modify generated code
 * 2014-12-03   v0.0.8   Simplified code generation modification
 * 2014-12-02   v0.0.7   Mock gopherjs calls for continues integration tests.
 * 2014-12-02   v0.0.3   Initial release.

## License
Developed by Sagie Gur-Ari and licensed under the Apache 2 open source license.
