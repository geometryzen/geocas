import {Blade} from './Blade';
import gpG from './gpG';
import grade from './grade';
import {Metric} from './Blade';
import FieldAdapter from './FieldAdapter';

export default function lcoG<T>(a: Blade<T>, b: Blade<T>, m: Metric<T>, adapter: FieldAdapter<T>): Blade<T>[] {
    const ga = a.grade();
    const gb = b.grade();
    if (ga > gb) {
        return [];
    }
    else {
        const bitmap = a.bitmap ^ b.bitmap;

        const g = grade(bitmap);

        if (g !== (gb - ga)) {
            return [];
        }
        else {
            return gpG(a, b, m, adapter);
        }
    }
}
