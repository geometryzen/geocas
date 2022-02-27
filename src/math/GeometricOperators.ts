import { LinearOperators } from './LinearOperators';
import { RingOperators } from './RingOperators';

/**
 * Special methods for operators on elements of geometric spaces.
 */
export interface GeometricOperators<T, UNIT> extends LinearOperators<T, UNIT>, RingOperators<T, UNIT> {
    __div__(rhs: unknown): T;
    __rdiv__(lhs: unknown): T;

    __vbar__(rhs: unknown): T;
    __rvbar__(lhs: unknown): T;

    __wedge__(rhs: unknown): T;
    __rwedge__(lhs: unknown): T;

    __lshift__(rhs: unknown): T;
    __rlshift__(lhs: unknown): T;

    __rshift__(rhs: unknown): T;
    __rrshift__(lhs: unknown): T;

    /**
     * !x = x.inv()
     */
    __bang__(): T;

    /**
     * Inverse (may not exist).
     */
    inv(): T;

    __eq__(rhs: T): boolean;
    __ne__(rhs: T): boolean;
    __ge__(rhs: T): boolean;
    __gt__(rhs: T): boolean;
    __le__(rhs: T): boolean;
    __lt__(rhs: T): boolean;
}
