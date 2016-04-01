## Classes

<dl>
<dt><a href="#GoLoader">GoLoader</a></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#NodeGoRequire">NodeGoRequire</a> : <code>object</code></dt>
<dd><p>Extends the require capabilities to allow loading of google go
script files as JS files.</p>
</dd>
</dl>

<a name="GoLoader"></a>

## GoLoader
**Kind**: global class  
**Access:** public  
**Author:** Sagie Gur-Ari  

* [GoLoader](#GoLoader)
    * [new GoLoader()](#new_GoLoader_new)
    * [#runGopherJS(goFile, gopherjs)](#GoLoader+runGopherJS) ⇒ <code>object</code>
    * [#runGoScript2JS(goFile)](#GoLoader+runGoScript2JS) ⇒ <code>string</code>
    * [#loadGoScript(goFile, goModule)](#GoLoader+loadGoScript) ⇒ <code>object</code>

<a name="new_GoLoader_new"></a>

### new GoLoader()
The GoLoader enables to load google go script files and to load them into the
node runtime as JS files.

<a name="GoLoader+runGopherJS"></a>

### GoLoader#runGopherJS(goFile, gopherjs) ⇒ <code>object</code>
Runs the gopherjs converter process.

**Returns**: <code>object</code> - The process execution output (see shelljs for more information)  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| goFile | <code>string</code> | The google go script file path |
| gopherjs | <code>string</code> | The gopherjs executable file location |

<a name="GoLoader+runGoScript2JS"></a>

### GoLoader#runGoScript2JS(goFile) ⇒ <code>string</code>
Converts the provided go file into JS script text.

**Returns**: <code>string</code> - The JS string of the converted go script  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| goFile | <code>string</code> | The google go script file path |

<a name="GoLoader+loadGoScript"></a>

### GoLoader#loadGoScript(goFile, goModule) ⇒ <code>object</code>
Converts the provided google go file into JS script and loads it into
the node runtime.

**Returns**: <code>object</code> - The JS module  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| goFile | <code>string</code> | The go script file path |
| goModule | <code>object</code> | The module for the go script |

<a name="NodeGoRequire"></a>

## NodeGoRequire : <code>object</code>
Extends the require capabilities to allow loading of google go
script files as JS files.

**Kind**: global namespace  
**Author:** Sagie Gur-Ari  
**Example**  
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
Go source:
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

* [NodeGoRequire](#NodeGoRequire) : <code>object</code>
    * [.goLoader](#NodeGoRequire.goLoader) : <code>[GoLoader](#GoLoader)</code>
    * [.requireGo(goModule, fileName)](#NodeGoRequire.requireGo)

<a name="NodeGoRequire.goLoader"></a>

### NodeGoRequire.goLoader : <code>[GoLoader](#GoLoader)</code>
The GO loader instance.

**Access:** public  
<a name="NodeGoRequire.requireGo"></a>

### NodeGoRequire.requireGo(goModule, fileName)
The node require implementation for google go scripts.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| goModule | <code>object</code> | The module for the go script |
| fileName | <code>string</code> | The go script file name |

