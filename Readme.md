# sortable-object-hash [![build status](https://secure.travis-ci.org/nrw/sortable-object-hash.png)](http://travis-ci.org/nrw/sortable-object-hash)

Based on an array paty and a sort order for each property, generate a hash string
for an object that will sort accordingly.

[![testling badge](https://ci.testling.com/nrw/sortable-object-hash.png)](https://ci.testling.com/nrw/sortable-object-hash)

## Example

``` js
var sortable = require('sortable-object-hash')
var order = {
  char: ['a','b','c'],
  num: ['1','2','3']
}

var hash = sortable(['char','num'], order)

hash({char:'a', num:'1'}) // '1x1'
hash({char:'c', num:'2'}) // '3x2'
hash({char:'z', num:'3'}) // 'ox3'

hash({char:['a','b'], num:'3'}) // '12x3'
hash({char:['a','c']}) // '13xo'
```

## Usage

### var hash = sortable(path, order, interpolated={}, opts={})

Returns a new `hash` function that takes objects and returns a string that will
sort in the order defined by `path` and `order`.

**path**  
An array of keys each key can be a `string` or an `array`. Each key produces a
section of the hash. Key strings will be interpolated with single `{mustaches}`
from the object's properties.

**order**  
An object mapping keys to arrays of keys in the desired sort order.

**interpolated**  
An object mapping keys to arrays of keys in the desired sort order.

``` js
var order = {
  char: ['a','b','c'],
  num: ['1','2','3']
}
var interpolated = {
  first: ['x','y','z']
}
// interpolated key: {interpolated[object[thisValue]]}.objectProperty
var hash = sortable(['{key}.val','char','num'], order, interpolated)

hash({key: 'first', val: 'z', char:'a', num:'1'}) // '2x1x1'
```

**opts**  
`opts.interpolate = /{([\s\S]+?)}/g` regex to match for interpolation (uses
[lodash.template](https://www.npmjs.org/package/lodash.template)).  
`opts.empty = 'after'` where properties that are not found in the sort order
should be placed: `before` or `after`.  
`opts.delimiter = '.'` the delimiter to used for splitting interpolated keys.

## Contributing

Please make any changes to the `.coffee` source files and `npm build` before
sending a pull request.

## License

MIT
