import { Blade } from './Multivector';
import FieldAdapter from './FieldAdapter';
export default function simplify<T>(blades: Blade<T>[], adapter: FieldAdapter<T>): Blade<T>[];
