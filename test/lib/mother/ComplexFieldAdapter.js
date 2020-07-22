"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Complex_1 = require("./Complex");
var isNumber_1 = require("../checks/isNumber");
var mustBeNumber_1 = require("../checks/mustBeNumber");
var ZERO = Complex_1.default(0, 0);
var ComplexFieldAdapter = /** @class */ (function () {
    function ComplexFieldAdapter(ε) {
        if (ε === void 0) { ε = 1e-6; }
        this._ε = Complex_1.default(mustBeNumber_1.default('ε', ε), 0);
    }
    Object.defineProperty(ComplexFieldAdapter.prototype, "\u03B5", {
        get: function () {
            return this._ε;
        },
        enumerable: false,
        configurable: true
    });
    ComplexFieldAdapter.prototype.abs = function (z) {
        return z.__abs__();
    };
    ComplexFieldAdapter.prototype.add = function (lhs, rhs) {
        return lhs.__add__(rhs);
    };
    ComplexFieldAdapter.prototype.eq = function (lhs, rhs) {
        return lhs.x === rhs.x && lhs.y === rhs.y;
    };
    ComplexFieldAdapter.prototype.ne = function (lhs, rhs) {
        return lhs.x !== rhs.x || lhs.y !== rhs.y;
    };
    ComplexFieldAdapter.prototype.le = function (lhs, rhs) {
        return lhs.x <= rhs.x;
    };
    ComplexFieldAdapter.prototype.lt = function (lhs, rhs) {
        return lhs.x < rhs.x;
    };
    ComplexFieldAdapter.prototype.ge = function (lhs, rhs) {
        return lhs.x >= rhs.x;
    };
    ComplexFieldAdapter.prototype.gt = function (lhs, rhs) {
        return lhs.x > rhs.x;
    };
    ComplexFieldAdapter.prototype.sub = function (lhs, rhs) {
        return lhs.__sub__(rhs);
    };
    ComplexFieldAdapter.prototype.max = function (lhs, rhs) {
        return (lhs.x >= rhs.x) ? lhs : rhs;
    };
    ComplexFieldAdapter.prototype.min = function (lhs, rhs) {
        return (lhs.x <= rhs.x) ? lhs : rhs;
    };
    ComplexFieldAdapter.prototype.mul = function (lhs, rhs) {
        return lhs.__mul__(rhs);
    };
    ComplexFieldAdapter.prototype.mulByNumber = function (arg, α) {
        return arg.__mul__(α);
    };
    ComplexFieldAdapter.prototype.div = function (lhs, rhs) {
        return lhs.__div__(rhs);
    };
    ComplexFieldAdapter.prototype.neg = function (z) {
        return z.__neg__();
    };
    ComplexFieldAdapter.prototype.asString = function (z) {
        return z.toString();
    };
    ComplexFieldAdapter.prototype.cos = function (z) {
        return z.__cos__();
    };
    ComplexFieldAdapter.prototype.isField = function (z) {
        return isNumber_1.default(z.x) && isNumber_1.default(z.y);
    };
    ComplexFieldAdapter.prototype.isOne = function (z) {
        return z.x === 1 && z.y === 0;
    };
    ComplexFieldAdapter.prototype.isZero = function (z) {
        return z.x === 0 && z.y === 0;
    };
    Object.defineProperty(ComplexFieldAdapter.prototype, "one", {
        get: function () {
            return Complex_1.default(1, 0);
        },
        enumerable: false,
        configurable: true
    });
    ComplexFieldAdapter.prototype.sin = function (z) {
        return z.__sin__();
    };
    ComplexFieldAdapter.prototype.sqrt = function (z) {
        if (z.x === 0) {
            if (z.y === 0) {
                return ZERO;
            }
            else {
                throw new Error("TODO: sqrt" + z.toString());
            }
        }
        else {
            if (z.y === 0) {
                if (z.x > 0) {
                    return Complex_1.default(Math.sqrt(z.x), 0);
                }
                else {
                    return Complex_1.default(0, Math.sqrt(-z.x));
                }
            }
            else {
                throw new Error("TODO: sqrt" + z.toString());
            }
        }
    };
    Object.defineProperty(ComplexFieldAdapter.prototype, "zero", {
        get: function () {
            return ZERO;
        },
        enumerable: false,
        configurable: true
    });
    return ComplexFieldAdapter;
}());
exports.default = ComplexFieldAdapter;
