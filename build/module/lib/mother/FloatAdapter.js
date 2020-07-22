import Float from './Float';
import mustBeNumber from '../checks/mustBeNumber';
var FloatAdapter = /** @class */ (function () {
    function FloatAdapter(ε) {
        if (ε === void 0) { ε = 1e-6; }
        this._ε = new Float(mustBeNumber('ε', ε));
    }
    Object.defineProperty(FloatAdapter.prototype, "\u03B5", {
        get: function () {
            return this._ε;
        },
        enumerable: false,
        configurable: true
    });
    FloatAdapter.prototype.abs = function (arg) {
        return new Float(Math.abs(arg.value));
    };
    FloatAdapter.prototype.add = function (lhs, rhs) {
        return new Float(lhs.value + rhs.value);
    };
    FloatAdapter.prototype.sub = function (lhs, rhs) {
        return new Float(lhs.value - rhs.value);
    };
    FloatAdapter.prototype.eq = function (lhs, rhs) {
        return lhs.value === rhs.value;
    };
    FloatAdapter.prototype.ne = function (lhs, rhs) {
        return lhs.value !== rhs.value;
    };
    FloatAdapter.prototype.le = function (lhs, rhs) {
        return lhs.value <= rhs.value;
    };
    FloatAdapter.prototype.lt = function (lhs, rhs) {
        return lhs.value < rhs.value;
    };
    FloatAdapter.prototype.ge = function (lhs, rhs) {
        return lhs.value >= rhs.value;
    };
    FloatAdapter.prototype.gt = function (lhs, rhs) {
        return lhs.value > rhs.value;
    };
    FloatAdapter.prototype.max = function (lhs, rhs) {
        return lhs.value >= rhs.value ? lhs : rhs;
    };
    FloatAdapter.prototype.min = function (lhs, rhs) {
        return lhs.value <= rhs.value ? lhs : rhs;
    };
    FloatAdapter.prototype.mul = function (lhs, rhs) {
        return new Float(lhs.value * rhs.value);
    };
    FloatAdapter.prototype.mulByNumber = function (arg, multiplier) {
        return new Float(arg.value * multiplier);
    };
    FloatAdapter.prototype.div = function (lhs, rhs) {
        return new Float(lhs.value / rhs.value);
    };
    FloatAdapter.prototype.neg = function (arg) {
        return new Float(-arg.value);
    };
    FloatAdapter.prototype.asString = function (arg) {
        return arg.value.toString();
    };
    FloatAdapter.prototype.cos = function (arg) {
        return new Float(Math.cos(arg.value));
    };
    FloatAdapter.prototype.isField = function (arg) {
        return arg instanceof Float;
    };
    FloatAdapter.prototype.isOne = function (arg) {
        return arg.value === 1;
    };
    FloatAdapter.prototype.isZero = function (arg) {
        return arg.value === 0;
    };
    Object.defineProperty(FloatAdapter.prototype, "one", {
        get: function () {
            return new Float(1);
        },
        enumerable: false,
        configurable: true
    });
    FloatAdapter.prototype.sin = function (arg) {
        return new Float(Math.sin(arg.value));
    };
    FloatAdapter.prototype.sqrt = function (arg) {
        return new Float(Math.sqrt(arg.value));
    };
    Object.defineProperty(FloatAdapter.prototype, "zero", {
        get: function () {
            return new Float(0);
        },
        enumerable: false,
        configurable: true
    });
    return FloatAdapter;
}());
export default FloatAdapter;
