import {Blade} from './Blade';
import blade from './Blade';
import gpE from './gpE';
import FieldAdapter from './FieldAdapter';

export default function gpL<T>(a: Blade<T>, b: Blade<T>, m: number[], adapter: FieldAdapter<T>): Blade<T> {

    const temp = gpE(a, b, adapter);
    let weight = temp.weight;

    // compute the meet (bitmap of annihilated vectors):
    let bitmap = a.bitmap & b.bitmap;

    // change the scale according to the metric.
    let i = 0;
    while (bitmap !== 0) {
        if ((bitmap & 1) !== 0) {
            weight = adapter.scale(weight, m[i]);
        }
        i++;
        bitmap = bitmap >> 1;
    }
    return blade(temp.bitmap, weight, adapter);
}
