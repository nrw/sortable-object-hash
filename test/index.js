var test = require('tape')
var sortable = require('../')

test('hash', function (t) {
  var order = {
    style: ['freestyle', 'compulsory'],
    division: ['singles', 'doubles']
  }
  var s = sortable(['style', 'division'], order)

  var hashes = [
    s.hash({style: 'freestyle', division: 'singles'}),
    s.hash({style: 'freestyle', division: 'doubles'}),
    s.hash({style: 'freestyle', division: 'doubles'}),
    s.hash({style: 'none', division: 'singles'})
  ]

  t.equal(hashes[0], 'bvzrvzyveyze')
  t.equal(hashes[1], 'f9qmcru9eyxd')
  t.equal(hashes[2], 'f9qmcru9eyxd')
  t.equal(hashes[3], 'smz5vvfu9yqe')

  var copy = hashes.slice(0).sort()
  t.same(hashes, copy)
  t.end()
})

test('larger number', function (t) {
  var order = {
    c: 'abcdefghijklmno'.split(''),
    n: '1234'.split('')
  }
  var s = sortable(['c', 'n'], order)
  var hashes = [
    s.hash({c: 'o', n: '4'}),
    s.hash({c: 'a', n: '1'})
  ]
  t.equal(hashes[0], 'w1k1vzssey40')
  t.equal(hashes[1], 'bvzrvzyveyze')

  var copy = hashes.slice(0).sort()
  t.same([hashes[1], hashes[0]], copy)

  t.end()
})

test('expands s.hash for longer order', function (t) {
  var order = {
    c: 'abcdefghijklmnop'.split(''),
    n: '1234'.split('')
  }
  var s = sortable(['c', 'n'], order)
  var hashes = [
    s.hash({c: 'a', n: '1'}),
    s.hash({c: 'd', n: '9'}),
    s.hash({c: 'p', n: '4'})
  ]

  t.equal(hashes[0], 'bvzrvzyveyze')
  t.equal(hashes[1], 'w0v3cybm4wn1')
  t.equal(hashes[2], 'w1k3uvuhew54')

  var copy = hashes.slice(0).sort()
  t.same(hashes, copy)

  t.end()
})

test('sort empty before', function (t) {
  var order = {
    c: 'abcdefghijklmnop'.split(''),
    n: '1234'.split('')
  }
  var s = sortable(['c', 'n'], order, {}, {empty: -1})
  var hashes = [
    s.hash({c: 'a', n: '9'}),
    s.hash({c: 'a', n: '1'}),
    s.hash({c: 'd', n: '9'})
  ]

  t.equal(hashes[0], 'bvzrtyyv4ug5')
  t.equal(hashes[1], 'bvzrvzyveyze')
  t.equal(hashes[2], 'skv7tyfm4s61')

  var copy = hashes.slice(0).sort()
  t.same(hashes, copy)

  t.end()
})

test('interpolates', function (t) {
  var path = ['{key}.val', 'n']
  var order = {
    c: 'abcdefghijklmnopqr'.split(''),
    n: '123456789'.split('')
  }
  var interpolated = {x: 'xyz'.split('')}
  var s = sortable(path, order, interpolated)

  var hashes = [
    s.hash({key: 'x', val: ['x', 'z'], c: 'a', n: '1'}),
    s.hash({key: 'x', val: ['x', 'y', 'z'], c: 'a', n: '2'})
  ]

  t.equal(hashes[0], 'e6evmygvr7fx')
  t.equal(hashes[1], 'ghhkkhqtqvkh')

  var copy = hashes.slice(0).sort()
  t.same(hashes, copy)

  t.end()
})

test('throws for separator', function (t) {
  var order = {
    c: 'abcdefghijklmno'.split(''),
    n: '1234'.split('')
  }
  var s = sortable(['c', 'n'], order, {}, {separator: 14})
  s.hash({c: 'a', n: '1'})

  try {
    s.hash({c: 'o', n: '4'})
  } catch (e) {
    t.ok(e)
    t.equal(e.message, 'max: 14 clashes with separator: 14')
  }

  t.end()
})

test('throws for empty', function (t) {
  var order = {
    c: 'abcdefghijklmno'.split(''),
    n: '1234'.split('')
  }
  var s = sortable(['c', 'n'], order, {}, {empty: 2})

  s.hash({c: 'a', n: '1'})

  try {
    s.hash({c: 'o', n: '4'})
  } catch (e) {
    t.ok(e)
    t.equal(e.message, 'empty: 2 is within index range: 0-14')
  }

  t.end()
})
