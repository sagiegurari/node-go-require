# {"gitdown": "gitinfo", "name": "name"}

[![NPM Version](http://img.shields.io/npm/v/{"gitdown": "gitinfo", "name": "name"}.svg?style=flat)](https://www.npmjs.org/package/{"gitdown": "gitinfo", "name": "name"}) [![Build Status](https://travis-ci.org/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}.svg)](http://travis-ci.org/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}) [![Coverage Status](https://coveralls.io/repos/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/badge.svg)](https://coveralls.io/r/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}) [![bitHound Code](https://www.bithound.io/github/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/badges/code.svg)](https://www.bithound.io/github/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}) [![Inline docs](http://inch-ci.org/github/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}.svg?branch=master)](http://inch-ci.org/github/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"})<br>
[![License](https://img.shields.io/npm/l/{"gitdown": "gitinfo", "name": "name"}.svg?style=flat)](https://github.com/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/blob/master/LICENSE) [![Total Downloads](https://img.shields.io/npm/dt/{"gitdown": "gitinfo", "name": "name"}.svg?style=flat)](https://www.npmjs.org/package/{"gitdown": "gitinfo", "name": "name"}) [![Dependency Status](https://david-dm.org/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}.svg)](https://david-dm.org/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}) [![devDependency Status](https://david-dm.org/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/dev-status.svg)](https://david-dm.org/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}?type=dev)<br>
[![Known Vulnerabilities](https://snyk.io/test/github/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/badge.svg)](https://snyk.io/test/github/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}) [![Retire Status](http://retire.insecurity.today/api/image?uri=https://raw.githubusercontent.com/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/master/package.json)](http://retire.insecurity.today/api/image?uri=https://raw.githubusercontent.com/{"gitdown": "gitinfo", "name": "username"}/{"gitdown": "gitinfo", "name": "name"}/master/package.json)

> Load google go script as any javascript modules under nodeJS runtime.

* [Overview](#overview)
* [Usage](#usage)
* [Installation](#installation)
* [Limitations](#limitations)
* [API Documentation](docs/api.md)
* [Contributing](.github/CONTRIBUTING.md)
* [Release History](#history)
* [License](#license)

<a name="overview"></a>
## Overview
Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

See [golang.org](https://golang.org/) for more information.

<a name="usage"></a>
## Usage
In order to use google go scripts under node, you need to first require this library as follows

```js
require('node-go-require');
```

Now you can require your google go files like any other javascript files, for example:

```js
var petGo = require('./pet.go');

var pet = petGo.pet.New('my pet');
console.log(pet.Name());
pet.SetName('new name...');
console.log(pet.Name());
```

In your go file, instead of doing module.exports as in any JS file, use the gopherjs solution for exporting objects/functions.

Do not export to the global namespace, instead export to the module namespace.

For example:

```go
js.Module.Get("exports").Set("pet", map[string]interface{}{
    "New": New,
})
```

Full example (GO):

```go
package main

import "github.com/gopherjs/gopherjs/js"

type Pet struct {
  name string
}

func New(name string) *js.Object {
  return js.MakeWrapper(&Pet{name})
}

func (p *Pet) Name() string {
  return p.name
}

func (p *Pet) SetName(name string) {
  p.name = name
}

func main() {
  js.Module.Get("exports").Set("pet", map[string]interface{}{
    "New": New,
  })
}
```

Full example (JavaScript):

```js
require('node-go-require');

var petGo = require('./pet.go');

var pet = petGo.pet.New('my pet');
console.log(pet.Name());
pet.SetName('new name...');
console.log(pet.Name());
```

In order to generate minified javascript code, first set the following environment variable:

```sh
NODE_GO_REQUIRE_MINIFY=TRUE
```

<a name="installation"></a>
## Installation
In order to use this library, just run the following npm install command:

```sh
npm install --save {"gitdown": "gitinfo", "name": "name"}
```

Apart of installing the NPM modules, you will need to setup the following:

* Install Google Go - [installation guide](https://golang.org/doc/install) (make sure that GOPATH env variable is defined)
* Install gopherjs - [gopherjs](https://github.com/gopherjs/gopherjs) by running

```sh
go get -u github.com/gopherjs/gopherjs
```

<a name="limitations"></a>
## Limitations
The Google Go to javascript conversion is done by gopherjs and there are some limitations of running the gopherjs generated code under node runtime.

To see exact limitations please see gopherjs project at: [gopherjs](https://github.com/gopherjs/gopherjs)

{"gitdown": "include", "file": "./README-footer-template.md"}
