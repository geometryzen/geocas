import { Blade } from './Multivector';
export default function bladesToArray<T>(map: {
    [bitmap: number]: Blade<T>;
}): Blade<T>[];
