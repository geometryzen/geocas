import { Blade } from './Multivector';
import FieldAdapter from './FieldAdapter';
export default function lcoE<T>(a: Blade<T>, b: Blade<T>, adapter: FieldAdapter<T>): Blade<T>;
