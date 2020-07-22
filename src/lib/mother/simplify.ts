import {Blade} from './Multivector';
import blade from './Blade';
import bladesToArray from './bladesToArray';
import FieldAdapter from './FieldAdapter';

// TODO: This could be replaced by a more functional implementation using reduce?
export default function simplify<T>(blades: Blade<T>[], adapter: FieldAdapter<T>): Blade<T>[] {
    const map: { [bitmap: number]: Blade<T> } = {};
    for (let i = 0; i < blades.length; i++) {
        const B = blades[i];
        const existing = map[B.bitmap];
        if (existing) {
            const scale = adapter.add(existing.weight, B.weight);
            if (adapter.isZero(scale)) {
                delete map[B.bitmap];
            }
            else {
                map[B.bitmap] = blade(B.bitmap, scale, adapter);
            }
        }
        else {
            if (!adapter.isZero(B.weight)) {
                map[B.bitmap] = B;
            }
        }
    }
    return bladesToArray(map);
}
