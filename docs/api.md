#Index

**Classes**

* [class: GoLoader](#GoLoader)
  * [new GoLoader()](#new_GoLoader)
  * [GoLoader#runGopherJS(goFile, gopherjs)](#GoLoader#runGopherJS)
  * [GoLoader#runGoScript2JS(goFile)](#GoLoader#runGoScript2JS)
  * [GoLoader#loadGoScript(goFile, goModule)](#GoLoader#loadGoScript)

**Namespaces**

* [NodeGoRequire](#NodeGoRequire)
  * [NodeGoRequire.requireGo(goModule, fileName)](#NodeGoRequire.requireGo)
 
<a name="GoLoader"></a>
#class: GoLoader
**Members**

* [class: GoLoader](#GoLoader)
  * [new GoLoader()](#new_GoLoader)
  * [GoLoader#runGopherJS(goFile, gopherjs)](#GoLoader#runGopherJS)
  * [GoLoader#runGoScript2JS(goFile)](#GoLoader#runGoScript2JS)
  * [GoLoader#loadGoScript(goFile, goModule)](#GoLoader#loadGoScript)

<a name="new_GoLoader"></a>
##new GoLoader()
The GoLoader enables to load google go script files and to load them into the
node runtime as JS files.

**Author**: Sagie Gur-Ari  
<a name="GoLoader#runGopherJS"></a>
##GoLoader#runGopherJS(goFile, gopherjs)
Runs the gopherjs converter process.

**Params**

- goFile `string` - The google go script file path  
- gopherjs `string` - The gopherjs executable file location  

**Returns**: `object` - The process execution output (see shelljs for more information)  
<a name="GoLoader#runGoScript2JS"></a>
##GoLoader#runGoScript2JS(goFile)
Converts the provided go file into JS script text.

**Params**

- goFile `string` - The google go script file path  

**Returns**: `string` - The JS string of the converted go script  
<a name="GoLoader#loadGoScript"></a>
##GoLoader#loadGoScript(goFile, goModule)
Converts the provided google go file into JS script and loads it into
the node runtime.

**Params**

- goFile `string` - The go script file path  
- goModule `object` - The module for the go script  

**Returns**: `object` - The JS module  
<a name="NodeGoRequire"></a>
#NodeGoRequire
Extends the require capabilities to allow loading of google go
script files as JS files.

**Author**: Sagie Gur-Ari  
**Members**

* [NodeGoRequire](#NodeGoRequire)
  * [NodeGoRequire.requireGo(goModule, fileName)](#NodeGoRequire.requireGo)

<a name="NodeGoRequire.requireGo"></a>
##NodeGoRequire.requireGo(goModule, fileName)
The node require implementation for google go scripts.

**Params**

- goModule `object` - The module for the go script  
- fileName `string` - The go script file name  

