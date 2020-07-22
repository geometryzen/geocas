import { Metric } from './Multivector';
import { Algebra } from './Multivector';
import FieldAdapter from './FieldAdapter';
export declare function algebra<T>(metric: number | number[] | Metric<T>, field: FieldAdapter<T>, labels?: string[]): Algebra<T>;
