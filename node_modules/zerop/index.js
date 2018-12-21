/**
 * @module zerop
 * @exports zeroPadLeft
 */

'use strict'

exports = module.exports = zeroPadLeft

Object.defineProperties(exports, {
    // exclude inherited properties
    __proto__: null,

    /**
     * @prop {zeroPadLeft} left
     */
    left: {
        enumerable: true,
        value:      zeroPadLeft
    },

    /**
     * @prop {zeroPadRight} right
     */
    right: {
        enumerable: true,
        value:      zeroPadRight
    },

    /**
     * @prop {string} version - The version string from package manifest.
     */
    version: {
        enumerable: true,

        get: function () {
            return require('./package.json').version
        }
    }
})

var cache = {}

function padding(n) {
    var p = cache[ n ]
    return p ? p : cache[ n ] = new Array(n + 1).join('0')
}

/**
 * Pad a number with leading zeros.
 *
 * @param {number} n - Number to pad.
 * @param {number} [length=2] - Expected result length.
 * @param {number} [radix=10] - Radix to use for string conversion.
 * @return {string}
 */
function zeroPadLeft(n, length, radix) {
    length = length || 2
    var s  = n.toString(radix || 10)
    return padding(length - s.length) + s
}

/**
 * Pad a number with trailing zeros.
 *
 * @param {number} n - Number to pad.
 * @param {number} [length=2] - Expected result length.
 * @param {number} [radix=10] - Radix to use for string conversion.
 * @return {string}
 */
function zeroPadRight(n, length, radix) {
    length = length || 2
    var s  = n.toString(radix || 10)
    return s + padding(length - s.length)
}
