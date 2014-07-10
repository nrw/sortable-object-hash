# sortable-object-hash [![build status](https://secure.travis-ci.org/nrw/sortable-object-hash.png)](http://travis-ci.org/nrw/sortable-object-hash)

Based on an array path and a sort order for each property, generate a hash
string for an object that will sort accordingly.

[![testling badge](https://ci.testling.com/nrw/sortable-object-hash.png)](https://ci.testling.com/nrw/sortable-object-hash)

## Example

``` js
var sortableHash = require('sortable-object-hash')
var order = {
  str: ['a','b','c'],
  num: ['1','2','3']
}

var sortable = sortableHash(['str','num'], order)

sortable.hash({str:'a', num:'1'}) // bvzrvzyveyze
sortable.hash({str:'c', num:'2'}) // w0k33m89ewwd
sortable.hash({str:'z', num:'3'}) // w1q1tubb9y65

sortable.hash({str:['a','b'], num:'3'}) // g25bjg5yp2fx
sortable.hash({str:['a','c']}) // g25vjugup7fd
```

## Usage

### var sortable = sortableHash(path, order, interpolated={}, opts={})

Returns a new `hash` function that takes objects and returns a string that will
sort in the order defined by `path` and `order`.

#### path

An array of keys each key can be a `string` or an `array`. Each key produces a
section of the hash. Key strings will be interpolated with single `{mustaches}`
from the object's properties.

#### order

An object mapping keys to arrays of keys in the desired sort order.

#### interpolate

An object mapping keys to arrays of keys in the desired sort order.

``` js
var order = {
  str: ['a','b','c'],
  num: ['1','2','3']
}
var interpolated = {
  first: ['x','y','z']
}
// interpolated key: {interpolated[object[thisValue]]}.objectProperty
var sortable = sortableHash(['{key}.val','str','num'], order, interpolated)

sortable.hash({key: 'first', val: 'z', str:'a', num:'1'}) // u55gg5z5zgg5
```

#### opts

- `opts.interpolate = /{([\s\S]+?)}/g` regex to match for interpolation (uses
  [lodash.template](https://www.npmjs.org/package/lodash.template)).
- `opts.empty = 20` the index to assign to properties not found in the sort
  order. set higher than the max data index to place empty items after. set to
  -1 to place empty properties before.
- `opts.separator = 21` the index to assign separation of keys. must be larger
  than max data index and `opts.empty`
- `opts.delimiter = '.'` the delimiter to used for splitting interpolated keys.

### sortable.hash(obj)

Return a sortable hash string.

### sortable.array(obj)

Return the array of indexes that will be passed to
[sortable-hash](https://www.npmjs.org/package/sortable-hash) to generate a hash.

## License

MIT
