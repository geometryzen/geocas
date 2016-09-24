import {Blade} from './Multivector';
import blade from './Blade';
import canonicalReorderingSign from './canonicalReorderingSign';
import FieldAdapter from './FieldAdapter';

export default function gpE<T>(a: Blade<T>, b: Blade<T>, adapter: FieldAdapter<T>): Blade<T> {
    const bitmap = a.bitmap ^ b.bitmap;
    const sign = canonicalReorderingSign(a.bitmap, b.bitmap);
    const scale = adapter.mul(a.weight, b.weight);
    if (sign > 0) {
        return blade<T>(bitmap, scale, adapter);
    }
    else {
        return blade<T>(bitmap, adapter.neg(scale), adapter);
    }
}
