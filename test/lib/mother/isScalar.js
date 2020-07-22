"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isScalar(arg) {
    var blades = arg.blades;
    var length = blades.length;
    for (var k = 0; k < length; k++) {
        var blade = blades[k];
        if (blade.bitmap !== 0) {
            return false;
        }
    }
    return true;
}
exports.default = isScalar;
