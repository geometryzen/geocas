"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cosineOfAngleBetweenBlades_1 = require("./cosineOfAngleBetweenBlades");
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
        var cosMinusOne = cosineOfAngleBetweenBlades_1.default(a, b).sub(algebra.one).scalarCoordinate();
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
exports.default = orthoFramesToVersor;
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
