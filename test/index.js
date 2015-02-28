var test = require('tape')
var SortableHash = require('../')

test('hash', function (t) {
  var order = {
    style: ['freestyle', 'compulsory'],
    division: ['singles', 'doubles']
  }
  var s = SortableHash(['style', 'division'], order)
  var hashes = [
    s.hash({style: 'freestyle', division: 'singles'}),
    s.hash({style: 'freestyle', division: 'doubles'}),
    s.hash({style: 'freestyle', division: 'doubles'}),
    s.hash({style: 'none', division: 'singles'})
  ]

  t.same(hashes, hashes.slice(0).sort())
  t.end()
})

test('larger number', function (t) {
  var order = {
    c: 'abcdefghijklmno'.split(''),
    n: '1234'.split('')
  }
  var s = SortableHash(['c', 'n'], order)
  var hashes = [
    s.hash({c: 'o', n: '4'}),
    s.hash({c: 'a', n: '1'})
  ]

  t.same(hashes, hashes.slice(0).sort().reverse())
  t.end()
})

test('expands s.hash for longer order', function (t) {
  var order = {
    c: 'abcdefghijklmnop'.split(''),
    n: '1234'.split('')
  }
  var s = SortableHash(['c', 'n'], order)
  var hashes = [
    s.hash({c: 'a', n: '1'}),
    s.hash({c: 'd', n: '9'}),
    s.hash({c: 'p', n: '4'})
  ]

  t.same(hashes, hashes.slice(0).sort())
  t.end()
})

test('sort empty before', function (t) {
  var order = {
    c: 'abcdefghijklmnop'.split(''),
    n: '1234'.split('')
  }
  var s = SortableHash(['c', 'n'], order, {}, {empty: -1})
  var hashes = [
    s.hash({c: 'a', n: '9'}),
    s.hash({c: 'a', n: '1'}),
    s.hash({c: 'd', n: '9'})
  ]

  t.same(hashes, hashes.slice(0).sort())
  t.end()
})

test('interpolates', function (t) {
  var path = ['{key}.val', 'n']
  var order = {
    c: 'abcdefghijklmnopqr'.split(''),
    n: '123456789'.split('')
  }
  var interpolated = {
    x: 'xyz'.split('')
  }
  var s = SortableHash(path, order, interpolated)

  var hashes = [
    s.hash({key: 'x', val: ['x', 'z'], c: 'a', n: '1'}),
    s.hash({key: 'x', val: ['x', 'y', 'z'], c: 'a', n: '2'})
  ]
  t.same(hashes, hashes.slice(0).sort().reverse())
  t.end()
})

test('throws for separator', function (t) {
  var order = {
    c: 'abcdefghijklmno'.split(''),
    n: '1234'.split('')
  }
  var s = SortableHash(['c', 'n'], order, {}, {separator: 14})
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
  var s = SortableHash(['c', 'n'], order, {}, {empty: 2})

  s.hash({c: 'a', n: '1'})

  try {
    s.hash({c: 'o', n: '4'})
  } catch (e) {
    t.ok(e)
    t.equal(e.message, 'empty: 2 is within index range: 0-14')
  }

  t.end()
})
