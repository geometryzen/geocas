import {Blade} from './Blade';
import gpL from './gpL';
import grade from './grade';
import FieldAdapter from './FieldAdapter';

export default function rcoL<T>(a: Blade<T>, b: Blade<T>, m: number[], adapter: FieldAdapter<T>): Blade<T> {
    const ga = a.grade();
    const gb = b.grade();
    if (ga < gb) {
        // May be more efficient to return null?
        return a.zero();
    }
    else {
        const bitmap = a.bitmap ^ b.bitmap;

        const g = grade(bitmap);

        if (g !== (ga - gb)) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            return gpL(a, b, m, adapter);
        }
    }
}
