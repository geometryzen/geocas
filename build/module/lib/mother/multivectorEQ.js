import sortBlades from './sortBlades';
export default function multivectorEQ(lhs, rhs, field) {
    if (lhs.blades.length === rhs.blades.length) {
        var bladesL = sortBlades(lhs.blades);
        var bladesR = sortBlades(rhs.blades);
        var length_1 = bladesL.length;
        for (var i = 0; i < length_1; i++) {
            var bladeL = bladesL[i];
            var bladeR = bladesR[i];
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
