import { Multivector } from './Multivector';

export function squaredNorm<T>(A: Multivector<T>): Multivector<T> {
    return A.scp(A.rev());
}
