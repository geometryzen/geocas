"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sortBlades_1 = require("./sortBlades");
function multivectorEQ(lhs, rhs, field) {
    if (lhs.blades.length === rhs.blades.length) {
        var bladesL = sortBlades_1.default(lhs.blades);
        var bladesR = sortBlades_1.default(rhs.blades);
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
exports.default = multivectorEQ;
