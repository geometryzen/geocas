import { Algebra } from './Multivector';
import { Multivector } from './Multivector';
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
export default function orthoFramesToVersor<T>(A: Multivector<T>[], B: Multivector<T>[], vs: Multivector<T>[], algebra: Algebra<T>): Multivector<T>[];
