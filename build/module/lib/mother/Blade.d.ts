import { Blade } from './Multivector';
import FieldAdapter from './FieldAdapter';
export default function blade<T>(b: number, weight: T, adapter: FieldAdapter<T>): Blade<T>;
