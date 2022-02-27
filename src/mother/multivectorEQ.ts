import { FieldAdapter } from './FieldAdapter';
import { Multivector } from './Multivector';
import { sortBlades } from './sortBlades';

export function multivectorEQ<T>(lhs: Multivector<T>, rhs: Multivector<T>, field: FieldAdapter<T>): boolean {
    if (lhs.blades.length === rhs.blades.length) {
        const bladesL = sortBlades(lhs.blades);
        const bladesR = sortBlades(rhs.blades);
        const length = bladesL.length;
        for (let i = 0; i < length; i++) {
            const bladeL = bladesL[i];
            const bladeR = bladesR[i];
            if (bladeL.bitmap !== bladeR.bitmap) {
                return false;
            }
            if (field.ne(bladeL.weight, bladeR.weight)) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
