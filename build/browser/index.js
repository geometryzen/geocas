(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.GeoCAS = factory());
}(this, (function () { 'use strict';

    function bitCount(i) {
        // Note that unsigned shifting (>>>) is not required.
        i = i - ((i >> 1) & 0x55555555);
        i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
        i = (i + (i >> 4)) & 0x0F0F0F0F;
        i = i + (i >> 8);
        i = i + (i >> 16);
        return i & 0x0000003F;
    }

    /**
     * Returns sign change due to putting the blade blades represented
     * by <code>a<code> and <code>b</code> into canonical order.
     */
    function canonicalReorderingSign(a, b) {
        // Count the number of basis vector flips required to
        // get a and b into canonical order.
        a >>= 1;
        var sum = 0;
        while (a !== 0) {
            sum += bitCount(a & b);
            a >>= 1;
        }
        // even number of flips -> return +1
        // odd number of flips -> return -1
        // The test (sum & 1) === 0 evaluates to true for even numbers.
        return ((sum & 1) === 0) ? 1 : -1;
    }

    function isUndefined(arg) {
        return (typeof arg === 'undefined');
    }

    /**
     * pow(-1, i), i.e. (-1) raised to the i'th power.
     */
    function minusOnePow(i) {
        return ((i & 1) === 0) ? 1 : -1;
    }

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
                    var sign = canonicalReorderingSign(b, rhs.bitmap);
                    var newScale = adapter.mul(weight, rhs.weight);
                    return blade(bitmap, sign > 0 ? newScale : adapter.neg(newScale), adapter);
                }
            },
            grade: function () {
                return bitCount(b);
            },
            reverse: function () {
                var x = that.grade();
                var sign = minusOnePow(x * (x - 1) / 2);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            gradeInversion: function () {
                var x = that.grade();
                var sign = minusOnePow(x);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            cliffordConjugate: function () {
                var x = that.grade();
                var sign = minusOnePow(x * (x + 1) / 2);
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
                        if (isUndefined(names) || (names === null) || (i > names.length) || (names[i - 1] == null)) {
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

    function isNumber(x) {
        return (typeof x === 'number');
    }

    function complex(x, y) {
        var that = {
            get x() {
                return x;
            },
            get y() {
                return y;
            },
            __abs__: function () {
                return complex(Math.sqrt(x * x + y * y), 0);
            },
            __add__: function (rhs) {
                return complex(x + rhs.x, y + rhs.y);
            },
            __sub__: function (rhs) {
                return complex(x - rhs.x, y - rhs.y);
            },
            __mul__: function (rhs) {
                if (isNumber(rhs)) {
                    return complex(x * rhs, y * rhs);
                }
                else {
                    return complex(x * rhs.x - y * rhs.y, y * rhs.x + x * rhs.y);
                }
            },
            __div__: function (rhs) {
                if (isNumber(rhs)) {
                    return complex(x / rhs, y / rhs);
                }
                else {
                    var denom = rhs.x * rhs.x + rhs.y * rhs.y;
                    return complex((x * rhs.x + y * rhs.y) / denom, (y * rhs.x - x * rhs.y) / denom);
                }
            },
            __neg__: function () {
                return complex(-x, -y);
            },
            toString: function () {
                return "[" + x + ", " + y + "]";
            },
            __cos__: function () {
                throw new Error("TODO: cos");
            },
            __sin__: function () {
                throw new Error("TODO: sin");
            }
        };
        return that;
    }

    /**
     * name 'must' message ['in' context].
     */
    function mustSatisfy(name, condition, messageBuilder, contextBuilder) {
        if (!condition) {
            var message = messageBuilder ? messageBuilder() : "satisfy some condition";
            var context = contextBuilder ? " in " + contextBuilder() : "";
            throw new Error(name + " must " + message + context + ".");
        }
    }

    function beANumber() {
        return "be a `number`";
    }
    function mustBeNumber (name, value, contextBuilder) {
        mustSatisfy(name, isNumber(value), beANumber, contextBuilder);
        return value;
    }

    var ZERO = complex(0, 0);
    var ComplexFieldAdapter = /** @class */ (function () {
        function ComplexFieldAdapter(ε) {
            if (ε === void 0) { ε = 1e-6; }
            this._ε = complex(mustBeNumber('ε', ε), 0);
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
            return isNumber(z.x) && isNumber(z.y);
        };
        ComplexFieldAdapter.prototype.isOne = function (z) {
            return z.x === 1 && z.y === 0;
        };
        ComplexFieldAdapter.prototype.isZero = function (z) {
            return z.x === 0 && z.y === 0;
        };
        Object.defineProperty(ComplexFieldAdapter.prototype, "one", {
            get: function () {
                return complex(1, 0);
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
                        return complex(Math.sqrt(z.x), 0);
                    }
                    else {
                        return complex(0, Math.sqrt(-z.x));
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

    function squaredNorm(A) {
        return A.scp(A.rev());
    }

    function norm(A) {
        return squaredNorm(A).sqrt();
    }

    /**
     * The cosine of the angle between two blades.
     */
    function cos(A, B) {
        var a = norm(A).scalarCoordinate();
        var b = norm(B).scalarCoordinate();
        return A.scp(B.rev()).divByScalar(a).divByScalar(b);
    }

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

    /**
     * Determines a versor for two frames related by an orthogonal transform.
     *
     * A and B are lists of corresponding vectors, representing the frames.
     * A is the start frame, B is the final frame.
     * V should be initialized to 1 in whatever multivector/field flavor you are using.
     *
     * This is an application of the Cartan-Dieudonne theorem that states:
     * In n-D, any orthogonal transformation can be represented as at most n planar reflections.
     */
    function orthoFramesToVersor(A, B, vs, algebra) {
        if (A.length > 0) {
            var j = bestIndex(A, B, algebra);
            var a = A[j];
            var b = B[j];
            var e_1 = a.sub(b);
            var field = algebra.field;
            var eps = field.mulByNumber(field.one, 1e-6);
            var cosMinusOne = cos(a, b).sub(algebra.one).scalarCoordinate();
            var tooClose = field.lt(field.abs(cosMinusOne), eps);
            if (tooClose) {
                return orthoFramesToVersor(removeAt(A, j), removeAt(B, j), vs, algebra);
            }
            else {
                var e2_1 = e_1.scp(e_1).scalarCoordinate();
                var rvs = prepend(vs, e_1.divByScalar(algebra.field.sqrt(e2_1)));
                // Don't let irrational number rounding errors from sqrt propagate...
                return orthoFramesToVersor(removeAt(A, j).map(function (x) { return e_1.mul(x.mul(e_1)).neg().divByScalar(e2_1); }), removeAt(B, j), rvs, algebra);
            }
        }
        else {
            return vs;
        }
    }
    function prepend(xs, x) {
        var result = [];
        result.push(x);
        for (var i = 0; i < xs.length; i++) {
            result.push(xs[i]);
        }
        return result;
    }
    /**
     * Returns a copy of the array with the element at index removed.
     */
    function removeAt(xs, index) {
        var result = [];
        for (var i = 0; i < xs.length; i++) {
            if (i !== index) {
                result.push(xs[i]);
            }
        }
        return result;
    }
    /**
     * Determine the best vector for numerical stability.
     */
    function bestIndex(A, B, algebra) {
        var N = A.length;
        var max = algebra.zero;
        var idx = 0;
        for (var k = 0; k < N; k++) {
            var x = A[k].sub(B[k]);
            var squaredNorm = x.scp(x.rev()).scalarCoordinate();
            if (algebra.field.gt(squaredNorm, max.scalarCoordinate())) {
                idx = k;
            }
        }
        return idx;
    }

    function gpE(a, b, adapter) {
        var bitmap = a.bitmap ^ b.bitmap;
        var sign = canonicalReorderingSign(a.bitmap, b.bitmap);
        var scale = adapter.mul(a.weight, b.weight);
        if (sign > 0) {
            return blade(bitmap, scale, adapter);
        }
        else {
            return blade(bitmap, adapter.neg(scale), adapter);
        }
    }

    function gpL(a, b, m, adapter) {
        var temp = gpE(a, b, adapter);
        var weight = temp.weight;
        // compute the meet (bitmap of annihilated vectors):
        var bitmap = a.bitmap & b.bitmap;
        // change the scale according to the metric.
        var i = 0;
        while (bitmap !== 0) {
            if ((bitmap & 1) !== 0) {
                weight = adapter.mulByNumber(weight, m[i]);
            }
            i++;
            bitmap = bitmap >> 1;
        }
        return blade(temp.bitmap, weight, adapter);
    }

    function bladesToArray(map) {
        var bitmaps = Object.keys(map);
        var rez = [];
        for (var i = 0; i < bitmaps.length; i++) {
            var bitmap = bitmaps[i];
            var blade = map[bitmap];
            rez.push(blade);
        }
        return rez;
    }

    // TODO: This could be replaced by a more functional implementation using reduce?
    function simplify(blades, adapter) {
        var map = {};
        for (var i = 0; i < blades.length; i++) {
            var B = blades[i];
            var existing = map[B.bitmap];
            if (existing) {
                var scale = adapter.add(existing.weight, B.weight);
                if (adapter.isZero(scale)) {
                    delete map[B.bitmap];
                }
                else {
                    map[B.bitmap] = blade(B.bitmap, scale, adapter);
                }
            }
            else {
                if (!adapter.isZero(B.weight)) {
                    map[B.bitmap] = B;
                }
            }
        }
        return bladesToArray(map);
    }

    function gpG(a, b, m, adapter) {
        var A = m.toEigenBasis(a);
        var B = m.toEigenBasis(b);
        var M = m.getEigenMetric();
        var rez = [];
        for (var i = 0; i < A.length; i++) {
            for (var k = 0; k < B.length; k++) {
                rez.push(gpL(A[i], B[k], M, adapter));
            }
        }
        return m.toMetricBasis(simplify(rez, adapter));
    }

    function grade(bitmap) {
        return bitCount(bitmap);
    }

    function lcoE(a, b, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade(bitmap);
            if (g !== (gb - ga)) {
                // May be more efficient to return null?
                return a.zero();
            }
            else {
                return gpE(a, b, adapter);
            }
        }
    }

    function lcoL(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade(bitmap);
            if (g !== (gb - ga)) {
                // May be more efficient to return null?
                return a.zero();
            }
            else {
                return gpL(a, b, m, adapter);
            }
        }
    }

    function lcoG(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return [];
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade(bitmap);
            if (g !== (gb - ga)) {
                return [];
            }
            else {
                return gpG(a, b, m, adapter);
            }
        }
    }

    function rcoE(a, b, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade(bitmap);
            if (g !== (ga - gb)) {
                // May be more efficient to return null?
                return a.zero();
            }
            else {
                return gpE(a, b, adapter);
            }
        }
    }

    function rcoL(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade(bitmap);
            if (g !== (ga - gb)) {
                // May be more efficient to return null?
                return a.zero();
            }
            else {
                return gpL(a, b, m, adapter);
            }
        }
    }

    function rcoG(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return [];
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade(bitmap);
            if (g !== (ga - gb)) {
                return [];
            }
            else {
                return gpG(a, b, m, adapter);
            }
        }
    }

    function isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    }

    function isDefined(arg) {
        return (typeof arg !== 'undefined');
    }

    function isScalar(arg) {
        var blades = arg.blades;
        var length = blades.length;
        for (var k = 0; k < length; k++) {
            var blade = blades[k];
            if (blade.bitmap !== 0) {
                return false;
            }
        }
        return true;
    }

    function isString(s) {
        return (typeof s === 'string');
    }

    function compareFn(a, b) {
        if (a.bitmap < b.bitmap) {
            return -1;
        }
        else if (a.bitmap > b.bitmap) {
            return +1;
        }
        else {
            return 0;
        }
    }
    // TODO: This could be replaced by a more functional implementation using reduce?
    function sortBlades(blades) {
        var rez = [];
        for (var i = 0; i < blades.length; i++) {
            var B = blades[i];
            rez.push(B);
        }
        rez.sort(compareFn);
        return rez;
    }

    function multivectorEQ(lhs, rhs, field) {
        if (lhs.blades.length === rhs.blades.length) {
            var bladesL = sortBlades(lhs.blades);
            var bladesR = sortBlades(rhs.blades);
            var length_1 = bladesL.length;
            for (var i = 0; i < length_1; i++) {
                var bladeL = bladesL[i];
                var bladeR = bladesR[i];
                if (bladeL.bitmap !== bladeR.bitmap) {
                    return false;
                }
                if (field.ne(bladeL.weight, bladeR.weight)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }

    function multivectorGE(lhs, rhs, field) {
        if (isScalar(lhs) && isScalar(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.ge(l, r);
        }
        else {
            throw new Error(lhs + " >= " + rhs + " is not implemented.");
        }
    }

    function multivectorGT(lhs, rhs, field) {
        if (isScalar(lhs) && isScalar(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.gt(l, r);
        }
        else {
            throw new Error(lhs + " > " + rhs + " is not implemented.");
        }
    }

    function multivectorLE(lhs, rhs, field) {
        if (isScalar(lhs) && isScalar(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.le(l, r);
        }
        else {
            throw new Error(lhs + " <= " + rhs + " is not implemented.");
        }
    }

    function multivectorLT(lhs, rhs, field) {
        if (isScalar(lhs) && isScalar(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.lt(l, r);
        }
        else {
            throw new Error(lhs + " < " + rhs + " is not implemented.");
        }
    }

    function beDefined() {
        return "not be 'undefined'";
    }
    function mustBeDefined(name, value, contextBuilder) {
        mustSatisfy(name, isDefined(value), beDefined, contextBuilder);
        return value;
    }

    function isInteger(x) {
        // % coerces its operand to numbers so a typeof test is required.
        // Not ethat ECMAScript 6 provides Number.isInteger().
        return isNumber(x) && x % 1 === 0;
    }

    function beAnInteger() {
        return "be an integer";
    }
    function mustBeInteger(name, value, contextBuilder) {
        mustSatisfy(name, isInteger(value), beAnInteger, contextBuilder);
        return value;
    }

    /**
     * The JavaScript Bitwise operators use 32-bit signed numbers.
     * &  AND
     * |  OR
     * ~  NOT
     * ^  XOR
     * << Left shift (LHS is what is shifted, RHS is number of bits)
     * >> Right shift
     */
    function isMultivector(arg) {
        if (arg) {
            return typeof arg['extractGrade'] === 'function';
        }
        else {
            return false;
        }
    }
    function isMetric(arg) {
        return typeof arg.getEigenMetric === 'function';
    }
    /**
     * Computes the dimension of the vector space from the metric.
     */
    function dim(metric) {
        if (isNumber(metric)) {
            return metric;
        }
        else if (isArray(metric)) {
            return metric.length;
        }
        else if (isUndefined(metric)) {
            throw new Error("metric is undefined");
        }
        else if (isMetric(metric)) {
            return metric.getEigenMetric().length;
        }
        else {
            throw new Error("metric is undefined");
        }
    }
    function add(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            var rez = [];
            rez.push(blade(0, lhs, field));
            for (var k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k]);
            }
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            var rez = [];
            rez.push(blade(0, rhs, field));
            for (var k = 0; k < lhs.blades.length; k++) {
                rez.push(lhs.blades[k]);
            }
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    rez.push(lhs.blades[i]);
                }
                for (var k = 0; k < rhs.blades.length; k++) {
                    rez.push(rhs.blades[k]);
                }
                return mv(simplify(rez, field), algebra, metric, labels);
            }
            else {
                // We'll be using this function for operator overloading.
                return void 0;
            }
        }
    }
    function sub(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            var rez = [];
            rez.push(blade(0, lhs, field));
            for (var k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k].__neg__());
            }
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            var rez = [];
            rez.push(blade(0, field.neg(rhs), field));
            for (var k = 0; k < lhs.blades.length; k++) {
                rez.push(lhs.blades[k]);
            }
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    rez.push(lhs.blades[i]);
                }
                for (var k = 0; k < rhs.blades.length; k++) {
                    rez.push(rhs.blades[k].__neg__());
                }
                return mv(simplify(rez, field), algebra, metric, labels);
            }
            else {
                // We'll be using this function for operator overloading.
                return void 0;
            }
        }
    }
    function mul(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            return rhs.mulByScalar(lhs);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            return lhs.mulByScalar(rhs);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    var B1 = lhs.blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber(metric)) {
                            var B = gpE(B1, B2, field);
                            rez.push(B);
                        }
                        else if (isArray(metric)) {
                            var B = gpL(B1, B2, metric, field);
                            rez.push(B);
                        }
                        else {
                            var B = gpG(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify(rez, field), algebra, metric, labels);
            }
            else {
                // We'll be using this function for operator overloading.
                return void 0;
            }
        }
    }
    function div(lhs, rhs, algebra) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            throw new Error("Multivector division is not yet supported. " + lhs + " / " + rhs);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            return lhs.divByScalar(rhs);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                if (isScalar(rhs)) {
                    return lhs.divByScalar(rhs.scalarCoordinate());
                }
                else {
                    throw new Error("Multivector division is not yet supported. " + lhs + " / " + rhs);
                }
            }
            else {
                // We'll be using this function for operator overloading.
                return void 0;
            }
        }
    }
    /**
     * Returns the basis vector with index in the integer range [0 ... dim)
     */
    function getBasisVector(index, algebra, metric, labels) {
        mustBeInteger('index', index);
        mustBeDefined('algebra', algebra);
        var field = algebra.field;
        var B = blade(1 << index, field.one, field);
        return mv([B], algebra, metric, labels);
    }
    /**
     * Returns a scalar Multivector.
     */
    function getScalar(weight, algebra, metric, labels) {
        mustBeDefined('algebra', algebra);
        var field = algebra.field;
        mustSatisfy('weight', field.isField(weight), function () { return "be a field value"; });
        var B = blade(0, weight, field);
        return mv([B], algebra, metric, labels);
    }
    function mv(blades, algebra, metric, labels) {
        if (!isArray(blades)) {
            throw new Error("blades must be Blade<T>[]");
        }
        if (isUndefined(algebra)) {
            throw new Error("algebra must be defined");
        }
        // const metric = G.metric;
        var field = algebra.field;
        var extractGrade = function (grade) {
            var rez = [];
            for (var i = 0; i < blades.length; i++) {
                var B = blades[i];
                if (B.grade() === grade) {
                    rez.push(B);
                }
            }
            return mv(rez, algebra, metric, labels);
        };
        var that = {
            get blades() {
                return blades;
            },
            __abs__: function () {
                return that.scp(that.rev()).sqrt();
            },
            add: function (rhs) {
                return add(that, rhs, algebra, metric, labels);
            },
            __add__: function (rhs) {
                return add(that, rhs, algebra, metric, labels);
            },
            __radd__: function (lhs) {
                return add(lhs, that, algebra, metric, labels);
            },
            sub: function (rhs) {
                return sub(that, rhs, algebra, metric, labels);
            },
            __sub__: function (rhs) {
                return sub(that, rhs, algebra, metric, labels);
            },
            __rsub__: function (lhs) {
                return sub(lhs, that, algebra, metric, labels);
            },
            __eq__: function (rhs) {
                return multivectorEQ(that, rhs, field);
            },
            __ge__: function (rhs) {
                return multivectorGE(that, rhs, field);
            },
            __gt__: function (rhs) {
                return multivectorGT(that, rhs, field);
            },
            __le__: function (rhs) {
                return multivectorLE(that, rhs, field);
            },
            __lt__: function (rhs) {
                return multivectorLT(that, rhs, field);
            },
            __ne__: function (rhs) {
                return !multivectorEQ(that, rhs, field);
            },
            inv: function () {
                // We'll start by trying the versor inverse before doing the general inverse.
                var reverse = that.rev();
                var denom = that.mul(reverse);
                // If we have a scalar, then we can compute the versor inverse
                if (denom.blades.length === 1 && denom.blades[0].bitmap === 0) {
                    return reverse.divByScalar(denom.scalarCoordinate());
                }
                else {
                    throw new Error("non-invertible multivector (versor inverse) " + that);
                }
            },
            isZero: function () {
                return blades.length === 0;
            },
            mul: function (rhs) {
                return mul(that, rhs, algebra, metric, labels);
            },
            mulByScalar: function (α) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    var scale = field.mul(B.weight, α);
                    if (!field.isZero(scale)) {
                        rez.push(blade(B.bitmap, scale, field));
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            __mul__: function (rhs) {
                return mul(that, rhs, algebra, metric, labels);
            },
            __rmul__: function (lhs) {
                return mul(lhs, that, algebra, metric, labels);
            },
            __div__: function (rhs) {
                return div(that, rhs, algebra);
            },
            __lshift__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber(metric)) {
                            var B = lcoE(B1, B2, field);
                            rez.push(B);
                        }
                        else if (isArray(metric)) {
                            var B = lcoL(B1, B2, metric, field);
                            rez.push(B);
                        }
                        else {
                            var B = lcoG(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify(rez, field), algebra, metric, labels);
            },
            __rshift__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber(metric)) {
                            var B = rcoE(B1, B2, field);
                            rez.push(B);
                        }
                        else if (isArray(metric)) {
                            var B = rcoL(B1, B2, metric, field);
                            rez.push(B);
                        }
                        else {
                            var B = rcoG(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify(rez, field), algebra, metric, labels);
            },
            __vbar__: function (rhs) {
                // Use the definition of the scalar product in terms of the geometric product.
                return that.__mul__(rhs).extractGrade(0);
            },
            __wedge__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        var B = B1.__wedge__(B2);
                        rez.push(B);
                    }
                }
                return mv(simplify(rez, field), algebra, metric, labels);
            },
            __bang__: function () {
                return that.inv();
            },
            __pos__: function () {
                return that;
            },
            neg: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.__neg__());
                }
                return mv(rez, algebra, metric, labels);
            },
            __neg__: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.__neg__());
                }
                return mv(rez, algebra, metric, labels);
            },
            __tilde__: function () {
                return that.rev();
            },
            cliffordConjugate: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.cliffordConjugate());
                }
                return mv(rez, algebra, metric, labels);
            },
            compress: function (fraction) {
                if (fraction === void 0) { fraction = 1e-12; }
                var eps = field.mulByNumber(field.one, fraction);
                var max = field.zero;
                // Find the largest blade in absolute terms.
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    max = field.max(max, field.abs(B.weight));
                }
                var cutOff = field.mul(max, eps);
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (field.ge(field.abs(B.weight), cutOff)) {
                        rez.push(B);
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            direction: function () {
                var squaredNorm = that.scp(that.rev()).scalarCoordinate();
                var norm = field.sqrt(squaredNorm);
                if (!field.isZero(norm)) {
                    return that.divByScalar(norm);
                }
                else {
                    return that;
                }
            },
            exp: function () {
                // TODO: Optimize and Generalize.
                var B = extractGrade(2);
                var Brev = B.rev();
                var θ = field.sqrt(B.__vbar__(Brev).scalarCoordinate());
                var i = B.divByScalar(θ);
                var cosθ = mv([blade(0, field.cos(θ), field)], algebra, metric, labels);
                var sinθ = mv([blade(0, field.sin(θ), field)], algebra, metric, labels);
                return cosθ.__add__(i.__mul__(sinθ));
            },
            extractGrade: extractGrade,
            div: function (rhs) {
                return that.mul(rhs.inv());
            },
            divByScalar: function (α) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    var scale = field.div(B.weight, α);
                    if (!field.isZero(scale)) {
                        rez.push(blade(B.bitmap, scale, field));
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            dual: function () {
                var n = dim(metric);
                var I = mv([blade((1 << n) - 1, field.one, field)], algebra, metric, labels);
                return that.__lshift__(I);
            },
            gradeInversion: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.gradeInversion());
                }
                return mv(rez, algebra, metric, labels);
            },
            rev: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.reverse());
                }
                return mv(rez, algebra, metric, labels);
            },
            scalarCoordinate: function () {
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (B.bitmap === 0) {
                        return B.weight;
                    }
                }
                return field.zero;
            },
            scp: function (rhs) {
                return that.__vbar__(rhs);
            },
            sqrt: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (B.bitmap === 0) {
                        rez.push(blade(B.bitmap, field.sqrt(B.weight), field));
                    }
                    else {
                        throw new Error("sqrt on arbitrary multivectors is not yet supported.");
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            asString: function (names) {
                checkBasisLabels('names', names, dim(metric));
                if (blades.length === 0) {
                    return "0";
                }
                else {
                    var result = "";
                    for (var i = 0; i < blades.length; i++) {
                        var B = blades[i];
                        var s = B.asString(names);
                        if (i === 0) {
                            result += s;
                        }
                        else {
                            // TODO: Fix this hackery...
                            if (s.charAt(0) === '-') {
                                result += ' - ';
                                result += s.substring(1);
                            }
                            else {
                                result += ' + ';
                                result += s;
                            }
                        }
                    }
                    return result;
                }
            },
            toString: function () {
                return that.asString(labels);
            }
        };
        return that;
    }
    /**
     * Verify that the basis vector labels are strings and that there are the correct number.
     */
    function checkBasisLabels(name, labels, n) {
        if (isDefined(labels)) {
            if (isArray(labels)) {
                if (labels.length !== n) {
                    throw new Error(name + ".length must match the dimensionality of the vector space.");
                }
                for (var i = 0; i < labels.length; i++) {
                    var label = labels[i];
                    if (!isString(label)) {
                        throw new Error(name + "[" + i + "] must be a string.");
                    }
                }
            }
            else {
                throw new Error(name + " must be a string[]");
            }
        }
    }
    function algebra(metric, field, labels) {
        mustBeDefined('metric', metric);
        var n = dim(metric);
        mustBeDefined('field', field);
        checkBasisLabels('labels', labels, n);
        var scalars = [];
        /**
         * A cache of the basis vectors.
         */
        var basisVectors = [];
        var that = {
            get ε() {
                return scalars[2];
            },
            get field() {
                return field;
            },
            get one() {
                return scalars[1];
            },
            get zero() {
                return scalars[0];
            },
            unit: function (index) {
                mustBeInteger('index', index);
                if (index >= 0 && index < n) {
                    return basisVectors[index];
                }
                else {
                    throw new Error("index must be in range [0 ... " + (n - 1) + ")");
                }
            },
            get units() {
                // For safety, return a copy of the cached array of basis vectors.
                return basisVectors.map(function (x) { return x; });
            }
        };
        scalars[0] = getScalar(field.zero, that, metric, labels);
        scalars[1] = getScalar(field.one, that, metric, labels);
        scalars[2] = getScalar(field.ε, that, metric, labels);
        for (var i = 0; i < n; i++) {
            basisVectors[i] = getBasisVector(i, that, metric, labels);
        }
        return that;
    }

    var GeoCAS = /** @class */ (function () {
        function GeoCAS() {
            this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
            this.CREATED_AT = '2016-09-24';
            this.MODIFIED_AT = '2020-07-22';
            this.NAMESPACE = 'GeoCAS';
            this.VERSION = '2.0.0';
        }
        GeoCAS.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            // This should allow us to unit test and run in environments without a console.
            console.log(message);
        };
        GeoCAS.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            // This should allow us to unit test and run in environments without a console.
            console.log(message);
        };
        GeoCAS.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            // This should allow us to unit test and run in environments without a console.
            console.warn(message);
        };
        GeoCAS.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            // This should allow us to unit test and run in environments without a console.
            console.error(message);
        };
        return GeoCAS;
    }());
    /**
     *
     */
    var config = new GeoCAS();

    // math
    /**
     *
     */
    var GeoCAS$1 = {
        /**
         * The publish date of the latest version of the library.
         */
        get LAST_MODIFIED() { return config.MODIFIED_AT; },
        /**
         * The semantic version of the library.
         */
        get VERSION() { return config.VERSION; },
        get blade() { return blade; },
        get complex() { return complex; },
        get ComplexFieldAdapter() { return ComplexFieldAdapter; },
        get cosineOfAngleBetweenBlades() { return cos; },
        get norm() { return norm; },
        get NumberFieldAdapter() { return NumberFieldAdapter; },
        get orthoFramesToVersor() { return orthoFramesToVersor; },
        get algebra() { return algebra; },
        get squaredNorm() { return squaredNorm; }
    };

    return GeoCAS$1;

})));
