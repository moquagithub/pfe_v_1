[![view on npm](http://img.shields.io/npm/v/zerop.svg?style=flat-square)](https://www.npmjs.com/package/zerop)
[![downloads per month](http://img.shields.io/npm/dm/zerop.svg?style=flat-square)](https://www.npmjs.com/package/zerop)
[![node version](https://img.shields.io/badge/node-%3E=0.8-brightgreen.svg?style=flat-square)](https://nodejs.org/download)
[![build status](https://img.shields.io/travis/schwarzkopfb/zerop.svg?style=flat-square)](https://travis-ci.org/schwarzkopfb/zerop)
[![test coverage](https://img.shields.io/coveralls/schwarzkopfb/zerop.svg?style=flat-square)](https://coveralls.io/github/schwarzkopfb/zerop)
[![license](https://img.shields.io/npm/l/zerop.svg?style=flat-square)](https://github.com/schwarzkopfb/zerop/blob/development/LICENSE)

# zerop

Pad a number with leading or trailing zeros.
Currently it's the most efficient package available with this purpose.

## Usage

```js

const pad = require('zerop')

pad(42, 5) // '00042'
pad(42, 5, 16) // '0002a'
pad.right(42, 5) // '42000'

```

## API

`zerop(number, [length=2], [radix=10])` ⇒ `string` <br/>
`zerop.right(number, [length=2], [radix=10])` ⇒ `string`

```js

const pad = require('zerop')

typeof pad === 'function' // pad left
pad === pad.left // reference to the main export
typeof pad.right === 'function' // pad right
typeof pad.version === 'string' // version string from package manifest

pad(11) === '11'
pad(11, 3) === '011'
pad(11, 3, 16) === '00b'

```

## Benchmark

The benchmark measures elapsed time it takes to perform 5000000 calls.
(Which means that lower values are better.)
Here are the results of popular zero-pad packages:

```
zerop: 420.415ms
pad: 996.018ms
zpad: 841.704ms
npad: 487.840ms
zeroise: 4690.073ms
padster: 1749.308ms
zerofill: 820.477ms
zero-fill: 5270.587ms
```

## Installation

With npm:

    npm install zerop

## License

[MIT](https://github.com/schwarzkopfb/zerop/blob/master/LICENSE)
