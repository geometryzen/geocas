import { Multivector } from './Multivector';

export function isScalar<T>(arg: Multivector<T>): boolean {
    const blades = arg.blades;
    const length = blades.length;
    for (let k = 0; k < length; k++) {
        const blade = blades[k];
        if (blade.bitmap !== 0) {
            return false;
        }
    }
    return true;
}
