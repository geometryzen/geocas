import {Blade} from './Blade';
// import FieldAdapter from './FieldAdapter';

function compareFn<T>(a: Blade<T>, b: Blade<T>): number {
    if (a.bitmap < b.bitmap) {
        return -1;
    }
    else if (a.bitmap > b.bitmap) {
        return +1;
    }
    else {
        return 0;
    }
}

// TODO: This could be replaced by a more functional implementation using reduce?
export default function sortBlades<T>(blades: Blade<T>[]): Blade<T>[] {
    const rez: Blade<T>[] = [];
    for (let i = 0; i < blades.length; i++) {
        const B = blades[i];
        rez.push(B);
    }
    rez.sort(compareFn);
    return rez;
}
