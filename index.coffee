template = require 'lodash.template'

module.exports = (path, order, interpolated = {}, opts = {}) ->
  opts.interpolate or= /{([\s\S]+?)}/g
  opts.empty or= 'after'
  opts.delimiter or= '.'

  empty = if opts.empty is 'after' then 'o' else '0'

  hash = (doc) ->
    sort = ''
    for tpl, i in path
      sort += 'x' if sort

      key = template tpl, doc, {interpolate: opts.interpolate}
      [key, field] = key.split(opts.delimiter)
      field or= key

      # interpolation vs not
      searching = if key is tpl then order[key] else interpolated[key]
      searching or= []

      has = doc[field] or ''
      has = [has] unless Array.isArray has

      for one in has
        index = searching.indexOf(one)
        if index is -1
          sort += empty
        else
          sort += zeroFill(index+1, fillSize searching.length)
    sort

fillSize = (length) ->
  Math.ceil (length+1)/16

zeroFill = (number, width) ->
  width -= number.toString(16).length

  if width > 0
    dot = if /\./.test(number) then 2 else 1
    return new Array(width + dot).join('0') + number.toString(16)

  # always return a string
  number.toString(16) + ''
