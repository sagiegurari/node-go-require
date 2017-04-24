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
**Access**: public  
**Author**: Sagie Gur-Ari  

* [GoLoader](#GoLoader)
    * [new GoLoader()](#new_GoLoader_new)
    * [#createGopherJSCommand(goFile, gopherjs, [minify])](#GoLoader+createGopherJSCommand) ⇒ <code>String</code>
    * [#runGopherJS(goFile, gopherjs, [minify])](#GoLoader+runGopherJS) ⇒ <code>Object</code>
    * [#runGoScript2JS(goFile, [options])](#GoLoader+runGoScript2JS) ⇒ <code>String</code>
    * [#loadGoScript(goFile, goModule, [options])](#GoLoader+loadGoScript) ⇒ <code>Object</code>

<a name="new_GoLoader_new"></a>

### new GoLoader()
The GoLoader enables to load google go script files and to load them into the
node runtime as JS files.

<a name="GoLoader+createGopherJSCommand"></a>

### GoLoader#createGopherJSCommand(goFile, gopherjs, [minify]) ⇒ <code>String</code>
Runs the gopherjs converter process.

**Returns**: <code>String</code> - The generate command  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| goFile | <code>String</code> |  | The google go script file path |
| gopherjs | <code>String</code> |  | The gopherjs executable file location |
| [minify] | <code>Boolean</code> | <code>false</code> | True to minify the generated code |

<a name="GoLoader+runGopherJS"></a>

### GoLoader#runGopherJS(goFile, gopherjs, [minify]) ⇒ <code>Object</code>
Runs the gopherjs converter process.

**Returns**: <code>Object</code> - The process execution output (see shelljs for more information)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| goFile | <code>String</code> |  | The google go script file path |
| gopherjs | <code>String</code> |  | The gopherjs executable file location |
| [minify] | <code>Boolean</code> | <code>false</code> | True to minify the generated code |

<a name="GoLoader+runGoScript2JS"></a>

### GoLoader#runGoScript2JS(goFile, [options]) ⇒ <code>String</code>
Converts the provided go file into JS script text.

**Returns**: <code>String</code> - The JS string of the converted go script  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| goFile | <code>String</code> |  | The google go script file path |
| [options] | <code>Object</code> |  | Optional runtime options |
| [options.minify] | <code>Boolean</code> | <code>process.env.NODE_GO_REQUIRE_MINIFY</code> | True to minify the generated code |

<a name="GoLoader+loadGoScript"></a>

### GoLoader#loadGoScript(goFile, goModule, [options]) ⇒ <code>Object</code>
Converts the provided google go file into JS script and loads it into
the node runtime.

**Returns**: <code>Object</code> - The JS module  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| goFile | <code>String</code> |  | The go script file path |
| goModule | <code>Object</code> |  | The module for the go script |
| [options] | <code>Object</code> |  | Optional runtime options |
| [options.minify] | <code>Boolean</code> | <code>process.env.NODE_GO_REQUIRE_MINIFY</code> | True to minify the generated code |

<a name="NodeGoRequire"></a>

## NodeGoRequire : <code>object</code>
Extends the require capabilities to allow loading of google go
script files as JS files.

**Kind**: global namespace  
**Author**: Sagie Gur-Ari  
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
    * [.goLoader](#NodeGoRequire.goLoader) : [<code>GoLoader</code>](#GoLoader)
    * [.requireGo(goModule, fileName)](#NodeGoRequire.requireGo)

<a name="NodeGoRequire.goLoader"></a>

### NodeGoRequire.goLoader : [<code>GoLoader</code>](#GoLoader)
The GO loader instance.

**Access**: public  
<a name="NodeGoRequire.requireGo"></a>

### NodeGoRequire.requireGo(goModule, fileName)
The node require implementation for google go scripts.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| goModule | <code>Object</code> | The module for the go script |
| fileName | <code>String</code> | The go script file name |

