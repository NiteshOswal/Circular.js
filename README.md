# Circular.js

A small AMD, CommonJS, Global (window) compatible helper utility (usually called a replacer in `JSON.stringify`) to remove circular references for stringifying an object.

## Usage

Using circular.js is pretty simple & straightforward, it provides you with several options to keep or discard keys from the object you're stringifying too.

```javascript
stringified = JSON.stringify(obj, circular()); //the most basic usage option without any options or refs

```

With basic parameters you can pass into circular, the helper looks something like..
```
circular([ref [, options]]);
```

### ref - default: "[circular Circular]"

`ref` is the reference name you want to assign your circular references.

```javascript
stringified = JSON.stringify(obj, circular("[circular]")) //overrides [circular Circular] to [circular]
```
`ref` can also be a callback `function` which takes a single `value` parameter and processes the passed value even more..

```javascript
stringified = JSON.stringify(obj, circular(function(v) {
    return "some_string_" + v;
}))
```

### options

Circular provides you with various `options` to enable or disable few features, some of the most usable ones being able to keep or discard object's various keys

Options supported by circular include -

- **stringifyFunctions** : *a `boolean` flag to specify whether you need to stringify values of type functions or discard them `default: true`*
- **keep** : *an array to specify only those keys that you want to keep in your final `json` output*
- **discard** : *an array to specify object's keys that you want to discard from your final `json` output*

You have the flexibility to just pass in the options without overriding the default `ref`
```javascript
stringified = JSON.stringify(obj, circular({ //without overriding ref
    stringifyFunctions: false,
    keep: ["Modernizr"]
}))
```

Or you can also override `ref` and pass in the options as the 2nd parameter
```javascript
stringified = JSON.stringify(obj, circular("[circular]", { //with an alternative reference name
    stringifyFunctions: false,
    keep: ["Modernizr"]
}))
```

---
Feel free to report any bugs, or pull requests which can extend it with even more features

