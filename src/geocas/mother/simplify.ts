import {Blade} from './Blade';
import blade from './Blade';
import FieldAdapter from './FieldAdapter';

// TODO: This could be replaced by a more functional implementation using reduce?
export default function simplify<T>(blades: Blade<T>[], adapter: FieldAdapter<T>): Blade<T>[] {
    const rez: Blade<T>[] = [];
    let bitmap: number;
    let scale: T;
    const push = function () {
        if (typeof bitmap !== 'undefined') {
            if (!adapter.isZero(scale)) {
                rez.push(blade(bitmap, scale, adapter));
            }
            bitmap = void 0;
            scale = void 0;
        }
    };
    for (let i = 0; i < blades.length; i++) {
        const B = blades[i];
        if (bitmap === B.bitmap) {
            // accumulate
            scale = adapter.add(scale, B.weight);
        }
        else if (typeof bitmap === 'undefined') {
            // initialize
            bitmap = B.bitmap;
            scale = B.weight;
        }
        else {
            push();
            // emit and initialize
            bitmap = B.bitmap;
            scale = B.weight;
        }
    }
    push();
    return rez;
}
