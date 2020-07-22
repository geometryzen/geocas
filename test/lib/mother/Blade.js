"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitCount_1 = require("./bitCount");
var canonicalReorderingSign_1 = require("./canonicalReorderingSign");
var isUndefined_1 = require("../checks/isUndefined");
var minusOnePow_1 = require("./minusOnePow");
/**
 * The bitmap representation of a scalar.
 */
var SCALAR = 0;
function blade(b, weight, adapter) {
    var that = {
        get bitmap() {
            return b;
        },
        get weight() {
            return weight;
        },
        __neg__: function () {
            return blade(b, adapter.neg(weight), adapter);
        },
        __vbar__: function (rhs, m) {
            if (b !== rhs.bitmap) {
                return blade(SCALAR, adapter.zero, adapter);
            }
            else {
                return blade(SCALAR, adapter.mul(weight, rhs.weight), adapter);
            }
        },
        __wedge__: function (rhs) {
            // If there are any vectors in common then the result is zero.
            if (b & rhs.bitmap) {
                return blade(SCALAR, adapter.zero, adapter);
            }
            else {
                var bitmap = b ^ rhs.bitmap;
                var sign = canonicalReorderingSign_1.default(b, rhs.bitmap);
                var newScale = adapter.mul(weight, rhs.weight);
                return blade(bitmap, sign > 0 ? newScale : adapter.neg(newScale), adapter);
            }
        },
        grade: function () {
            return bitCount_1.default(b);
        },
        reverse: function () {
            var x = that.grade();
            var sign = minusOnePow_1.default(x * (x - 1) / 2);
            return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
        },
        gradeInversion: function () {
            var x = that.grade();
            var sign = minusOnePow_1.default(x);
            return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
        },
        cliffordConjugate: function () {
            var x = that.grade();
            var sign = minusOnePow_1.default(x * (x + 1) / 2);
            return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
        },
        zero: function () {
            return blade(SCALAR, adapter.zero, adapter);
        },
        asString: function (names) {
            var bladePart = "";
            var i = 1;
            var x = b;
            while (x !== 0) {
                if ((x & 1) !== 0) {
                    if (bladePart.length > 0)
                        bladePart += " ^ ";
                    if (isUndefined_1.default(names) || (names === null) || (i > names.length) || (names[i - 1] == null)) {
                        bladePart = bladePart + "e" + i;
                    }
                    else {
                        bladePart = bladePart + names[i - 1];
                    }
                }
                x >>= 1;
                i++;
            }
            if (bladePart.length === 0) {
                return adapter.asString(weight);
            }
            else {
                if (adapter.isOne(weight)) {
                    return bladePart;
                }
                else {
                    return adapter.asString(weight) + " * " + bladePart;
                }
            }
        },
        toString: function () {
            return that.asString(void 0);
        }
    };
    return that;
}
exports.default = blade;
