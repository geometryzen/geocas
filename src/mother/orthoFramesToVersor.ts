import { cosineOfAngleBetweenBlades as cos } from './cosineOfAngleBetweenBlades';
import { Algebra, Multivector } from './Multivector';

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
export function orthoFramesToVersor<T>(A: Multivector<T>[], B: Multivector<T>[], vs: Multivector<T>[], algebra: Algebra<T>): Multivector<T>[] {
    if (A.length > 0) {
        const j = bestIndex(A, B, algebra);
        const a = A[j];
        const b = B[j];
        const e = a.sub(b);
        const field = algebra.field;
        const eps = field.mulByNumber(field.one, 1e-6);

        const cosMinusOne = cos(a, b).sub(algebra.one).scalarCoordinate();
        const tooClose = field.lt(field.abs(cosMinusOne), eps);
        if (tooClose) {
            return orthoFramesToVersor(removeAt(A, j), removeAt(B, j), vs, algebra);
        }
        else {
            const e2 = e.scp(e).scalarCoordinate();
            const rvs = prepend(vs, e.divByScalar(algebra.field.sqrt(e2)));
            // Don't let irrational number rounding errors from sqrt propagate...
            return orthoFramesToVersor(removeAt(A, j).map(x => e.mul(x.mul(e)).neg().divByScalar(e2)), removeAt(B, j), rvs, algebra);
        }
    }
    else {
        return vs;
    }
}

function prepend<T>(xs: T[], x: T): T[] {
    const result: T[] = [];
    result.push(x);
    for (let i = 0; i < xs.length; i++) {
        result.push(xs[i]);
    }
    return result;
}

/**
 * Returns a copy of the array with the element at index removed.
 */
function removeAt<T>(xs: T[], index: number): T[] {
    const result: T[] = [];
    for (let i = 0; i < xs.length; i++) {
        if (i !== index) {
            result.push(xs[i]);
        }
    }
    return result;
}

/**
 * Determine the best vector for numerical stability.
 */
function bestIndex<T>(A: Multivector<T>[], B: Multivector<T>[], algebra: Algebra<T>): number {
    const N = A.length;
    const max = algebra.zero;
    let idx = 0;
    for (let k = 0; k < N; k++) {
        const x = A[k].sub(B[k]);
        const squaredNorm = x.scp(x.rev()).scalarCoordinate();
        if (algebra.field.gt(squaredNorm, max.scalarCoordinate())) {
            idx = k;
        }
    }
    return idx;
}
