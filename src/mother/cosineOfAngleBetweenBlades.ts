import { Multivector } from './Multivector';
import { norm } from './norm';

/**
 * The cosine of the angle between two blades.
 */
export function cosineOfAngleBetweenBlades<T>(A: Multivector<T>, B: Multivector<T>): Multivector<T> {
    const a = norm(A).scalarCoordinate();
    const b = norm(B).scalarCoordinate();
    return A.scp(B.rev()).divByScalar(a).divByScalar(b);
}
