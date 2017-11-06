# node-go-require

[![NPM Version](http://img.shields.io/npm/v/node-go-require.svg?style=flat)](https://www.npmjs.org/package/node-go-require) [![Build Status](https://travis-ci.org/sagiegurari/node-go-require.svg)](http://travis-ci.org/sagiegurari/node-go-require) [![Coverage Status](https://coveralls.io/repos/sagiegurari/node-go-require/badge.svg)](https://coveralls.io/r/sagiegurari/node-go-require) [![bitHound Code](https://www.bithound.io/github/sagiegurari/node-go-require/badges/code.svg)](https://www.bithound.io/github/sagiegurari/node-go-require) [![Inline docs](http://inch-ci.org/github/sagiegurari/node-go-require.svg?branch=master)](http://inch-ci.org/github/sagiegurari/node-go-require)<br>
[![License](https://img.shields.io/npm/l/node-go-require.svg?style=flat)](https://github.com/sagiegurari/node-go-require/blob/master/LICENSE) [![Total Downloads](https://img.shields.io/npm/dt/node-go-require.svg?style=flat)](https://www.npmjs.org/package/node-go-require) [![Dependency Status](https://david-dm.org/sagiegurari/node-go-require.svg)](https://david-dm.org/sagiegurari/node-go-require) [![devDependency Status](https://david-dm.org/sagiegurari/node-go-require/dev-status.svg)](https://david-dm.org/sagiegurari/node-go-require?type=dev)<br>
[![Known Vulnerabilities](https://snyk.io/test/github/sagiegurari/node-go-require/badge.svg)](https://snyk.io/test/github/sagiegurari/node-go-require) [![Retire Status](http://retire.insecurity.today/api/image?uri=https://raw.githubusercontent.com/sagiegurari/node-go-require/master/package.json)](http://retire.insecurity.today/api/image?uri=https://raw.githubusercontent.com/sagiegurari/node-go-require/master/package.json)

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
npm install --save node-go-require
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

## API Documentation
See full docs at: [API Docs](docs/api.md)

## Contributing
See [contributing guide](.github/CONTRIBUTING.md)

<a name="history"></a>
## Release History

| Date        | Version | Description |
| ----------- | ------- | ----------- |
| 2017-11-06  | v1.0.45 | Maintenance |
| 2017-02-07  | v1.0.25 | Ability to generate minified js code |
| 2016-07-26  | v0.1.2  | Add integration test via docker |
| 2015-02-14  | v0.0.16 | Modified tests and examples due to changes in gopherjs API |
| 2015-02-09  | v0.0.15 | Grunt cleanups. |
| 2015-02-06  | v0.0.14 | Doc changes |
| 2015-02-05  | v0.0.13 | Fix continues integrations |
| 2015-02-05  | v0.0.12 | Minor internal quality changes |
| 2014-12-30  | v0.0.11 | Doc changes |
| 2014-12-07  | v0.0.10 | Minor internal changes |
| 2014-12-03  | v0.0.9  | No need to modify generated code |
| 2014-12-03  | v0.0.8  | Simplified code generation modification |
| 2014-12-02  | v0.0.7  | Mock gopherjs calls for continues integration tests. |
| 2014-12-02  | v0.0.3  | Initial release. |

<a name="license"></a>
## License
Developed by Sagie Gur-Ari and licensed under the Apache 2 open source license.
