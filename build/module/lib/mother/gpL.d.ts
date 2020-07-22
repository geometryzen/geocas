import { Blade } from './Multivector';
import FieldAdapter from './FieldAdapter';
export default function gpL<T>(a: Blade<T>, b: Blade<T>, m: number[], adapter: FieldAdapter<T>): Blade<T>;
