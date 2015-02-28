var bytewise = require('bytewise')
var HashArray = require('./array')

module.exports = SortableHash

function SortableHash (path, order, interpolated, opts) {
  var array = HashArray(path, order, interpolated, opts)

  return {
    hash: hash,
    array: array
  }

  function hash (doc) {
    return bytewise.encode(array(doc)).toString('hex')
  }
}
