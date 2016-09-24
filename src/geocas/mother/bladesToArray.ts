import {Blade} from './Multivector';

export default function bladesToArray<T>(map: { [bitmap: number]: Blade<T> }) {
    const bitmaps = Object.keys(map);
    const rez: Blade<T>[] = [];
    for (let i = 0; i < bitmaps.length; i++) {
        const bitmap = bitmaps[i];
        const blade = map[bitmap];
        rez.push(blade);
    }
    return rez;
}
