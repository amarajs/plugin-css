## [@amarajs/plugin-css](https://github.com/amarajs/plugin-css)

Plugin middleware for AmaraJS to add CSS styles and classes to DOM nodes dynamically.

### Installation

`npm install --save @amarajs/plugin-css`

### Usage

```javascript
import Amara from '@amarajs/core';
import AmaraCSS from '@amarajs/plugin-css';
import AmaraBrowser from '@amarajs/plugin-engine-browser';
const amara = new Amara([
    AmaraCSS(),
    AmaraBrowser()
]);
```

### Feature Type

The `@amarajs/plugin-css` middleware allows you to create features of type `"class"` and `"style"`.

#### Return Values

For `{type: "class"}` features, your apply function should return either an array of CSS class names to add to the target's `classList`, or else an object literal whose keys are CSS class names and whose values will be used to determine whether to add that class to the target. Truthy values will be added; non-truthy values will be removed.

```javascript
// add an array of class names
amara.add({
    type: 'class',
    targets: ['main'],
    apply: () => ['a', 'b']
});

// add classes based on truthiness
amara.add({
    type: 'class',
    target: ['main'],
    apply: () => ({
        'a': true,
        'b': false
    })
});
```

For `{type: "style"}` features, your apply function should return an object literal whose keys are style properties (camelCased) and whose values are strings representing the property value.

```javascript
// set explicit styles
amara.add({
    type: 'style',
    targets: ['main'],
    apply: () => ({
        fontSize: '12pt',
        fontWeight: 'bold'
    })
});
```

### Applying Multiple Results to the Same Target

If multiple `{type: "class"}` features target the same DOM, the CSS class names to apply to the target node will be combined and de-duplicated.

If multiple `{type: "style"}` features target the same DOM, the object literals will be merged together in the order the features were applied, with later features overwriting earlier features if multiple objects have the same property name.

### Customization

This plugin has no customization options.

### Contributing

If you have a feature request, please create a new issue so the community can discuss it.

If you find a defect, please submit a bug report that includes a working link to reproduce the problem (for example, using [this fiddle](https://jsfiddle.net/04f3v2x4/)). Of course, pull requests to fix open issues are always welcome!

### License

The MIT License (MIT)

Copyright (c) Dan Barnes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
