"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpL_1 = require("./gpL");
var simplify_1 = require("./simplify");
function gpG(a, b, m, adapter) {
    var A = m.toEigenBasis(a);
    var B = m.toEigenBasis(b);
    var M = m.getEigenMetric();
    var rez = [];
    for (var i = 0; i < A.length; i++) {
        for (var k = 0; k < B.length; k++) {
            rez.push(gpL_1.default(A[i], B[k], M, adapter));
        }
    }
    return m.toMetricBasis(simplify_1.default(rez, adapter));
}
exports.default = gpG;
