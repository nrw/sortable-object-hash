var template = require('lodash.template')
var sortHash = require('sortable-hash')

module.exports = Hash

function Hash (path, order, interpolated, opts) {
  interpolated = interpolated || {}

  opts = opts || {}
  opts.interpolate = opts.interpolate || /\{([\s\S]+?)\}/g
  opts.delimiter = opts.delimiter || '.'
  opts.precision = opts.precision || 12

  opts.separator = opts.separator || 21
  opts.empty = opts.empty || 20

  var sep = {}
  var empty = {}
  var max = 0

  return {
    array: array,
    hash: hash
  }

  function hash (doc) {
    return sortHash.encode(array(doc), opts.precision)
  }

  function array (doc) {
    var sort = []

    path.forEach(function (tpl) {
      if (sort.length) {
        sort.push(sep)
      }

      var key = template(tpl, doc, {interpolate: opts.interpolate})
      var keys = key.split(opts.delimiter)
      key = keys[0]

      var field = keys[1] || key
      var searching = (key === tpl ? order[key] : interpolated[key]) || []
      var has = doc[field] || ''

      has = Array.isArray(has) ? has : [has]

      for (var i = 0; i < has.length; i++) {
        var one = has[i]
        var index = searching.indexOf(one)

        if (index === -1) {
          sort.push(empty)
        } else {
          sort.push(index)
        }

        if (index > max) {
          max = index
        }
      }
    })

    // validate empty and sparator
    if (max >= opts.separator) {
      throw new Error('max: ' + max +
        ' clashes with separator: ' + opts.separator)
    }
    if (opts.empty >= 0 && max >= opts.empty) {
      throw new Error('empty: ' + opts.empty +
        ' is within index range: 0-' + max)
    }

    return sort.map(function (item) {
      if (item === sep) return opts.separator
      if (item === empty) return opts.empty
      return item
    })
  }
}
