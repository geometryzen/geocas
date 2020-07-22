import gpL from './gpL';
import simplify from './simplify';
export default function gpG(a, b, m, adapter) {
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
