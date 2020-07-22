import mustBeNumber from '../checks/mustBeNumber';
var NumberFieldAdapter = /** @class */ (function () {
    function NumberFieldAdapter(ε) {
        if (ε === void 0) { ε = 1e-6; }
        this._ε = mustBeNumber('ε', ε);
    }
    Object.defineProperty(NumberFieldAdapter.prototype, "\u03B5", {
        get: function () {
            return this._ε;
        },
        enumerable: false,
        configurable: true
    });
    NumberFieldAdapter.prototype.abs = function (arg) {
        return Math.abs(arg);
    };
    NumberFieldAdapter.prototype.add = function (lhs, rhs) {
        return lhs + rhs;
    };
    NumberFieldAdapter.prototype.eq = function (lhs, rhs) {
        return lhs === rhs;
    };
    NumberFieldAdapter.prototype.ne = function (lhs, rhs) {
        return lhs !== rhs;
    };
    NumberFieldAdapter.prototype.le = function (lhs, rhs) {
        return lhs <= rhs;
    };
    NumberFieldAdapter.prototype.lt = function (lhs, rhs) {
        return lhs < rhs;
    };
    NumberFieldAdapter.prototype.ge = function (lhs, rhs) {
        return lhs >= rhs;
    };
    NumberFieldAdapter.prototype.gt = function (lhs, rhs) {
        return lhs > rhs;
    };
    NumberFieldAdapter.prototype.sub = function (lhs, rhs) {
        return lhs - rhs;
    };
    NumberFieldAdapter.prototype.max = function (lhs, rhs) {
        return Math.max(lhs, rhs);
    };
    NumberFieldAdapter.prototype.min = function (lhs, rhs) {
        return Math.min(lhs, rhs);
    };
    NumberFieldAdapter.prototype.mul = function (lhs, rhs) {
        return lhs * rhs;
    };
    NumberFieldAdapter.prototype.mulByNumber = function (arg, alpha) {
        return arg * alpha;
    };
    NumberFieldAdapter.prototype.div = function (lhs, rhs) {
        return lhs / rhs;
    };
    NumberFieldAdapter.prototype.neg = function (arg) {
        return -arg;
    };
    NumberFieldAdapter.prototype.asString = function (arg) {
        return arg.toString();
    };
    NumberFieldAdapter.prototype.cos = function (arg) {
        return Math.cos(arg);
    };
    NumberFieldAdapter.prototype.isField = function (arg) {
        return typeof arg === 'number';
    };
    NumberFieldAdapter.prototype.isOne = function (arg) {
        return arg === 1;
    };
    NumberFieldAdapter.prototype.isZero = function (arg) {
        return arg === 0;
    };
    Object.defineProperty(NumberFieldAdapter.prototype, "one", {
        get: function () {
            return 1;
        },
        enumerable: false,
        configurable: true
    });
    NumberFieldAdapter.prototype.sin = function (arg) {
        return Math.sin(arg);
    };
    NumberFieldAdapter.prototype.sqrt = function (arg) {
        return Math.sqrt(arg);
    };
    Object.defineProperty(NumberFieldAdapter.prototype, "zero", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    return NumberFieldAdapter;
}());
export default NumberFieldAdapter;
