import { FieldAdapter } from './FieldAdapter';
import { gpG } from './gpG';
import { grade } from './grade';
import { Blade, Metric } from './Multivector';

export function rcoG<T>(a: Blade<T>, b: Blade<T>, m: Metric<T>, adapter: FieldAdapter<T>): Blade<T>[] {
    const ga = a.grade();
    const gb = b.grade();
    if (ga < gb) {
        return [];
    }
    else {
        const bitmap = a.bitmap ^ b.bitmap;

        const g = grade(bitmap);

        if (g !== (ga - gb)) {
            return [];
        }
        else {
            return gpG(a, b, m, adapter);
        }
    }
}
