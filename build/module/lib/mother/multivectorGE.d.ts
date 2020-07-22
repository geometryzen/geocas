import FieldAdapter from './FieldAdapter';
import { Multivector } from './Multivector';
export default function multivectorGE<T>(lhs: Multivector<T>, rhs: Multivector<T>, field: FieldAdapter<T>): boolean;
