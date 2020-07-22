import {Blade} from './Multivector';
import gpL from './gpL';
import {Metric} from './Multivector';
import simplify from './simplify';
import FieldAdapter from './FieldAdapter';

export default function gpG<T>(a: Blade<T>, b: Blade<T>, m: Metric<T>, adapter: FieldAdapter<T>): Blade<T>[] {

    const A = m.toEigenBasis(a);
    const B = m.toEigenBasis(b);
    const M = m.getEigenMetric();

    const rez: Blade<T>[] = [];

    for (let i = 0; i < A.length; i++) {
        for (let k = 0; k < B.length; k++) {
            rez.push(gpL(A[i], B[k], M, adapter));
        }
    }

    return m.toMetricBasis(simplify(rez, adapter));
}
