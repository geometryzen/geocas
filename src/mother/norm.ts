import { Multivector } from './Multivector';
import { squaredNorm } from './squaredNorm';

export function norm<T>(A: Multivector<T>): Multivector<T> {
    return squaredNorm(A).sqrt();
}
