import { FieldAdapter } from './FieldAdapter';
import { gpE } from './gpE';
import { grade } from './grade';
import { Blade } from './Multivector';

export function lcoE<T>(a: Blade<T>, b: Blade<T>, adapter: FieldAdapter<T>): Blade<T> {
    const ga = a.grade();
    const gb = b.grade();
    if (ga > gb) {
        // May be more efficient to return null?
        return a.zero();
    }
    else {
        const bitmap = a.bitmap ^ b.bitmap;

        const g = grade(bitmap);

        if (g !== (gb - ga)) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            return gpE(a, b, adapter);
        }
    }
}
