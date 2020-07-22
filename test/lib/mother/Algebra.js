"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.algebra = void 0;
var Blade_1 = require("./Blade");
var gpE_1 = require("./gpE");
var gpL_1 = require("./gpL");
var gpG_1 = require("./gpG");
var lcoE_1 = require("./lcoE");
var lcoL_1 = require("./lcoL");
var lcoG_1 = require("./lcoG");
var rcoE_1 = require("./rcoE");
var rcoL_1 = require("./rcoL");
var rcoG_1 = require("./rcoG");
var isArray_1 = require("../checks/isArray");
var isDefined_1 = require("../checks/isDefined");
var isNumber_1 = require("../checks/isNumber");
var isScalar_1 = require("./isScalar");
var isString_1 = require("../checks/isString");
var isUndefined_1 = require("../checks/isUndefined");
var multivectorEQ_1 = require("./multivectorEQ");
var multivectorGE_1 = require("./multivectorGE");
var multivectorGT_1 = require("./multivectorGT");
var multivectorLE_1 = require("./multivectorLE");
var multivectorLT_1 = require("./multivectorLT");
var mustBeDefined_1 = require("../checks/mustBeDefined");
var mustBeInteger_1 = require("../checks/mustBeInteger");
var mustSatisfy_1 = require("../checks/mustSatisfy");
var simplify_1 = require("./simplify");
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
    if (isNumber_1.default(metric)) {
        return metric;
    }
    else if (isArray_1.default(metric)) {
        return metric.length;
    }
    else if (isUndefined_1.default(metric)) {
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
        rez.push(Blade_1.default(0, lhs, field));
        for (var k = 0; k < rhs.blades.length; k++) {
            rez.push(rhs.blades[k]);
        }
        return mv(simplify_1.default(rez, field), algebra, metric, labels);
    }
    else if (isMultivector(lhs) && field.isField(rhs)) {
        var rez = [];
        rez.push(Blade_1.default(0, rhs, field));
        for (var k = 0; k < lhs.blades.length; k++) {
            rez.push(lhs.blades[k]);
        }
        return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
        rez.push(Blade_1.default(0, lhs, field));
        for (var k = 0; k < rhs.blades.length; k++) {
            rez.push(rhs.blades[k].__neg__());
        }
        return mv(simplify_1.default(rez, field), algebra, metric, labels);
    }
    else if (isMultivector(lhs) && field.isField(rhs)) {
        var rez = [];
        rez.push(Blade_1.default(0, field.neg(rhs), field));
        for (var k = 0; k < lhs.blades.length; k++) {
            rez.push(lhs.blades[k]);
        }
        return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
                    if (isNumber_1.default(metric)) {
                        var B = gpE_1.default(B1, B2, field);
                        rez.push(B);
                    }
                    else if (isArray_1.default(metric)) {
                        var B = gpL_1.default(B1, B2, metric, field);
                        rez.push(B);
                    }
                    else {
                        var B = gpG_1.default(B1, B2, metric, field);
                        for (var b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
            if (isScalar_1.default(rhs)) {
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
    mustBeInteger_1.default('index', index);
    mustBeDefined_1.default('algebra', algebra);
    var field = algebra.field;
    var B = Blade_1.default(1 << index, field.one, field);
    return mv([B], algebra, metric, labels);
}
/**
 * Returns a scalar Multivector.
 */
function getScalar(weight, algebra, metric, labels) {
    mustBeDefined_1.default('algebra', algebra);
    var field = algebra.field;
    mustSatisfy_1.default('weight', field.isField(weight), function () { return "be a field value"; });
    var B = Blade_1.default(0, weight, field);
    return mv([B], algebra, metric, labels);
}
function mv(blades, algebra, metric, labels) {
    if (!isArray_1.default(blades)) {
        throw new Error("blades must be Blade<T>[]");
    }
    if (isUndefined_1.default(algebra)) {
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
            return multivectorEQ_1.default(that, rhs, field);
        },
        __ge__: function (rhs) {
            return multivectorGE_1.default(that, rhs, field);
        },
        __gt__: function (rhs) {
            return multivectorGT_1.default(that, rhs, field);
        },
        __le__: function (rhs) {
            return multivectorLE_1.default(that, rhs, field);
        },
        __lt__: function (rhs) {
            return multivectorLT_1.default(that, rhs, field);
        },
        __ne__: function (rhs) {
            return !multivectorEQ_1.default(that, rhs, field);
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
                    rez.push(Blade_1.default(B.bitmap, scale, field));
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
                    if (isNumber_1.default(metric)) {
                        var B = lcoE_1.default(B1, B2, field);
                        rez.push(B);
                    }
                    else if (isArray_1.default(metric)) {
                        var B = lcoL_1.default(B1, B2, metric, field);
                        rez.push(B);
                    }
                    else {
                        var B = lcoG_1.default(B1, B2, metric, field);
                        for (var b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        },
        __rshift__: function (rhs) {
            var rez = [];
            for (var i = 0; i < blades.length; i++) {
                var B1 = blades[i];
                for (var k = 0; k < rhs.blades.length; k++) {
                    var B2 = rhs.blades[k];
                    if (isNumber_1.default(metric)) {
                        var B = rcoE_1.default(B1, B2, field);
                        rez.push(B);
                    }
                    else if (isArray_1.default(metric)) {
                        var B = rcoL_1.default(B1, B2, metric, field);
                        rez.push(B);
                    }
                    else {
                        var B = rcoG_1.default(B1, B2, metric, field);
                        for (var b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
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
            var cosθ = mv([Blade_1.default(0, field.cos(θ), field)], algebra, metric, labels);
            var sinθ = mv([Blade_1.default(0, field.sin(θ), field)], algebra, metric, labels);
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
                    rez.push(Blade_1.default(B.bitmap, scale, field));
                }
            }
            return mv(rez, algebra, metric, labels);
        },
        dual: function () {
            var n = dim(metric);
            var I = mv([Blade_1.default((1 << n) - 1, field.one, field)], algebra, metric, labels);
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
                    rez.push(Blade_1.default(B.bitmap, field.sqrt(B.weight), field));
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
    if (isDefined_1.default(labels)) {
        if (isArray_1.default(labels)) {
            if (labels.length !== n) {
                throw new Error(name + ".length must match the dimensionality of the vector space.");
            }
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                if (!isString_1.default(label)) {
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
    mustBeDefined_1.default('metric', metric);
    var n = dim(metric);
    mustBeDefined_1.default('field', field);
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
            mustBeInteger_1.default('index', index);
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
exports.algebra = algebra;
